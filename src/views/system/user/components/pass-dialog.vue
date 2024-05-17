<script setup lang='ts'>
import { passUserApi } from '@/api/system/user';
import type { passUserType } from '@/api/types/userType';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';

const dialogFormVisible = ref(false);

const userFormRef=ref<FormInstance>()

//标题
const userName = ref<string>('')

const userForm = ref<passUserType>({
    userId: '',
    newPassword: '',//新密码
    repPassword: '',//确认密码
})

// 校验规则
const repPasswordRules = (rule: any, value: any, callback: any) => {
  if (value===userForm.value.newPassword) {
    callback()
  }else{
    return callback(new Error('两次输入密码不一致!'))
  }
}

const rules = reactive<FormRules<typeof userForm>>({
    newPassword: [
        { required: true, message: '密码必须为6~30位数字、字母、下划线！', trigger: 'blur' },
        { max: 30, min: 6, message: '密码必须为6~30位数字、字母、下划线！', pattern: /^[0-9A-Za-z_]{6,30}$/ }
    ],
    repPassword: [
        { required: true, message: '确认密码为必填项！', trigger: 'blur' },
        { validator:repPasswordRules,trigger: 'blur'}
    ],
})

//关闭弹窗
const handleClose = () => {
    dialogFormVisible.value = false;
    userFormRef.value?.resetFields();
}

//打开弹窗
const openDialog=(type:string,data={} as any)=>{
    console.log(data);
    
    dialogFormVisible.value = true;
    userName.value=data.nickName;
    userForm.value.userId=data.id;
}

defineExpose({
    openDialog
})

//确定按钮
const handleSubmit=()=>{
    userFormRef.value?.validate(async(valid:boolean)=>{
        if(valid){
            await passUserApi(userForm.value);
            handleClose();
        }
    })
}

</script>

<template>
    <el-dialog center :before-close="handleClose" v-model="dialogFormVisible" :title="`重置密码【${userName}】`" width="400">
        <el-form status-icon ref="userFormRef" :model="userForm" :rules="rules" label-width="100px">
            <el-form-item label="新密码：" prop="newPassword">
                <el-input type="password" v-model="userForm.newPassword" show-word-limit clearable placeholder="请输入用户昵称" />
            </el-form-item>
            <el-form-item label="确认密码：" prop="repPassword">
                <el-input type="password" v-model="userForm.repPassword" show-word-limit clearable placeholder="请输入用户昵称" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="handleSubmit">
                    确定
                </el-button>
                <el-button @click="handleClose">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style lang='scss' scoped></style>