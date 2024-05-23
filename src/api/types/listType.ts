//请求数据类型
export type ListParamsType = {
    /**
     * 页码
     */
    current: number;
    /**
     * 商品名称/编码
     */
    keyword: string;
    /**
     * 条数
     */
    size: number;
    /**
     * 商品状态
     */
    status: number | string;
}

// 响应数据类型
export type resListParamsType = {
    records: Record[];
    total: number;
}

export type Record = {
    address: string;
    brand: string;
    categoryId: number;
    categoryName: string;
    code: number;
    cost: number;
    createTime: string;
    discountPrice: number;
    goodsDetail: string;
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    quickCode: string;
    remark: string;
    score: number;
    sort: number;
    specsName: string;
    status: number;
    stockNum: number;
    unitName: string;
    updateTime: string;
}

// 商品状态请求数据类型
export type GoodListStatusType = {
    id: number;
    status: number;
}

//添加数据类型
export type AddListParamsType = {
    address: string;
    brand: string;
    categoryId: number | string;
    code: string;
    cost: number;
    discountPrice: number;
    goodsDetail: string;
    imageUrl: string;
    name: string;
    price: number;
    quickCode: string;
    remark: string;
    score: number;
    sort: number;
    specsName: string;
    status: number | boolean;
    stockNum: number;
    unitName: string;
}

//分类数据类型
export type typeListType = {
    categoryId: number;
    categoryName: string;
}

//修改商品状态数据类型
export type updataStatusParamsType = {
    id: number;
    status: number;
}

