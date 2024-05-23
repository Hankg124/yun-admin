import request from '@/utils/index'
import type {AddListParamsType, GoodListStatusType, ListParamsType, resListParamsType, typeListType, updataListParamsType} from "../types/listType"

// 获取列表
export const getListApi=(ListParams:ListParamsType)=>{
    return request<resListParamsType>("/goods/search","POST",ListParams);
}

// 修改商品状态
export const GoodListStatusApi=(statusParams:GoodListStatusType)=>{
    return request("/goods/status","PUT",statusParams)
}

//删除
export const delGoodApi=(id:number)=>{
    return request("/goods/"+id,"DELETE")
}

// 添加
export const addGoodApi=(addParams:AddListParamsType)=>{
    return request("/goods","POST",addParams);
}

//根据商品编码查询接口
export const getGoodDetailApi=(code:string)=>{
    return request("/goods/exist","GET",{code})
}

//获取商品分类列表
export const getTypeListApi=()=>{
    return request<typeListType>("/goods/category/list","GET")
}

//修改商品状态
export const updateGoodApi=(ListParams:updataListParamsType)=>{
    return request("/goods/status","PUT",ListParams)
}

//修改商品数据类型
export const updataListParamsApi=(updataParams:AddListParamsType)=>{
    return request("/goods","PUT",updataParams)
}