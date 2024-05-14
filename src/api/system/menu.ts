import request from "@/utils/index";
import type { ResponseMenuListType, SearchParams } from "../types/menuType";

// 获取菜单列表
export const menuListApi =(searchParams:SearchParams)=>{
    return request<ResponseMenuListType[]>("/system/menu/search","POST",searchParams); 
}


//删除菜单
export const delMenuApi =(id:string)=>{
    return request("/system/menu/"+id,"DELETE"); 
}