<template>
<el-header>
    <Breadcrumb></Breadcrumb>
    <UserDropdown></UserDropdown>
</el-header>
</template>
<script setup lang='ts'>
import {defineAsyncComponent} from "vue"

const Breadcrumb=defineAsyncComponent(()=>import("./Breadcrumb.vue"))
const UserDropdown=defineAsyncComponent(()=>import("./UserDropdown.vue"))

</script>
<style lang='scss' scoped>

</style>