<script setup lang='ts'>
import { ElNotification } from 'element-plus';
import { ref,defineAsyncComponent } from 'vue';
import {getUserListApi,deleteUserApi} from '@/api/system/user'
import type { addUserParamsType,Record } from '@/api/types/userType';

const userDialog = defineAsyncComponent(()=>import ("./components/user-dialog.vue"))
const passDialog=defineAsyncComponent(()=>import ("./components/pass-dialog.vue"))


const userParams=ref({
    current: 1,
    keyword: '',
    size: 10,
})

const userForm=ref<Record[]>()


//获取用户列表数据
const getUserList= async ()=>{
    const res = await getUserListApi(userParams.value);
    userForm.value=res.data.records;
    
}
getUserList();

//分页
const handleSizeChange = (val: number) => {
    userParams.value.size=val;
    getUserList();
}
const handleCurrentChange = (val: number) => {
    userParams.value.current=val;
    getUserList();
}

const userDialogRef=ref<InstanceType <typeof userDialog>>();

//新增用户
const handleAdd=()=>{
    userDialogRef.value?.openDialog("add","新增用户");
}

//修改
const handleEdit=(row:addUserParamsType)=>{
    userDialogRef.value?.openDialog("edit","修改用户",row);
}


//删除角色
const handleDelete =async (row: any) => {
    try {
        await deleteUserApi(row.id);
        ElNotification.success({
            title: '删除成功',
            offset: 100,
        })
    } catch (error) {
        console.log(error);

    }
}

const passDialogRef=ref<InstanceType<typeof passDialog>>()
const handelPass=(row:Record)=>{
    passDialogRef.value?.openDialog("pass",row);
}

</script>


<template>
    <div>
        <div class="menu-top">
            <span>菜单名称：</span>
            <el-input v-model="userParams.keyword" style="width: 240px" placeholder="请输入菜单名称" />
            <el-button type="primary" icon="Search" @click="getUserList">查询</el-button>
            <el-button type="success" icon="Plus" @click="handleAdd">新增用户</el-button>
        </div>
        <el-table :data="userForm" stripe style="width: 100%; margin-bottom: 20px;height: 500px;" row-key="id" border>
            <el-table-column align="center" label="用户昵称" prop="nickName" fixed width="100px"/>
            <el-table-column align="center" prop="username" label="用户账号" />
            <el-table-column align="center" prop="mobile" label="手机号" />
            <el-table-column align="center" prop="email" label="邮箱" />
            <el-table-column align="center" label="账号锁定" sortable>
                <template #default="{ row }">
                    <el-tag effect="dark" :type="row. accountNonLocked== true ? 'success' : 'danger'">{{ row.accountNonLocked == true ? '正常' : '锁定'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="账号过期" sortable>
                <template #default="{ row }">
                    <el-tag effect="dark" :type="row.accountNonExpired == true ? 'success' : 'danger'">{{ row.accountNonExpired == true ? '正常' : '过期'
                        }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="密码过期" sortable>
                <template #default="{ row }">
                    <el-tag effect="dark" :type="row.credentialsNonExpired == true ? 'success' : 'danger'">{{ row.credentialsNonExpired == true ? '正常' : '过期'
                        }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间" sortable />
            <el-table-column align="center" fixed="right" class="menu-table-btn" prop="address" label="操作" width="250">
                <template #default="scope">
                    <el-button link type="primary" icon="key" @click="handelPass(scope.row)">密码重置</el-button>
                    <el-button link type="warning" icon="edit" @click="handleEdit(scope.row)">修改</el-button>
                    <el-popconfirm @confirm="handleDelete(scope.row)"  width="auto" confirm-button-text="确定" cancel-button-text="取消"
                        :title="`确定删除此角色和所拥有权限吗?`">
                        <template #reference>
                            <el-button link type="danger" icon="delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-row justify="end">
            <el-pagination v-model:current-page="userParams.current" v-model:page-size="userParams.size"
                :page-sizes="[1, 5, 10, 20]" layout="total, sizes, prev, pager, next" :total="400"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-row>


        <userDialog ref="userDialogRef"></userDialog>
        <passDialog ref="passDialogRef"></passDialog>
    </div>
</template>

<style lang='scss' scoped>
.menu-top {
    margin: 10px 0;
}
</style>