import request from '@/utils/index'

//文件上传
export const uploadImgApi = (data: any) => {
    return request("/system/media/upload/img",'POST',data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}