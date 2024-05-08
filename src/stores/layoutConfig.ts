import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutConfigStore = defineStore('layoutConfig',()=>{
    // 定义变量  true 展开  false 收起
    const isCollapse= ref(true);
    return {
        isCollapse
    }
})