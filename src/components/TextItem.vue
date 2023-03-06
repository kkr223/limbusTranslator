<template>
    <el-card class="trans-box">
        <div class="tans-data" >
            <el-form :model="txtSource" label-width="120px" label-position="top">
                <div v-for="txt,k in txtSource">
                <el-form-item>
                    <el-divider  content-position="left">{{ k }}:</el-divider>
                <el-row style="width: 100%;">
                    <el-col :span="12">
                        <p>{{ txtSource[k] }}</p>
                    </el-col>
                    <el-col :span="12">
                        <el-input v-model="txtTarget[k]" type="textarea"/>
                    </el-col>
                </el-row>
                </el-form-item>
                </div>
            </el-form>
        </div>
    </el-card>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import store from '../utils/store';
import { pathTrans } from '../utils/tool';

const props = defineProps(['jsph'])

const txtSource = ref({})
const txtTarget = ref({})
const ph = ref({})
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
onMounted(()=>{
    ph.value=pathTrans(props.jsph)
    txtSource.value=eval("store.source"+`${ph.value}`)
    if(checkTarget(store.target,[...props.jsph])){
        if(props.jsph[1] in store.target[props.jsph[0]]){
            txtTarget.value=eval("store.target"+`${ph.value}`)
        }
    }else{
        store.target[props.jsph[0]]={}
    }
})
</script>

<style scoped>
.trans-box{
    margin: 1vh 1vw;
}
</style>