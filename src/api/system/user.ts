import request from '@/utils/index'
import type { addUserParamsType, getUserParamsType, passUserType, userListType } from '../types/userType'


//请求用户列表数据
export const getUserListApi = (params: getUserParamsType) => {
    return request<userListType>("/system/user/search","POST",params)
}

//删除用户
export const deleteUserApi = (id: number) => {
    return request("/system/user/"+id,"DELETE")
}

//新增用户
export const addUserApi = (userParams: addUserParamsType) => {
    return request("/system/user","POST",userParams)
}

//修改
export const updateUserApi = (userParams: addUserParamsType) => {
    return request("/system/user","PUT",userParams)
}

//重置密码
export const passUserApi=(passParams:passUserType)=>{
    return request("/system/user/password","PUT",passParams)
}