<template>
<div class="t-box">
    <ul v-infinite-scroll="listLoad" class="t-ul" v-if="isClick">
        <li v-for="idx in Array.from({length: loadLen}, (x, i) => i)" :key="idx">
            <TextItem :jsph="jsonPath+`[${idx}]`" :name="name"></TextItem>
        </li>
    </ul>
</div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import bus from '../utils/bus';
import { fs, path } from '@tauri-apps/api';
import { cachePath } from '../utils/paths';
import { setTarget,useStore,setSource,setConfig } from '../utils/store';
import { findArrayWithPath } from '../utils/tool';
import _ from 'lodash'
import TextItem from './TextItem.vue';

const jsonPath=ref([])
var len=0
const loadLen=ref(6)
const name=ref('')
const isClick=ref(false)
const listLoad=()=>{
    if(loadLen.value+4<=len){
        loadLen.value+=4
    }else if(loadLen.value<len){
        loadLen.value=len
    }
}

// 响应click-file-item事件
bus.on('click-file-item',async (info)=>{
    // info: {name,path}
    isClick.value=false
    jsonPath.value=[]
    //点击后切换当前库
    await useStore(info.name)
    // 读取缓存target文件，存入store
    const _path=await path.join(cachePath,info.name+'.trt')
    if(await fs.exists(_path)){
        const fd = await fs.readTextFile(_path)
        setTarget(info.name,JSON.parse(fd))
    }
    // 读取缓存source文件,存入store
    if(await fs.exists(info.path)){
        const fd = await fs.readTextFile(info.path)
        const data = JSON.parse(fd)
        setSource(info.name,data)
        jsonPath.value=findArrayWithPath(data)
        // 无限滚动
        len = _.get(data,jsonPath.value).length
        if(len<6){
            loadLen.value=len
        }else{
            loadLen.value=6
        }
    }
    // 读取缓存config文件，存入store
    const __path=await path.join(cachePath,info.name+'.trc')
    if(await fs.exists(__path)){
        const fd = await fs.readTextFile(__path)
        setConfig(info.name,JSON.parse(fd))
    }
    name.value=info.name
    nextTick(()=>{
        bus.emit('config-loaded')
        isClick.value=true
    })
})
</script>

<style>
ul{
    margin: 0;
    padding: 0;
}
ul li{
    margin: 0;
    padding: 0;
}
</style>

<style scoped>
.t-box{
    width: 95%;
    height: 95vh;
    margin-top: 5vh;
    padding-left: 1vh;
    padding-right: 1vh;
    border-left: 1px solid rgb(185, 182, 160);
    border-right: 1px solid rgb(185, 182, 160);
}
.t-ul {
    overflow: auto;
    height: 95vh;
    list-style: none;
    margin: 0;
}
.t-ul li{
    list-style-type: none;
}
</style>