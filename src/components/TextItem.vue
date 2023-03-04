<template>
    <el-card class="trans-box">
        <p>ID: {{ txtSource.id }}</p>
        <div class="tans-data" >
            <el-form :model="txtSource" label-width="120px" label-position="top">
                <div v-for="txt,k in txtSource">
                <el-form-item v-if="k!='id'">
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

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const txtSource = ref({})
const txtTarget = ref({})
onMounted(()=>{
    txtSource.value=props.modelValue
})
</script>

<style scoped>
.trans-box{
    margin: 1vh 1vw;
}
</style>