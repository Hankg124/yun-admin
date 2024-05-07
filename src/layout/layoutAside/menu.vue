<template>
  <el-menu router default-active="2">
    <el-menu-item index="/home">
      <svgIcon icon="House" size="18" />
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/system/menu">菜单管理</el-menu-item>
      <el-menu-item index="/system/role">角色管理</el-menu-item>
      <el-menu-item index="/system/user">用户管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>商品管理</span>
      </template>
      <el-menu-item index="/goods/list">商品列表</el-menu-item>
      <el-menu-item index="/goods/category">商品分类</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/mengxuegu">
      <el-icon>
        <setting />
      </el-icon>
      <span>梦学谷官网</span>
    </el-menu-item>
    <el-menu-item index="/401">
      <el-icon>
        <setting />
      </el-icon>
      <span>401页面</span>
    </el-menu-item>
  </el-menu>
</template>
<script setup lang='ts'>


</script>
<style lang='scss' scoped></style>