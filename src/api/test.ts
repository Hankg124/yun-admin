import service from '@/utils/index';

export const test = ()=>{
    return service({
        url:'/',
        method:'get'
    })
}