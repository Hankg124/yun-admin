<script setup lang='ts'>
import { addMenuApi, selectMenuApi, editMenuApi } from '@/api/system/menu';
import type { MenuParamsType, ResponseSelectMenuType } from '@/api/types/menuType';
import { ElNotification, type FormInstance} from 'element-plus';
import _ from 'lodash';
import { ref, watch, watchEffect } from 'vue';

const menuRef = ref<FormInstance>()

const visible = ref(false)
const dialogTitle = ref('')
const dialogType = ref('')
const dialogData = ref({})

const menuForm = ref<MenuParamsType>({
    "type": '1',
    "sort": 1,
    "meta": {
        "hidden": false,
        "cache": false,
        "title": "",
        "icon": ""
    },
    "path": "",
    "name": "",
    "component": "",
    "redirect": "",
    "remark": "",
    "parentId": "",
    "code": ''
})
const props = ref();
const options = ref<ResponseSelectMenuType>();
//获取下拉菜单数据
const selectFn = async () => {
    try {
        const res = await selectMenuApi();
        props.value = {
            label: 'title',
            value: 'id',
            children: 'children',
            checkStrictly: true
        }
        options.value = res.data
    } catch (err) {
        console.log(err);
    }
}

//取消
const handleClose = () => {
    console.log("!11")
    menuRef.value?.resetFields();
    console.log("aaa",menuRef.value)
    visible.value = false;
    console.log(visible.value);
}

//确定
const emits = defineEmits(['refresh']);
const confirm = () => {
    menuRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            //添加
            // if (dialogType.value === "add") {
            //     try {
            //         await addMenuApi(menuForm.value);
            //         ElNotification.success({
            //             title: '操作成功',
            //             offset: 100,
            //         })
            //         handleClose();
            //         emits("refresh");
            //     } catch (err) {
            //         console.log(err);
            //     }
            // } 
            // //编辑
            // else {
            //     try{
            //         const res = await editMenuApi(menuForm.value);
            //         console.log(res);
            //         ElNotification.success({
            //             title: '操作成功',
            //             offset: 100,
            //         })

            //         handleClose();
            //         emits("refresh");
            //     }catch(err){
            //         console.log(err);
            //     }
            // }

            try {
                if (dialogType.value === "add") {
                    await addMenuApi(menuForm.value);
                    ElNotification.success({
                        title: '操作成功',
                        offset: 100,
                    })
                } else {
                    const res = await editMenuApi(menuForm.value);
                    console.log(res);
                    ElNotification.success({
                        title: '操作成功',
                        offset: 100,
                    })
                }
                handleClose();
                emits("refresh");
            } catch (err) {
                console.log(err);
            }
        }
    })
}


// 开启抽屉方法
const openDrawer = (type: string, title: string, data = {} as any) => {
    selectFn();
    visible.value = true;
    dialogTitle.value = title;
    dialogType.value = type;
    dialogData.value = data;
    console.log(type, title, data);
    if (type === 'edit') {
        menuForm.value = _.cloneDeep(data);
    }
}

//// 暴露子组件方法
defineExpose({
    openDrawer
})

watch(()=>visible,(newVal)=>{ 
    console.log(newVal);
    if(!newVal){
        menuRef.value?.resetFields();
    }
})

// watchEffect(() => {
//     if (visible.value == false) {
//         menuRef.value?.resetFields();
//     }
// })

</script>

<template>
    <el-drawer :before-close="handleClose" size="650px" v-model="visible" :title="dialogTitle" direction="rtl">
        <el-form ref="menuRef" :model="menuForm" label-width="auto" label-position="right">
            <el-form-item label="上级菜单：" prop="parentId">
                <el-cascader placeholder="请选择上级菜单" v-model="menuForm.parentId" :options="options" :props="props"
                    clearable />
            </el-form-item>
            <el-form-item label="菜单类型：" prop="type" :rules="{ required: true, message: '请选择菜单类型', trigger: 'change' }">
                <el-radio-group v-model="menuForm.type">
                    <el-radio value="1" border>菜单</el-radio>
                    <el-radio value="2" border>按钮</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单名称：" prop="meta.title"
                :rules="{ required: true, message: '请输入菜单名称', trigger: 'blur' }">
                <el-input v-model="menuForm.meta.title" style="width: 100%" placeholder="请输入菜单名称" maxlength="10"
                    show-word-limit />
            </el-form-item>
            <el-form-item label="权限标识：" prop="code" v-if="menuForm.type == '2'">
                <el-input v-model="menuForm.code" style="width: 100%" placeholder="请输入权限标识" maxlength="200"
                    show-word-limit />
            </el-form-item>
            <el-form-item label="路由地址：" prop="path" v-if="menuForm.type == '1'">
                <el-input v-model="menuForm.path" style="width: 100%" placeholder="路由地址path值" maxlength="200"
                    show-word-limit />
            </el-form-item>
            <el-form-item label="路由名称：" prop="name" v-if="menuForm.type == '1'">
                <el-input v-model="menuForm.name" style="width: 100%" placeholder="路由名称" maxlength="50"
                    show-word-limit />
            </el-form-item>
            <el-form-item label="组件路径：" prop="component" v-if="menuForm.type == '1'">
                <el-input v-model="menuForm.component" style="width: 100%" placeholder="路由组件相对路径" maxlength="300"
                    show-word-limit />
            </el-form-item>
            <el-form-item label="菜单图标：" prop="meta.icon" v-if="menuForm.type == '1'">
                <el-input v-model="menuForm.meta.icon" style="width: 100%" placeholder="请输入图标名ele-开头" maxlength="100"
                    show-word-limit />
            </el-form-item>
            <el-form-item label="重定向：" prop="redirect" v-if="menuForm.type == '1'">
                <el-input v-model="menuForm.redirect" style="width: 100%" placeholder="路由重定向地址redirect值" maxlength="200"
                    show-word-limit />
            </el-form-item>
            <el-row v-if="menuForm.type == '1'">
                <el-col :span="12">
                    <el-form-item label="是否隐藏：" prop="meta.hidden"
                        :rules="{ required: true, message: '请选择是否隐藏', trigger: 'change' }">
                        <el-radio-group v-model="menuForm.meta.hidden">
                            <el-radio :value="false">不隐藏</el-radio>
                            <el-radio :value="true">隐藏</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否缓存：" prop="meta.cache"
                        :rules="{ required: true, message: '请选择是否缓存', trigger: 'change' }">
                        <el-radio-group v-model="menuForm.meta.cache">
                            <el-radio :value="false">不缓存</el-radio>
                            <el-radio :value="true">缓存</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="排序：" prop="sort">
                <!-- v-model="num" -->
                <el-input-number v-model="menuForm.sort" style="width:300px" :min="1" :max="50" />
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <!-- v-model="form.desc"  -->
                <el-input v-model="menuForm.remark" placeholder="请输入备注" type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-row justify="center">
                <el-col :span="3"><el-button @click="handleClose">取消</el-button></el-col>
                <el-col :span="3"><el-button type="primary" @click="confirm">保存</el-button></el-col>
            </el-row>
        </template>

    </el-drawer>
</template>

<style lang="scss" scoped></style>