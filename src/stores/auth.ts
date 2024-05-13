
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Local } from "@/utils/storage"
import type { StateType } from "@/types/login"
import { loginApi } from "@/api/auth"

export const useAuthStore = defineStore('auth', () => {
    //令牌
    const token = ref<string>('')

    //存储token
    const setToken = (value: string) => {
        token.value = value
    }

    // // 存储账号与密码
    const stRememberPwd = (states: StateType) => {
        if (states.isRemember) {
            Local.set("username", states.loginForm.username);
            Local.set("password", states.loginForm.password);
            Local.set("isRemember", states.isRemember);
        } else {
            Local.remove("username");
            Local.remove("password");
            Local.remove("isRemember");
        }
    }
    //登录操作
    const userLogin = async (states: StateType) => {
        try {
            // 调用登录接口
            const res = await loginApi(states.loginForm);
            // 存储token
            setToken(res.data.data.access_token)
            console.log(res);
            return res;
            // 存储token
        }
        catch (error) {
            console.log(error);
        }
    }

    //删除token
    const removeToken = () => {
        token.value = ''
    }
    return {
        token,
        setToken,
        removeToken,
        stRememberPwd,
        userLogin
    }
},
    {
        persist: true,
    }
)