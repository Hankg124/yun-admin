
import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth',()=>{
    //令牌
    const token=ref<string>('')

    //存储token
    const setToken=(value:string)=>{
        token.value=value
    }

    //删除token
    const removeToken=()=>{
        token.value=''
    }
    return {
    token,
    setToken,
    removeToken
    }
},
{
    persist: true,
}
)