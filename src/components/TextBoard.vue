<template>
<div class="t-box">
    <el-scrollbar v-if="isClick" max-height="95vh">
        <TextItem v-for="idx in Array.from({length: len}, (x, i) => i)"  :key="idx" :jsph="[...jsonPath,idx]"></TextItem>
    </el-scrollbar>
</div>
</template>

<script>
import { nextTick, ref } from 'vue';
import bus from '../utils/bus';
import { fs, path } from '@tauri-apps/api';
import { cachePath } from '../utils/paths';
import store from '../utils/store';
import { pathTrans } from '../utils/tool'
</script>

<script setup>
import TextItem from './TextItem.vue';

const jsonPath=ref([])
const len=ref(0)
const name=ref('')
const isClick=ref(false)

const loadSource=(item)=>{
    for(let i in item){
        if(item[i] instanceof Array){
            jsonPath.value.push(i)
            break
        }else if(item[i] instanceof Object){
            jsonPath.value.push(i)
            return loadSource(item[i])
        }
    }
}

bus.on('click-file-item',async (info)=>{
    // info: {name,path}
    isClick.value=false
    jsonPath.value=[]
    // 读取缓存target文件，存入store
    const _path=await path.join(cachePath,info.name+'.trt')
    if(await fs.exists(_path)){
        const fd = await fs.readTextFile(_path)
        if(!(info.name in store.target)){
            store.target[info.name]=JSON.parse(fd)
        }
    }
    // 读取缓存source文件
    const fd = await fs.readTextFile(info.path)
    const data = JSON.parse(fd)
    loadSource(data)
    const p = pathTrans(jsonPath.value)
    // 存入store
    if(!(info.name in store.source)){
        store.source[info.name]=data
    }
    len.value = eval("data"+`${p}`).length
    jsonPath.value.splice(0,0,info.name)
    name.value=info.name
    nextTick(()=>{
        isClick.value=true
    })

})
</script>

<style scoped>
.t-box{
    width: 98%;
    height: 95vh;
    margin-top: 5vh;
    border-left: 1px solid rgb(185, 182, 160);
    border-right: 1px solid rgb(185, 182, 160);
}
</style>