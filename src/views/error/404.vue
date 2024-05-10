<template>
    <div class="error-container">
        <img class="error-image" src="http://vue3.mengxuegu.com/assets/404-b5333228.svg" alt="">
        <div class="error-wrap">
            <div class="error-title">您所访问的页面不存在！</div>
        <div class="error-msg">请检查您输入的网址是否正确，或点击下面的按钮返回首页。</div>
        <el-button @click="$router.push('/home')" type="primary" round>返回首页</el-button>
        </div>
    </div>
    </template>
    <script setup lang='ts'>
    
    
    </script>
    <style lang='scss' scoped>
    
    </style>