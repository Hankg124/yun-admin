<template>
    <div class="layout-header-user">
        <!-- 全屏 -->
        <div class="layout-header-user-icon">
            <svg-icon icon="FullScreen" />
        </div>
        <!-- 开关 -->
        <div class="layout-header-user-icon">
            <el-switch></el-switch>
        </div>
        <!-- 下拉菜单 -->
        <div>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                    <span>乔芳</span>
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="首页">首页</el-dropdown-item>
                        <el-dropdown-item command="404">404</el-dropdown-item>
                        <el-dropdown-item command="401">401</el-dropdown-item>
                        <el-dropdown-item command="退出系统" divided>退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const handleCommand = (command: string | number | object) => {
    ElMessage(`click on item ${command}`)
}

</script>
<style lang='scss' scoped></style>