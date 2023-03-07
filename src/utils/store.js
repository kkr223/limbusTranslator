import { fs,path } from "@tauri-apps/api";
import { reactive } from "vue";
import {cachePath} from './paths'

var _store = {
    source:{},
    target:{},
    config:{}
}

const store = reactive({
    name:'',
    source:{},
    target:{},
    config:{
        TransItem:{},
        Reference:{
            model:{
            open:true,
            reference:['CN_NickName','name','krname']
        }}
    }
});
export function init(){
    _store={
        source:{},
        target:{},
        config:{}
    }
    store.name=''
    store.source={},
    store.target={},
    store.config={
        TransItem:{},
        Reference:{
            model:{
            open:true,
            reference:['CN_NickName','name','krname']
        }}
    }
}
export function setSource(name,value){
    for(let i in value){
        _store.source[name][i]=value[i]
    }
}
export function setTarget(name,value){
    for(let i in value){
        _store.target[name][i]=value[i]
    }
}
export function setConfig(name,value){
    for(let i in value){
        _store.config[name][i]=value[i]
    }
}
export async function useStore(name){
    //每次切换库时执行

    if(!await fs.exists(cachePath)){
        await fs.createDir(cachePath)
    }
    //首先将缓存写入文件
    if(store.name!=''){
        if(JSON.stringify(store.source)!=='{}'){
            await fs.writeTextFile(await path.join(cachePath,store.name+'.trs'),JSON.stringify(store.source))
        }
        if(JSON.stringify(store.target)!=='{}'){
            await fs.writeTextFile(await path.join(cachePath,store.name+'.trt'),JSON.stringify(store.target))
        }
        if(JSON.stringify(store.config)!=='{}'){
            await fs.writeTextFile(await path.join(cachePath,store.name+'.trc'),JSON.stringify(store.config))
        }
    }
    // 初始化
    if(!(name in _store.source)){
        _store.source[name]={}
    }
    if(!(name in _store.target)){
        _store.target[name]={}
    }
    if(!(name in _store.config)){
        _store.config[name]={
            TransItem:{},
            Reference:{
                model:{
                open:true,
                reference:['CN_NickName','name','krname']
            }}
        }
    }
    // 切换库
    store.source=_store.source[name]
    store.target=_store.target[name]
    store.config=_store.config[name]
    store.name=name
    return store
}
export default store;