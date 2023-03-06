<template>
    <div class="f-list">
    <div class="header">
        <el-button type="primary" @click="openFile" text>
        打开文件
        </el-button>
    </div>
    <div class="content">
        <el-scrollbar max-height="95vh">
            <FileItem v-for="v,k in fileData" :name="k" :clicked="v.clicked" :key="v" @click="fiClick(k)"></FileItem>
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
    fs.exists(cachePath).then(ex=>{
        fs.readDir(cachePath).then(fes=>{
            fes.forEach(fe=>{
                if(fe.children==undefined){
                    if(fe.path.endsWith('.trs')){
                        createData(fe.path,true)
                    }
                }
            })
        })
    })
})
const createData = async (_path,from_cache=false)=>{
    if(await fs.exists(_path)){
        var fname=''
        if(from_cache){
            fname = _path.split('\\').pop().replace('.trs','',1)
        }else{
            fname = _path.split('\\').pop().replace('.json','',1)
        }
        if(!from_cache){
            await fs.copyFile(_path,await path.join(cachePath,fname+'.trs'))
            fileData.value[fname]={
                clicked:false,
                path:await path.join(cachePath,fname+'.trs')
            }
        }else{
            fileData.value[fname]={
                clicked:false,
                path:_path
            }
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
            for(let file of f){
                await createData(file)
            }
        }else if(f instanceof String){
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
    bus.emit('click-file-item',{name:k,path:fileData.value[k].path})
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