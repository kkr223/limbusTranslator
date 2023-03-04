<template>
<div :class="fItemClass">
    <p>{{ name }}</p>
</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['name','clicked'])
const fItemClass=computed(()=>{
    if(props.clicked){
        return "f-item f-item-clicked"
    }else{
        return "f-item"
    }
})
</script>

<style scoped>
.f-item{
    width: 90%;
    height: 7vh;
    border: 1px solid rgb(209, 209, 209);
    border-radius: 3px;
    margin-left: 5%;
    margin-top: 0.8vh;
    text-align: center;
    cursor: pointer;
    background-color: rgb(51, 62, 41);
    box-shadow: 0 0 4px 0 rgb(209, 209, 209) inset;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
}
.f-item:hover{
    background-color: rgb(70, 81, 59);
    box-shadow: 0 0 6px 0 rgb(228, 228, 228) inset;
}
.f-item-clicked{
    border: 1px solid rgb(236, 214, 90);
    background-color: rgb(82, 95, 69);
    box-shadow: 0 0 7px 0 rgb(236, 214, 90) inset;
}
</style>