<template>
    <div class="f-list">
    <div class="header">
        <el-button type="primary" @click="openFile" text>
        打开文件
        </el-button>
    </div>
    <div class="content">
        <el-scrollbar max-height="95vh">
            <FileItem v-for="v,k in fileData" :name="v.name" :clicked="v.clicked" :key="v" @click="fiClick(k)"></FileItem>
        </el-scrollbar>
    </div>
    </div>

</template>

<script>
import { dialog, path } from '@tauri-apps/api';
import { fs } from '@tauri-apps/api';
import { onMounted, ref } from 'vue';
import bus from '../utils/bus';
import {cachePath} from '../utils/paths'
</script>

<script setup>
import FileItem from './FileItem.vue'
const fileData = ref({})
onMounted(()=>{
    fs.readDir(cachePath).then(fes=>{
        fes.forEach(fe=>{
            if(fe.children==undefined){
                if(fe.path.endsWith('.trs')){
                    createData(fe.path,true)
                }else if(fe.path.endsWith('.trt')){
                    createDataTarget(fe.path)
                }
            }
        })
    })
})
const createData = async (_path,from_cache=false)=>{
    if(await fs.exists(_path)){
        const txt = await fs.readTextFile(_path)
        var js = undefined
        try {
            js = JSON.parse(txt)
        } catch (error) {
            js = undefined
        }
        if(js!==undefined){
            var fname = ''
            if(from_cache){
                fname = _path.split('\\').pop().replace('.trs','',1)
            }else{
                fname = _path.split('\\').pop().replace('.json','',1)
            }
            fileData.value[fname]={
                name:fname,
                source:js,
                clicked:false
            }
            if(!from_cache){
                await fs.copyFile(_path,await path.join(cachePath,fname+'.trs'))
            }
            
        }
    }
}
const createDataTarget=async (_path)=>{
    if(await fs.exists(_path)){
        const txt = await fs.readTextFile(_path)
        var js = undefined
        try {
            js = JSON.parse(txt)
        } catch (error) {
            js = undefined
        }
        if(js!==undefined){
            const fname = _path.split('\\').pop().replace('.trt','',1)
            fileData.value[fname].target=js            
        }
    }
}
const openFile=async ()=>{
    const f = await dialog.open({
    multiple:true,
    filters: [
            { name: 'json文件', extensions: ['json'] },
        ]
    })
    if(f!=null){
        await fs.removeDir(cachePath,{recursive:true})
        if(!await fs.exists(cachePath)){
            await fs.createDir(cachePath)
        }
        fileData.value={}
        if(f instanceof Array){
            var c = 0
            for(let file of f){
                await createData(file)
                c+=1
                if(c>400){
                    ElMessage({
                        message:"所选文件过多，只加载前400个文件",
                        type:"warning"
                    })
                    break
                }
            }
        }else if(f instanceof String){
            readCount = 1
            await createData(f)
        }
    }
    
}
const fiClick=(k)=>{
    for(let i in fileData.value){
        if(i==k){
            fileData.value[k].clicked=true
        }else{
            fileData.value[i].clicked=false
        }
    }
    bus.emit('click-file-item',fileData.value[k])
    fileData.value[k].clicked=true
}
</script>

<style scoped>
.f-list{
    width: 21vw;
    height: 100%;
    cursor: pointer;
    text-align: center;
}
</style>