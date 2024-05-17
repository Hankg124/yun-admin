import request from "@/utils/index"
import type {addRoleType, paramsRoleRecordType, paramsRoleType} from "../types/roleType"

// 获取角色管理列表接口
export const getRoleListApi=(paramsRole?:paramsRoleType)=>{
    return request<paramsRoleRecordType>("/system/role/search","POST",paramsRole);
}
//删除接口
export const delRoleApi=(id:number)=>{
    return request("/system/role/"+id,"DELETE");
}

//添加接口
export const addParamsRoleApi=(paramsRole:addRoleType)=>{
    return request("/system/role","POST",paramsRole);
}

//修改
export const editParamsRoleApi=(paramsRole:addRoleType)=>{
    return request("/system/role","PUT",paramsRole);
}

//获取选中的权限接口
export const getRolePermissionApi=(id:number)=>{
    return request("/role/"+id+"/menu/ids","GET")
}

//分配权限接口
export const saveRole=(id:number,menuIds:string[])=>{
    return request("/system/role/"+id+"/menu/ids","POST",menuIds)
}