<template>

<el-row>
  <el-col :span="5">
    <FileList></FileList>
  </el-col>
  <el-col :span="13">
    <TextBoard></TextBoard>
  </el-col>
  <el-col :span="6">

  </el-col>
</el-row>
</template>

<script>
import { ref } from 'vue';
import FileList from './components/FileList.vue'
import TextBoard from './components/TextBoard.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
</script>

<script setup>
const drawer = ref(true)

</script>

<style>
body{
  background-color: rgb(38, 41, 37);
  padding: 0;
  margin: 0;
}
</style>
