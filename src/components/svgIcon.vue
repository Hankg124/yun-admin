<template>
    <el-icon :size="size" :color="color">
        <component :is="icon"></component>
    </el-icon>
</template>
<script setup lang='ts'>
withDefaults(defineProps<{
    icon: string,
    color?: string,
    size?: string | number
}>(),
    {
        icon: 'Edit',
        size: 16
    }
)

</script>
<style lang='scss' scoped></style>