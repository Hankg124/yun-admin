//请求用户列表数据类型
export type getUserParamsType = {
    /**
     * 页码
     */
    current: number;
    /**
     * 查询关键字
     */
    keyword: string;
    /**
     * 条数
     */
    size: number;
}

// 用户列表数据类型
export type userListType = {
    records: Record[];
    total: number;
}

export type Record = {
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    createTime: string;
    credentialsNonExpired: boolean;
    email: string;
    id: number;
    imageUrl: string;
    mobile: string;
    nickName: string;
    password: string;
    remark: string;
    roleIds: number[];
    updateTime: string;
    username: string;
}

//新增用户数据类型
export type addUserParamsType = {
    /**
     * 账号是否过期
     */
    accountNonExpired: boolean;
    /**
     * 账号是否锁定
     */
    accountNonLocked: boolean;
    /**
     * 密码是否过期
     */
    credentialsNonExpired: boolean;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 手机号
     */
    mobile: string;
    /**
     * 用户名
     */
    nickName: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 备注
     */
    remark: string;
    /**
     * 分配的角色
     */
    roleIds: number[];
    /**
     * 账号
     */
    username: string;
}

//重置密码请求数据类型
export type passUserType = {
    /**
     * 新密码
     */
    newPassword: string;
    /**
     * 确认密码
     */
    repPassword: string;
    /**
     * 用户id
     */
    userId: number | string;
}