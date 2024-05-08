<template>
    <div class="lagyout-header-breadcrumb">
        <!-- 控制 菜单栏 展开/收起 -->
        <svg-icon @click="isCollapseFn" class="svgicon" :icon="stores.isCollapse ? 'Fold' : 'Expand'" size="18" />
        <!-- 面包屑 -->
        
    </div>
</template>
<script setup lang='ts'>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
console.log(route.matched);


import { useLayoutConfigStore } from "@/stores/layoutConfig.ts"
const stores = useLayoutConfigStore();

const isCollapseFn = () => {
    stores.isCollapse = !stores.isCollapse;
    console.log(stores.isCollapse);
}





</script>
<style lang='scss' scoped></style>