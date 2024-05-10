<template>
<div class="error-container">
    <img class="error-image" src="http://vue3.mengxuegu.com/assets/401-53da0fc8.svg" alt="">
    <div class="error-wrap">
        <div class="error-title">您没有操作权限，请联系管理员！</div>
    <div class="error-msg">联系方式：https://www.mengxuegu.com</div>
    <el-button @click="$router.push('/login')" type="primary" round>重新登录</el-button>
    </div>
    
</div>
</template>
<script setup lang='ts'>


</script>
<style lang='scss' scoped>

</style>