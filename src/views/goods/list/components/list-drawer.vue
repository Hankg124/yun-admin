<script lang='ts' setup>
import { uploadImgApi } from '@/api/common';
import { addGoodApi, getGoodDetailApi, getTypeListApi, updataListParamsApi, updateGoodApi } from '@/api/goods/list';
import type { AddListParamsType, typeListType } from '@/api/types/listType';
import { ElNotification, type FormInstance, type FormRules, type UploadRequestOptions } from 'element-plus';
import _ from 'lodash';
import { ref, nextTick, onBeforeUnmount, shallowRef, onMounted, reactive } from 'vue'

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const editorRef = shallowRef()


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}


const visible = ref(false);

const ListTitle = ref<string>();
const ListType = ref<string>();

const ListFormRef = ref<FormInstance>();

const ListForm = ref<AddListParamsType>({
    address: '',
    brand: '',
    categoryId: '',
    code: '',
    cost: 0,
    discountPrice: 0,
    goodsDetail: '',
    imageUrl: '',
    name: '',
    price: 0,
    quickCode: '',
    remark: '',
    score: 0,
    sort: 0,
    specsName: '',
    status: true,
    stockNum: 0,
    unitName: '',
});

const handleCodeRule = async (rule: any, value: any, callback: any) => {
    try {
        if (ListType.value === 'add') {
            const res = await getGoodDetailApi(ListForm.value.code);
            console.log(res);
            if (res.data) {
                callback(new Error('当前的商品已存在'))
            } else {
                callback()
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const rules = reactive<FormRules<typeof ListForm>>({
    name: [{ required: true, message: '商品名称为必填项！', trigger: 'blur' }],
    categoryId: [{ required: true, message: '商品分类为必填项！', trigger: 'change' }],
    code: [{ required: true, message: '商品编码为必填项！', trigger: 'blur' },
    { validator: handleCodeRule, trigger: 'blur' }
    ],
    stockNum: [{ required: true, message: '库存数量为必填项!', trigger: 'change' }],
    price: [{ required: true, message: '销售价格为必填项！', trigger: 'change' }],

})


const typeList = ref<any>();

const getType = async () => {
    const res = await getTypeListApi();
    typeList.value = res.data;
    console.log(typeList.value);

}

//打开抽屉
const openDrawer = async (type: string, title: string, data = {} as any) => {
    visible.value = true;
    ListTitle.value = title;
    ListType.value = type;
    getType();
    if (type === 'edit') {
        console.log(data);
        nextTick(() => {
            ListForm.value = _.cloneDeep(data);
        })

    }
}
//关闭抽屉
const handleClose = () => {
    visible.value = false;
    console.log(111);
    ListFormRef.value?.resetFields();
    console.log(222);
}

//暴漏子组件方法
defineExpose({
    openDrawer
})

//上传文件
const handleUploadImg = async (options: UploadRequestOptions) => {
    try {
        const file = options.file;

        if (file.size > 1 * 1024 * 1024) {
            alert('图片大小不能超过1MB');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({ "sourceType": "goods_img" }))

        const res = await uploadImgApi(formData);
        console.log(res);
        ListForm.value.imageUrl = res.data;

    } catch (error) {
        console.log(error);

    }
}

//提交数据
const handleSubmit = () => {
    try {

        ListFormRef.value?.validate(async (valid: boolean) => {
            if (valid) {
                if (ListType.value === 'add') {
                    await addGoodApi(ListForm.value);
                } else {
                    await updataListParamsApi(ListForm.value);
                }
                ElNotification({
                    title: '操作成功',
                    type: 'success',
                })
                handleClose();
            }
        })


    } catch (error) {
        console.log(error);

    }
}


</script>

<template>
    <el-drawer size="800px" v-model="visible" :title="ListTitle" direction="rtl" :before-close="handleClose">
        <el-form :rules="rules" ref="ListFormRef" :model="ListForm" status-icon label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名称:" prop="name">
                        <el-input v-model="ListForm.name" placeholder="请输入商品名称" clearable show-word-limit
                            maxlength="30" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品分类:" prop="categoryId">
                        <el-select v-model="ListForm.categoryId">
                            <el-option v-for="(item, index) in typeList" :key="index" :label="item.categoryName"
                                :value="item.categoryId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品编码:" prop="code">
                        <el-input v-model="ListForm.code" placeholder="请输入(支持条码枪)" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品规格:" prop="specsName">
                        <el-input v-model="ListForm.specsName" placeholder="请输入规格名称" clearable show-word-limit
                            maxlength="20" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="库存数量:" prop="stockNum">
                        <el-input-number v-model="ListForm.stockNum" placeholder="请输入库存数量" :min="1" :max="99999"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品单位:" prop="unitName">
                        <el-input v-model="ListForm.unitName" placeholder="请输入商品单位" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="销售价格:" prop="price">
                        <el-input-number v-model="ListForm.price" :min="1" :max="99999" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品特价:" prop="discountPrice">
                        <el-input-number v-model="ListForm.discountPrice" :min="1" :max="99999" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="成本价格:" prop="cost">
                        <el-input-number v-model="ListForm.cost" :min="1" :max="99999" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="获得积分:" prop="score">
                        <el-input-number v-model="ListForm.score" :min="1" :max="99999" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品状态:" prop="status">
                        <el-radio-group v-model="ListForm.status">
                            <el-radio :value="true" border>上架</el-radio>
                            <el-radio :value="false" border>下架</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="品牌名称:" prop="brand">
                        <el-input v-model="ListForm.brand" placeholder="请输入品牌名称" clearable show-word-limit
                            maxlength="30" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品简码:" prop="quickCode">
                        <el-input v-model="ListForm.quickCode" placeholder="请输入，方便快速搜索商品" clearable show-word-limit
                            maxlength="30" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品产地:" prop="address">
                        <el-input v-model="ListForm.address" placeholder="商品产地最多输入100个字" clearable show-word-limit
                            maxlength="30" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="排序号:" prop="sort">
                        <el-input-number v-model="ListForm.sort" :min="1" :max="99999" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备注信息:" prop="remark">
                        <el-input v-model="ListForm.remark" placeholder="请输入品牌名称" clearable show-word-limit
                            maxlength="30" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="商品主图:" prop="imageUrl">
                        <el-upload class="avatar-uploader" action="" :show-file-list="false"
                            accept="image/png,image/jpeg,image/jpg" :http-request="handleUploadImg">
                            <img v-if="ListForm.imageUrl" :src="ListForm.imageUrl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                            <template #tip>
                                <div class="el-upload__tip">
                                    上传的图片大小不能超过 1MB，格式为 png/jpg/jpeg 的文件。
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="商品详情:" prop="goodsDetail">
                        <div style="border: 1px solid #ccc">
                            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="{}"
                                mode="defalut" />
                            <Editor style="height: 500px; overflow-y: hidden;" v-model="ListForm.goodsDetail"
                                :defaultConfig="{ placeholder: '请输入内容...' }" mode="defalut"
                                @onCreated="handleCreated" />
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-row justify="center">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleSubmit">保存</el-button>
            </el-row>
        </template>
    </el-drawer>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>