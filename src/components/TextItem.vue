<template>
    <el-card class="trans-box">
        <div class="tans-data" >
            <el-form :model="txtSource" label-width="120px" label-position="top">
                <div v-for="txt,k in txtSource">
                    <el-form-item  v-if="store.config.TransItem[k]<2">
                    <el-divider  content-position="left">{{ k }}:</el-divider>
                    <el-row style="width: 100%;">
                        <el-col :span="12">
                            <p>{{ txtSource[k] }}</p>
                        </el-col>
                        <el-col :span="12" v-if="store.config.TransItem[k]==0">
                            <el-input v-model="txtTarget[k]" type="textarea"/>
                        </el-col>
                        <el-col :span="12" v-if="store.config.TransItem[k]==1&&(k in refText)&&(txtSource[k] in refText[k])">
                            <p>{{ refText[k][txtSource[k]] }}</p>
                        </el-col>
                    </el-row>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </el-card>
</template>

<script setup>
import { onMounted,ref, watch } from 'vue';
import store from '../utils/store';
import { loadSource, pathTrans } from '../utils/tool';
import { fs, path } from '@tauri-apps/api';
import { cachePath } from '../utils/paths';
const props = defineProps(['jsph','name'])

const txtSource = ref({})
const txtTarget = ref({})
const ph = ref({})
const refText=ref({})
const checkTarget=(obj,arr)=>{
    if(arr.length==0){
        return true
    }
    const item = arr.shift()
    if(item in obj){
        return checkTarget(obj[item],arr)
    }else{
        return false
    }
}
onMounted(async ()=>{
    ph.value=pathTrans(props.jsph)
    txtSource.value=eval("store.source"+`${ph.value}`)
    for(let i in txtSource.value){
        if(!(i in store.config.TransItem)){
            store.config.TransItem[i]=0
        }
    }
    if(checkTarget(store.target,[...props.jsph])){
        var t = eval("store.target"+`${ph.value}`)
        for(let i in t){
            if(txtSource.value[i]!==t[i]){
                txtTarget.value[i]=t[i]
            }
        }
    }else{
        store.target=JSON.parse(JSON.stringify(store.source))
        for(let i in t){
            if(txtSource.value[i]!==t[i]){
                txtTarget.value[i]=t[i]
            }
        }
    }
    if(Object.keys(store.config.Reference).length>0){
        var cache={}
        for(let i in store.config.Reference){
            if(store.config.Reference[i].open){
                const rf = store.config.Reference[i].reference
                var rfData={}
                // 读取ref文件
                if(rf[0] in cache){
                    rfData=cache[rf[0]]
                }else if(await path.join(cachePath,rf[0]+'.trs')){
                    const _path = await path.join(cachePath,rf[0]+'.trt')
                    if(!(await fs.exists(_path))){
                        await fs.copyFile(await path.join(cachePath,rf[0]+'.trs'),_path)
                    }
                    const fd = await fs.readTextFile(_path)
                    const data = JSON.parse(fd)
                    var pl = []
                    pl=loadSource(pl,data)
                    const rfPath=pathTrans(pl)
                    rfData=eval('data'+`${rfPath}`)
                    cache[rf[0]]=rfData
                }
                refText.value[i]={}
                for(let r of rfData){
                    if((rf[1] in r)&&(rf[2] in r)){
                        refText.value[i][r[rf[1]]]=r[rf[2]]
                    }
                }
            }
        }
    }
})
watch(txtTarget,(n)=>{
    for(let i in n){
        var t = eval("store.target"+`${ph.value}`)
        t[i]=n[i]
    }
})
</script>

<style scoped>
.trans-box{
    margin: 1vh 1vw;
}
</style>