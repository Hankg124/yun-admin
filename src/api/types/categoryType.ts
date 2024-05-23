
//获取商品分类请求数据类型
export type ClassificationType = {
    /**
     * 页码
     */
    current: number;
    /**
     * 分类名称
     */
    name: string;
    /**
     * 条数
     */
    size: number;
}

export type CategoryListType = {
    records: Record[];
    total: number;
}

export type Record = {
    id: number;
    name: string;
    remark: string;
    sort: number;
    status: boolean;
}