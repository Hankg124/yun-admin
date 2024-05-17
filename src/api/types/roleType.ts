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

//添加角色数据类型
export type addRoleType = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    /**
     * 备注
     */
    remark: string;
    /**
     * 角色编码
     */
    roleCode: string;
    /**
     * 角色名称
     */
    roleName: string;
    /**
     * 角色状态
     */
    status: boolean;
}