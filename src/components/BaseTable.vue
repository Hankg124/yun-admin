<script lang='ts' setup>
import type { Record, ClassificationType } from '@/api/types/categoryType';

defineProps<{
    data: any,
    aption: any
}>()

</script>

<template>
    <el-table :data="data" border style="width: 100%">
        <template v-for="(item, index) in aption" :key="index">
            <template v-if="!item.slot">
                <el-table-column v-if="!item.type" :prop="item.prop" :label="item.lable" :width="item.width ? item.width : ''"
                    :align="item.align" />
            </template>
            <template v-else-if="item.slot">
                <el-table-column :prop="item.prop" :label="item.lable" :width="item.width ? item.width : ''"
                    :align="item.align">
                    <template #default="scope">
                        <slot name="status" :scope="scope"></slot>
                    </template>
                </el-table-column>
            </template>
            <el-table-column v-if="item.type === 'operation'" :prop="item.prop" :label="item.lable"
                :width="item.width ? item.width : ''" :align="item.align">
                <template #default="scope">
                    <slot name="operation"></slot>
                </template>
            </el-table-column>
        </template>
    </el-table>
</template>

<style lang='scss' scoped></style>