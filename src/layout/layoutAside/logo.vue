<template>
<div class="aside-logo">
    <img src="http://vue3.mengxuegu.com/assets/logo-8ba32897.png" alt="">
    <span v-if="stores.isCollapse">积云-Vue3全家桶项目</span>
</div>
</template>
<script setup lang='ts'>
import {useLayoutConfigStore} from "@/stores/layoutConfig"
const stores=useLayoutConfigStore();

</script>
<style lang='scss' scoped>

</style>