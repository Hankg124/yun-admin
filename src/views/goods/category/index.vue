<script setup lang='ts'>
import type { Record, ClassificationType } from '@/api/types/categoryType';
import { ref, defineAsyncComponent } from 'vue';
import { getClassificationApi } from '@/api/goods/category';
const BaseTable = defineAsyncComponent(() => import('@/components/BaseTable.vue'))

const searchData = ref<ClassificationType>({
    current: 1,
    name: '',
    size: 10,
})

//分类数据
const data = ref<Record[]>([])

const aption = ref([
    {
        lable: '分类名称',
        prop: 'name',
        align: 'center',
        width: '200px'
    },
    {
        lable: '分类状态',
        prop: 'status',
        align: 'center',
        slot: 'status'
    },
    {
        lable: '排序号',
        prop: 'sort',
        align: 'center'
    },
    {
        lable: '备注信息',
        prop: 'remark',
        align: 'center'
    },
    {
        lable: '操作',
        align: 'center',
        type: 'operation'
    }
])


//获取分类数据
const getList = async () => {
    const res = await getClassificationApi(searchData.value);
    console.log(res);
    data.value = res.data.records;
}
getList();

</script>

<template>
    <div>

        <BaseTable :data="data" :aption="aption">
            <template #status="{ scope }">
                <el-tag :type="scope.row.status ? 'success' : 'warning'">{{ scope.row.status ? '启用' : '停用' }}</el-tag>
            </template>
            <template #operation>
                <el-button type="warning" link icon="edit">编辑</el-button>
                <el-button type="danger" link icon="delete">删除</el-button>
            </template>
        </BaseTable>

    </div>
</template>

<style lang='scss' scoped></style>