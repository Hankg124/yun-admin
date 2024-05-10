<template>
    <el-main>
        <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <component :is="Component" v-if="$route.meta.cache" :key="$route.name" />
                </keep-alive>
            </transition>
            <transition name="fade" mode="out-in">
                <component :is="Component" v-if="!$route.meta.cache" :key="$route.name" />
            </transition>
        </RouterView>
    </el-main>
</template>
<script setup lang='ts'>


</script>
<style lang='scss' scoped>

</style>