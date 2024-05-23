<script setup lang='ts'>
import { delGoodApi, getListApi } from '@/api/goods/list';
import type { ListParamsType, Record } from '@/api/types/listType';
import { ref,defineAsyncComponent } from 'vue';
import { ElNotification } from 'element-plus'

const ListDrawer=defineAsyncComponent(()=>import('./components/list-drawer.vue'))


const SearchForm = ref<ListParamsType>({
    current: 1,
    keyword: '',
    size: 10,
    status:'',
})
const tableData = ref<Record[]>();

const total=ref<number>();
//获取数据
const getList = async () => {
    try {
        const res = await getListApi(SearchForm.value);
        tableData.value = res.data.records;
        total.value=res.data.total;
    } catch (error) {
        console.log(error);

    }
}
getList();

//分页
const handleSizeChange = (val: number) => {
    SearchForm.value.size = val;
    getList();
}
const handleCurrentChange = (val: number) => {
    SearchForm.value.current = val;
    getList();
}

//删除
const handleDelete = async (id: number) => {
    try {
        await delGoodApi(id);
        ElNotification({
            title: '删除成功！',
            type: 'success',
        })
    } catch (error) {
        console.log(error);

    }
}

const ListDrawerRef=ref<InstanceType<typeof ListDrawer>>();
    
//新增
const handleAdd=()=>{
    ListDrawerRef.value?.openDrawer('add',"新增商品信息");
}

//修改
const handleEdit=(row:Record)=>{
    ListDrawerRef.value?.openDrawer('edit','修改商品信息',row);
}



</script>

<template>
    <div class="container-padding">
        <el-form :inline="true" :model="SearchForm" class="demo-form-inline">
            <el-form-item label="名称/编码:">
                <el-input v-model="SearchForm.keyword" placeholder="请输入商品名称/编码/简码" />
            </el-form-item>
            <el-form-item label="商品状态:">
                <el-select v-model="SearchForm.status" placeholder="请选择商品状态" style="width: 180px;">
                    <el-option label="已上架" :value="1" />
                    <el-option label="已下架" :value="0" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" @click="getList">查询</el-button>
                <el-button type="success" icon="plus" @click="handleAdd">新增商品</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" border style="width: 100%;height: 500px;">
            <el-table-column align="center" prop="date" label="商品名称" min-width="230" fixed="left">
                <template #default="{ row }">
                    <div style="display: flex;">
                        <el-avatar shape="square" :size="50" :src="row.imageUrl" />
                        <div style="text-align: left;margin-left: 10px;">
                            <div>{{ row.name }}</div>
                            <el-link type="primary">{{ row.code }}</el-link>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="specsName" label="商品规格" />
            <el-table-column align="center" prop="categoryName" label="所属分类" />
            <el-table-column align="center" prop="quickCode" label="快捷码" />
            <el-table-column align="center" prop="unitName" label="单位" />
            <el-table-column sortable align="center" prop="stockNum" label="库存" width="100px" />
            <el-table-column sortable align="center" prop="price" label="销售价" width="100px" />
            <el-table-column sortable align="center" label="商品特价" width="110px">
                <template #default="{ row }">
                    ￥{{ row.discountPrice }}
                </template>
            </el-table-column>
            <el-table-column sortable align="center" prop="cost" label="成本价" width="100px" />
            <el-table-column align="center" prop="createTime" label="入库时间" width="120px" />
            <el-table-column label="商品状态" width="100px">
                <template #default="{ row }">
                    <el-switch v-model="row.status" inline-prompt active-text="已上架" inactive-text="已下架"/>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="address" fixed="right" label="操作" width="180px">
                <template #default="{ row }">
                    <el-button link type="warning" icon="edit" @click="handleEdit(row)">修改</el-button>
                    <el-popconfirm width="auto" :title="`确定永久删除【${row.name}】吗?`" confirm-button-text="确定"
                        cancel-button-text="取消" @confirm="handleDelete(row.id)">
                        <template #reference>
                            <el-button link type="danger" icon="delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-row justify="end">
            <el-pagination v-model:current-page="SearchForm.current" v-model:page-size="SearchForm.size"
                :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next" :total="400"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-row>

        <ListDrawer ref="ListDrawerRef"></ListDrawer>

    </div>
</template>

<style lang='scss' scoped></style>