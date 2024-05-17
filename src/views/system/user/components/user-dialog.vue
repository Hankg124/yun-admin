<script setup lang='ts'>
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref, nextTick } from 'vue';
import { addUserApi, updateUserApi } from '@/api/system/user'
import type { Record } from "@/api/types/roleType"
import { getRoleListApi } from '@/api/system/role';
import _ from "lodash"

const dialogFormVisible = ref(false)

const userFormRef = ref<FormInstance>();

const userForm = ref({
    accountNonExpired: false,
    accountNonLocked: false,
    credentialsNonExpired: false,
    email: '',
    mobile: '',
    nickName: '',
    password: '',
    remark: '',
    roleIds: [],
    username: '',
})

const rules = reactive<FormRules<typeof userForm>>({
    nickName: [
        { required: true, message: '用户昵称不能为空', trigger: 'blur' }
    ],
    username: [
        { required: true, message: '用户帐号为必填项！', trigger: 'blur' },
        { max: 30, min: 6, message: '帐号必须为6~30位数字、字母、下划线！', pattern: /^[0-9A-Za-z_]{6,30}$/ }
    ],
    password: [
        { required: true, message: '密码必须为6~30位数字、字母、下划线！', trigger: 'blur' },
        { max: 30, min: 6, message: '密码必须为6~30位数字、字母、下划线！', pattern: /^[0-9A-Za-z_*]{6,30}$/ }
    ],
    accountNonLocked: [
        { required: true, message: '必须选择', trigger: 'change' }
    ],
    accountNonExpired: [
        { required: true, message: '必须选择', trigger: 'change' }
    ],
    credentialsNonExpired: [
        { required: true, message: '必须选择', trigger: 'change' }
    ]
})

const userTitle = ref<string>('')
const userType = ref<string>('')

// 获取角色列表
const roleList = ref<Record[]>()
const getRoleList = async () => {
    try {
        const res = await getRoleListApi();
        console.log(res);
        roleList.value = res.data.records;
    } catch (error) {
        console.log(error);

    }
}

//打开弹窗
const openDialog = async (type: string, title: string, data = {} as any) => {
    dialogFormVisible.value = true;
    userTitle.value = title;
    userType.value = type;
    await getRoleList();
    console.log(data);

    if (userType.value === 'edit') {
        nextTick(() => {
            userForm.value = _.cloneDeep(data);
        })
    }

}

//暴露出去的方法
defineExpose({
    openDialog
})

//关闭弹窗
const handleClose = () => {
    dialogFormVisible.value = false;
    userFormRef.value?.resetFields();
}

//提交表单
const handleSubmit = () => {
    try {
        userFormRef.value?.validate(async (valid: boolean) => {
            if (valid) {
                if (userType.value === 'add') {
                    await addUserApi(userForm.value);
                } else {
                    await updateUserApi(userForm.value);
                }

                handleClose();
            }
        })
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <el-dialog center :before-close="handleClose" v-model="dialogFormVisible" :title="userTitle" width="720">
        <el-form ref="userFormRef" :model="userForm" :rules="rules" status-icon label-width="110px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户昵称：" prop="nickName">
                        <el-input v-model="userForm.nickName" maxlength="30" show-word-limit clearable
                            placeholder="请输入用户昵称" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户账号：" prop="username">
                        <el-input v-model="userForm.username" maxlength="30" show-word-limit clearable
                            placeholder="请输入4-30位用户账号" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号码：" prop="mobile">
                        <el-input v-model="userForm.mobile" maxlength="20" show-word-limit clearable
                            placeholder="请输入手机号码" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="登录密码：" prop="password">
                        <el-input :disabled="userType == 'edit'" v-model="userForm.password" maxlength="30"
                            show-word-limit clearable placeholder="请输入6-30位登录密码" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分配角色：" prop="roleIds">
                        <el-select v-model="userForm.roleIds" multiple placeholder="请选择角色" style="width: 240px">
                            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电子邮箱：" prop="email">
                        <el-input v-model="userForm.email" maxlength="30" show-word-limit clearable
                            placeholder="请输入电子邮箱" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账号锁定：" prop="accountNonLocked">
                        <el-radio-group v-model="userForm.accountNonLocked">
                            <el-radio :value="false" border>未锁定</el-radio>
                            <el-radio :value="true" border>已锁定</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账号过期：" prop="accountNonExpired">
                        <el-radio-group v-model="userForm.accountNonExpired">
                            <el-radio :value="false" border>未过期</el-radio>
                            <el-radio :value="true" border>已过期</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="密码过期：" prop="credentialsNonExpired">
                        <el-radio-group v-model="userForm.credentialsNonExpired">
                            <el-radio :value="false" border>未过期</el-radio>
                            <el-radio :value="true" border>已过期</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备注信息：" prop="remark">
                        <el-input show-word-limit maxlength="100" v-model="userForm.remark" type="textarea" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleSubmit">
                    保存
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style lang='scss' scoped></style>