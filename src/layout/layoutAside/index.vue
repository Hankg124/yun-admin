<template>
    <el-aside class="layout-aside" :class="[stores.isCollapse?'layout-aside-menu-200':'layout-aside-menu-60']">
        <Logo></Logo>
        <Menu></Menu>
    </el-aside>
</template>
<script setup lang='ts'>
import { useLayoutConfigStore } from "@/stores/layoutConfig";
const stores=useLayoutConfigStore();
import { defineAsyncComponent } from "vue";

const Logo = defineAsyncComponent(() => import("./Logo.vue"))
const Menu = defineAsyncComponent(() => import("./Menu.vue"))

</script>
<style lang='scss' scoped></style>