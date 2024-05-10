// export type LoginParamsType = {
//     username: string;
//     password: string;
// }

//定义请求的参数类型
export type LoginParamsType = {
    password: string;
    username: string;
}
//定义响应的参数类型
export type responseLoginType = {
    code: number;
    data: Data;
    message: string;
}

export type Data = {
    access_token: string;
    [property: string]: any;
}
