<template>
<div class="conf-box">
    <el-tabs v-model="activeConfig" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="翻译项" name="TransItem">
        <ConfigTransItem v-if="loadConfig"></ConfigTransItem>
    </el-tab-pane>
    <el-tab-pane label="外键关联" name="Reference">Reference</el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import { ref, nextTick } from 'vue';
import bus from '../utils/bus';
</script>
<script setup>
import ConfigTransItem from './configItem/ConfigTransItem.vue';
const activeConfig=ref('TransItem')
const loadConfig=ref(false)

bus.on('click-file-item',()=>{
    loadConfig.value=false
    nextTick(()=>{
        loadConfig.value=true
    })
})

</script>

<style scoped>

</style>