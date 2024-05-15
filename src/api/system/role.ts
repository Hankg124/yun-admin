import request from "@/utils/index"
import type {paramsRoleRecordType, paramsRoleType} from "../types/roleType"

// 获取角色管理列表接口
export const getRoleListApi=(paramsRole:paramsRoleType)=>{
    return request<paramsRoleRecordType>("/system/role/search","POST",paramsRole);
}

export const delRoleApi=(id:number)=>{
    return request("/system/role/"+id,"DELETE");
}