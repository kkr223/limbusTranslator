<template>

<el-row>
  <el-col :span="5">
    <FileList></FileList>
  </el-col>
  <el-col :span="13">
    <TextBoard></TextBoard>
  </el-col>
  <el-col :span="6">
    <ConfigBoard></ConfigBoard>
  </el-col>
</el-row>
</template>

<script>
import { ref } from 'vue';
import 'element-plus/theme-chalk/dark/css-vars.css'
</script>

<script setup>
import FileList from './components/FileList.vue'
import TextBoard from './components/TextBoard.vue'
import ConfigBoard from './components/ConfigBoard.vue';

</script>

<style>
body{
  background-color: rgb(38, 41, 37);
  padding: 0;
  margin: 0;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: none;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(167, 170, 179,0.6);
  border-radius: 3px;
}
</style>
