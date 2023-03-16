<template>
    <el-card class="trans-box">
        <div class="tans-data" >
            <el-form :model="txtSource" label-width="120px" label-position="top">
                <div v-for="txt,k in txtSource">
                    <el-tag size="large" type="success" v-if="k=='id'">ID&nbsp;:&nbsp;&nbsp;{{ txtSource[k] }}</el-tag>
                    <el-form-item  v-else-if="store.config.TransItem[k]<2">
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
import { onMounted,ref, watch,reactive } from 'vue';
import store from '../utils/store';
import { findArrayWithPath } from '../utils/tool';
import { fs, path } from '@tauri-apps/api';
import { cachePath } from '../utils/paths';
import _ from 'lodash'

const props = defineProps(['jsph','name'])
const txtSource = ref({})
const txtTarget = reactive({})
const refText=ref({})

onMounted(async ()=>{
    txtSource.value= _.get(store.source,props.jsph)
    // config翻译项显示
    const keys = _.uniq(_.keys(txtSource.value))
    const diff = _.difference(keys, _.keys(store.config.TransItem));
    _.forEach(diff,key=>{
        store.config.TransItem[key]=0
    })
    // 检测相关target是否存在
    var tt = _.get(store.target,props.jsph)
    if(tt==undefined){
        store.target=JSON.parse(JSON.stringify(store.source))
        tt = _.get(store.target,props.jsph)
    }
    for(let i in tt){
        // source与target不同时显示target，否则留空
        if(txtSource.value[i]!==tt[i]){
            txtTarget[i]=tt[i]
        }
    }
    // 外键映射
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
                    const rfPath=findArrayWithPath(data)
                    rfData=_.get(data,rfPath)
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
        var t = _.get(store.target,props.jsph)
        t[i]=n[i]
    }
})
</script>

<style scoped>
.trans-box{
    margin: 1vh 1vw;
}
</style>