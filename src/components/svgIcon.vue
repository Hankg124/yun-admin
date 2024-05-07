<template>
    <el-icon :size="size" :color="color">
        <component :is="icon"></component>
    </el-icon>
    <!-- <vnode/> -->
</template>
<script setup lang='ts'>


withDefaults(defineProps<{
    icon: string,
    color?: string,
    size?: string | number
}>(),
    {
        size: 16
    }
)

// import { h, resolveComponent } from 'vue';

// const props = withDefaults(defineProps<{
//     icon: string,
//     color?: string,
//     size?: string | number
// }>(),
//     {
//         size: 16
//     }
// )

// const vnode = ()=>{
//    return h(resolveComponent("el-icon"),{size:props.size,color:props.color},[h(resolveComponent(props.icon))])
// }

</script>
<style lang='scss' scoped></style>