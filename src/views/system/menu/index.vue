<template>
    <div>
        <div class="menu-top">
            <span>菜单名称：</span>
            <el-input v-model="searchFormKey.keyword" style="width: 240px" placeholder="请输入菜单名称" />
            <el-button type="primary" icon="Search" @click="getMenuList">查询</el-button>
            <el-button type="success" icon="Plus">新增菜单</el-button>
        </div>
        <el-table :data="menuList" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
            <el-table-column label="菜单名称">
                <template #default="{ row }">
                    <svg-icon v-if="row.meta.icon" :icon="filterMenuIcon(row.meta.icon)"></svg-icon>
                    {{ row.meta.title }}
                </template>
            </el-table-column>
            <el-table-column prop="path" label="路由地址" />
            <el-table-column prop="component" label="组件路径" />
            <el-table-column prop="code" label="权限标识" />
            <el-table-column prop="type" label="类型">
                <template #default="{ row }">
                    <el-tag effect="plain" :type="row.type == 1 ? 'primary' : 'success'">{{ row.type == 1 ? '菜单' : '按钮' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" />
            <el-table-column class="menu-table-btn" prop="address" label="操作" width="220">
                <template #default="scope">
                    <el-button link type="primary" size="small" icon="Plus">新增下级</el-button>
                    <el-button link type="warning" size="small" icon="edit">修改</el-button>
                    <el-popconfirm width="auto" confirm-button-text="确定" cancel-button-text="取消" :title="`确定永久删除【${scope.row.meta.title}】吗?`" @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button link type="danger" size="small" icon="delete">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang='ts'>
import { delMenuApi, menuListApi } from '@/api/system/menu'
import type { ResponseMenuListType } from '@/api/types/menuType';
import { ElNotification } from 'element-plus';
import { ref } from 'vue'
const searchFormKey = ref({
    keyword: ''
})
const menuList = ref<ResponseMenuListType[]>([])

const getMenuList = async () => {
    try {
        const res = await menuListApi(searchFormKey.value);
        menuList.value = res.data;
        console.log(menuList.value);

    } catch (error) {
        console.log(error)
    }
}

// 过滤菜单图标
const filterMenuIcon = (icon: string) => {
    if (icon) {
        return icon.replace('ele-', '')
    }
}
getMenuList()

//删除菜单
const handleDelete = async (row: ResponseMenuListType) => {
    console.log(row);
    try{
        await delMenuApi(row.id);
        ElNotification.success({
        title: '删除成功',
        offset: 100,
    })
    }catch(error){
        console.log(error);
        
    }



}
</script>
<style lang='scss' scoped>
.menu-top{
    margin: 10px 0;
}
</style>