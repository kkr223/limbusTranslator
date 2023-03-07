<template>
    <p>
        目前是固定只有一种，也许以后会加自定义映射，文件列表中必须有CN_NickName才能正常使用
    </p>
    <el-scrollbar max-height="80vh">
        <ReferenceItem v-for="v,k in store.config.Reference" :key="k" :ori="k"></ReferenceItem>
    </el-scrollbar>
</template>

<script setup>
import store from '../../utils/store';
import ReferenceItem from './ReferenceItem.vue'

</script>

<style scoped>
.item{
    cursor: pointer;
}
</style>