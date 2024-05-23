import request from '@/utils/index'
import type { CategoryListType, ClassificationType } from '../types/categoryType'


//获取商品分类数据
export const getClassificationApi=(classParams:ClassificationType)=>{
    return request<CategoryListType>("/goods/category/search","POST",classParams)
}