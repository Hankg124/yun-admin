<template>
    <div>
        <div class="menu-top">
            <span>菜单名称：</span>
            <el-input style="width: 240px" placeholder="请输入菜单名称" />
            <el-button type="primary" icon="Search">查询</el-button>
            <el-button type="success" icon="Plus">新增菜单</el-button>
        </div>
        <el-table :data="roleForm" style="width: 100%; margin-bottom: 20px;height: 500px;" row-key="id" border>
            <el-table-column label="序号" type="index" />
            <el-table-column prop="roleName" label="角色名称" />
            <el-table-column prop="roleCode" label="角色编码" />
            <el-table-column label="角色状态">
                <template #default="{ row }">
                    <el-tag :type="row.status == true ? 'success' : 'warning'">{{ row.status == true ? '启用' : '停用'
                        }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" />
            <el-table-column class="menu-table-btn" prop="address" label="操作" width="250">
                <template #default="scope">
                    <el-button link type="primary" icon="Check">分配权限</el-button>
                    <el-button link type="warning" icon="edit">修改</el-button>
                    <el-popconfirm width="auto" confirm-button-text="确定" cancel-button-text="取消"
                        :title="`确定删除此角色和所拥有权限吗?`" @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button link type="danger" icon="delete">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang='ts'>
import { delRoleApi, getRoleListApi } from '@/api/system/role';
import type { paramsRoleType,Record } from '@/api/types/roleType';
import { ElNotification } from 'element-plus';
import { ref,reactive } from 'vue';



const roleData=ref<paramsRoleType>({
    name:'',
    current:1,
    size:20
})

const roleForm=ref<Record[]>([]);
const total=ref<number>(0);


//获取角色列表
const getRoleList = async () => {
    try {
        const res = await getRoleListApi(roleData.value);
        console.log(res);
        roleForm.value=res.data.records;
        total.value=res.data.total;
    } catch (error) {
        console.log(error);
    }
}
getRoleList();

//删除菜单
const handleDelete = async (row: any) => {
    console.log(row);
    try{
        await delRoleApi(row.id);
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
.menu-top {
    margin: 10px 0;
}
</style>