//角色管理页面接口

// 请求角色列表数据类型
export type paramsRoleType = {
    /**
     * 页码
     */
    current: number;
    /**
     * 角色名称
     */
    name: string;
    /**
     * 条数
     */
    size: number;
}
export type paramsRoleRecordType = {
    records: Record[];
    total: number;
}

export type Record = {
    createTime: string;
    id: number;
    remark: string;
    roleCode: string;
    roleName: string;
    status: boolean;
    updateTime: string;
}