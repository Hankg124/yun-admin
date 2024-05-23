<template>
    <div class="lagyout-header-breadcrumb">
        <!-- 控制 菜单栏 展开/收起 -->
        <svg-icon @click="isCollapseFn" class="svgicon" :icon="stores.isCollapse ? 'Fold' : 'Expand'" size="18" />
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
                <div class="el-breadcrumb-item-div" v-if="breadcrumbList!.length == 0">
                    <svg-icon :icon="item.meta.icon"></svg-icon>
                    <span>{{ item.meta.title }}</span>
                </div>
                <a class="el-breadcrumb-item-div" @click="breadcrumbFn(item)">
                <svg-icon :icon="item.meta.icon"></svg-icon>
                {{ item.meta.title }}</a>

            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script setup lang='ts'>
import {
    useRoute,
    useRouter,
    onBeforeRouteUpdate,
    type RouteLocationNormalized,
    type RouteRecordNormalized
} from 'vue-router'
const route = useRoute();
const router = useRouter();


import { useLayoutConfigStore } from "@/stores/layoutConfig"
import { onMounted, ref } from 'vue';
const stores = useLayoutConfigStore();

const isCollapseFn = () => {
    stores.isCollapse = !stores.isCollapse;
}

//创建一个变量，保存面包屑导航的数据
const breadcrumbList = ref<RouteRecordNormalized[]>();


//路由更新时触发的方法
onBeforeRouteUpdate((to, from) => {
    getBreadcrumb(to);
})

//定义一个方法，使用这个方法获取路由跳转的信息
const getBreadcrumb = (to: RouteLocationNormalized) => {
    const matched = to.matched.filter((item) => item.meta && item.meta.title && item.meta.icon);
    breadcrumbList.value = matched;
}

onMounted(() => {
    getBreadcrumb(route);
})


const breadcrumbFn = (_route:RouteRecordNormalized) => {
    const {path,redirect}=_route;
    if (redirect) router.push(redirect as string);
               // router.push(<string>redirect);
    else router.push(path);
    
}


</script>
<style lang='scss' scoped></style>