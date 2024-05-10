<template>
    <div class="error-container">
        <img class="link-img" src="http://vue3.mengxuegu.com/assets/link-3a8f36f6.svg" alt="">
        <div class="link-wrap">
            <h3 class="link-title">即将跳转到外部网站[{{ $route.meta.title }}]</h3>
        <div class="link-msg">您将要访问的链接不属于{{hostname}}请关注您的帐号安全！</div>
        <el-button class="link-btn" @click="$router.push('/home')" round>继续前往访问</el-button>
        </div>
    </div>
    </template>
    <script setup lang='ts'>
    //获取当前域名
    const hostname = window.location.hostname;
    
    </script>
    <style lang='scss' scoped>
    
    </style>