<template>
    <el-card class="ref-box">
        <el-row>
            <el-col :span="4">
                <el-switch v-model="opened" />
                {{ store.config.Reference[ori].open }}
            </el-col>
            <el-col :span="6">
                {{ ori }}
            </el-col>
            <el-col :span="3">
                -&gt;
            </el-col>
            <el-col :span="10">
                <el-row>{{ data.reference[0] }}</el-row>
                <el-row>{{ data.reference[1] }}</el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import store from '../../utils/store';

const props = defineProps(['ori'])
var data = store.config.Reference[props.ori]
const opened=ref(store.config.Reference[props.ori].open)
watch(opened,(n)=>{
    store.config.Reference[props.ori].open=n
})
</script>

<style scoped>
.ref-box{
    height: 10vh;
    width: 98%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>