import request from "@/utils/index";
import type { LoginParamsType, responseLoginType } from "./types/authType";


//登录接口
export const loginApi = (loginParams:LoginParamsType) => {
    return request<responseLoginType>("/auth/token","POST",loginParams);
}