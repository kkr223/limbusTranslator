<template>
<div class="conf-box">
    <el-tabs v-model="activeConfig" class="demo-tabs">
    <el-tab-pane label="翻译项" name="TransItem">
        <ConfigTransItem v-if="loadConfig"></ConfigTransItem>
    </el-tab-pane>
    <el-tab-pane label="外键关联" name="Reference">
        <ConfigReference></ConfigReference>
    </el-tab-pane>
    <el-tab-pane label="说明" name="Readme">
        <p>
            项目地址请访问<a href="https://github.com/kkr223/limbusTranslator">https://github.com/kkr223/limbusTranslator</a>。<br/>
            报bug或提需求请去issue
        </p>
    </el-tab-pane>
  </el-tabs>
</div>
<div class="save-box">
    <el-button type="success" class="save-btn" @click="save">
        保存
    </el-button>
</div>
</template>

<script setup>
import { fs, path } from '@tauri-apps/api';
import { ref, nextTick } from 'vue';
import bus from '../utils/bus';
import { outputPath } from '../utils/paths';
import store from '../utils/store';
import ConfigTransItem from './configItem/ConfigTransItem.vue';
import ConfigReference from './configItem/ConfigReference.vue';

const activeConfig=ref('Readme')
const loadConfig=ref(false)

bus.on('config-loaded',()=>{
    loadConfig.value=false
    nextTick(()=>{
        loadConfig.value=true
    })
})
const save=()=>{
    const trans = JSON.stringify(store.target)
    path.join(outputPath,store.name+'.json').then(_path=>{
        fs.writeTextFile(_path,trans).then(()=>{
            ElMessage({
                message:'保存成功',
                type:'success'
            })
        }).catch(()=>{
            ElMessage({
                message:'保存失败',
                type:'error'
            })
        })
    })
    
}
</script>

<style scoped>
.conf-box{
    height: 80vh;
    width: 96%;
    margin-top: 2vh;
    padding-right: 1vw;
}
.save-btn{
    height: 6vh;
    width: 12vw;
    margin-top: 2vh;
    margin-left: 5vw;
}
</style>