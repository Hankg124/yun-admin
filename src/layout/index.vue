
<script setup lang='ts'>
import { defineAsyncComponent } from 'vue';
// 异步组件

//侧边栏组件
const layoutAside = defineAsyncComponent(()=>import("./layoutAside/index.vue"))

//侧边栏组件
const layoutHeader = defineAsyncComponent(()=>import("./layoutHeader/index.vue"))

//侧边栏组件
const layoutMain = defineAsyncComponent(()=>import("./layoutMain/index.vue"))

</script>

<template>
    <el-container>
        <layoutAside></layoutAside>
        <el-container direction="vertical">
            <layoutHeader></layoutHeader>
            <layoutMain></layoutMain>
        </el-container>
    </el-container>
</template>

<style lang='scss' scoped></style>