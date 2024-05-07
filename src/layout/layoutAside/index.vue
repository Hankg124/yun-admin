<template>
    <el-aside class="layout-aside" width="200px" style="background-color: antiquewhite;">
        <!-- <logo></logo> -->
    </el-aside>
</template>
<script setup lang='ts'>
import { defineAsyncComponent } from "vue";

const logo = defineAsyncComponent(() => import("@/layout/layoutAside/logo.vue"))
const menu = defineAsyncComponent(() => import("@/layout/layoutAside/menu.vue"))

</script>
<style lang='scss' scoped></style>