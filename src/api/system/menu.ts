import request from "@/utils/index";
import type { ResponseMenuListType, SearchParams,ResponseSelectMenuType, MenuParamsType, MenuEditType } from "../types/menuType";

// 获取菜单列表
export const menuListApi =(searchParams:SearchParams)=>{
    return request<ResponseMenuListType[]>("/system/menu/search","POST",searchParams); 
}


//删除菜单
export const delMenuApi =(id:string)=>{
    return request("/system/menu/"+id,"DELETE"); 
}


//添加菜单
export const addMenuApi=(menuParams:MenuParamsType)=>{
    return request("/system/menu","POST",menuParams);
}

//选择菜单接口
export const selectMenuApi=()=>{
    return request<ResponseSelectMenuType>("/system/menu/select","GET");
}


//编辑菜单
export const editMenuApi=(menuParams:MenuParamsType)=>{
    return request("/system/menu","PUT",menuParams);
}