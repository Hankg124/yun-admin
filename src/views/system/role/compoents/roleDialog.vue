<template>
    <el-dialog :before-close="closeDialog" center v-model="dialogFormVisible" :title="roleTitle" width="500">
        <el-form status-icon ref="dialogFormRef" label-width="auto" label-position="right" :rules="rules" :model="roleForm">
            <el-form-item label="角色名称：" prop="roleName">
                <el-input clearable v-model="roleForm.roleName" show-word-limit maxlength="30" placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item clearable label="角色编码：" prop="roleCode">
                <el-input v-model="roleForm.roleCode" show-word-limit maxlength="30" placeholder="保证唯一性，建议以`ROLE_`开头" />
            </el-form-item>
            <el-form-item label="角色状态：" prop="status">
                <el-switch v-model="roleForm.status" inline-prompt active-text="启" inactive-text="停" />
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model="roleForm.remark" type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="handleAdd">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang='ts'>
import { addParamsRoleApi, editParamsRoleApi } from '@/api/system/role';
import type { addRoleType, Record } from '@/api/types/roleType';
import { ElNotification, type FormInstance, type FormRules } from 'element-plus';
import { ref, reactive, nextTick } from 'vue'
import _ from 'lodash'
const emits=defineEmits(['refresh'])

//实例化
const dialogFormRef = ref<FormInstance>();

//弹出框显示与隐藏
const dialogFormVisible = ref<boolean>(false)

//弹出框类型
const roleType = ref<string>('');
//弹出框标题
const roleTitle = ref<string>('');

//弹出框表单数据
const roleForm = ref<addRoleType>({
    remark: '',//备注
    roleCode: '',//角色编码
    roleName: '',//角色名称
    status: true,//角色状态
})

//正则验证
const rules = reactive<FormRules<typeof roleForm>>({
    roleName: { required: true, message: '角色名称为必填项！', trigger: 'blur' },
    roleCode: { pattern: /^[0-9a-zA-Z_]{2,30}$/, required: true, message: '只允许输入2-30位英文/数字/下划线', trigger: 'blur' },
    status: { required: true, trigger: 'change' },
})
//打开弹出框方法
const openDialog = (type: string, title: string, data = {} as any) => {
    dialogFormVisible.value = true;
    roleType.value = type;
    roleTitle.value = title;
    if (type == 'edit') {
        // roleForm.value={...data};
        nextTick(()=>{
            roleForm.value = _.cloneDeep(data);
        })
    }


}
//关闭弹出框并清除内容
const closeDialog = () => {
    dialogFormRef.value?.resetFields();
    dialogFormVisible.value = false;
}

//确定按钮
const handleAdd = () => {
    dialogFormRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            try {
                //添加
                if (roleType.value == 'add') {
                    await addParamsRoleApi(roleForm.value);
                } else {
                    //修改
                    await editParamsRoleApi(roleForm.value);
                }
                
                ElNotification.success({
                    title: '操作成功',
                    offset: 100,
                })
                // dialogFormVisible.value = false;
                closeDialog();
                emits('refresh')
            } catch (error) {
                console.log(error);
            }
        }
    })
}

//向父组件暴漏子组件openDialog方法
defineExpose({
    openDialog
})

</script>
<style lang='scss' scoped></style>