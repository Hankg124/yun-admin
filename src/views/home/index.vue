<template>
    <div>
        <div class="home-statistic-title">营业数据统计</div>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
            <el-card shadow="hover">1</el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
            <el-card shadow="hover">1</el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
            <el-card shadow="hover">1</el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
            <el-card shadow="hover">1</el-card>
        </el-col>
    </el-row>
    <el-row :gutter="20" class="home-er-row">
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :span="8">
            <el-card shadow="hover">1</el-card>
        </el-col>
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :span="16">
            <el-card shadow="hover">1</el-card>
        </el-col>
    </el-row>
    <el-row :gutter="20" class="home-er-row">
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :span="16">
            <el-card shadow="hover">1</el-card>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :span="8">
            <el-card shadow="hover">1</el-card>
        </el-col>
    </el-row>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue'

</script>
<style lang='scss' scoped>
.home-statistic-title {
    font-size: 18px;
    padding: 0 10px;
    border-left: 2px solid var(--jy-color-primary);
}
.el-card{
    margin: 10px 0;
}
.home-er-row{
    .el-card{
        height: 380px;
    }
}
</style>