<template>
    <div class="lagyout-header-breadcrumb">
        <!-- 控制 菜单栏 展开/收起 -->
        <svg-icon @click="isCollapseFn" class="svgicon" :icon="stores.isCollapse ? 'Fold' : 'Expand'" size="18" />
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in route.matched" :key="item.path">
                <div class="el-breadcrumb-item-div" v-if="!item.children">
                    <span>{{ item.meta.title }}</span>
                </div>
                <a @click="breadcrumbFn(item)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script setup lang='ts'>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
console.log(route.matched);

import { useLayoutConfigStore } from "@/stores/layoutConfig.ts"
const stores = useLayoutConfigStore();

const breadcrumbFn = (item: any) => {
    console.log(item);

    if (item.redirect) {
        router.push(item.redirect);
    } else {
        router.push(item.path);
    }
}

const isCollapseFn = () => {
    stores.isCollapse = !stores.isCollapse;
    console.log(stores.isCollapse);
}





</script>
<style lang='scss' scoped></style>