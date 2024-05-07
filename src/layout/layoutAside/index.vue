<template>
    <el-aside class="layout-aside" width="200px" style="background-color: antiquewhite;">
        <Logo></Logo>
        <Menu></Menu>
    </el-aside>
</template>
<script setup lang='ts'>
import { defineAsyncComponent } from "vue";

const Logo = defineAsyncComponent(() => import("./Logo.vue"))
const Menu = defineAsyncComponent(() => import("./Menu.vue"))

</script>
<style lang='scss' scoped></style>