<template>
    <div class="cti-box">
        <el-scrollbar max-height="80vh">
            <div v-for="v,k in store.config.TransItem">
                <el-row v-if="k!='id'"  class="cti">
                    <el-col :span="6">
                        {{ k }}
                    </el-col>
                    <el-col :span="18" class="cti-sel">
                        <el-slider v-model="store.config.TransItem[k]" :step="1" show-stops :marks="showMarks" :max="2"/>
                    </el-col>
                </el-row>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import store from '../../utils/store'
const showMarks = reactive({
    0:'全部显示',
    1:'只显示源文本',
    2:'不显示'
})
</script>

<style scoped>
.cti-box{
    margin:1vh;
}
.cti{
    height: 10vh;
}
.cti-sel{
    padding-right: 2.5vw;
}
</style>