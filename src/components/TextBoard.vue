<template>
<div class="t-box">
    <el-scrollbar v-if="isClick" max-height="95vh">
        <TextItem v-for="data,key in transData.source.dataList" v-model="transData.source.dataList[key]" :key="data.name"></TextItem>
    </el-scrollbar>
</div>
</template>

<script>

import { nextTick, ref } from 'vue';

</script>

<script setup>
import bus from '../utils/bus';
import TextItem from './TextItem.vue';

const transData = ref({})
const isClick=ref(false)
bus.on('click-file-item',(info)=>{
    isClick.value=false
    nextTick(()=>{
        transData.value=info
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