//封装数据存储方法
export const Local={   //key为存储的名字   value为存储的内容
    //设置永久缓存
    set(key:string,value:any){
        localStorage.setItem(key,JSON.stringify(value || ""));
    },
    //获取永久缓存
    get(key:string){
        let json=localStorage.getItem(key);
        return JSON.parse(json as string);
    },
    //移出单个永久缓存
    remove(key:string){
        localStorage.removeItem(key);
    },
    //移出全部永久缓存
    clear(){
        localStorage.clear();
    }
}

export const Session={   //key为存储的名字   value为存储的内容
    //设置临时缓存
    set(key:string,value:any){
        sessionStorage.setItem(key,JSON.stringify(value || ""));
    },
    //获取临时缓存
    get(key:string){
        let json=sessionStorage.getItem(key);
        return JSON.parse(json as string);
    },
    //移出单个临时缓存
    remove(key:string){
        sessionStorage.removeItem(key);
    },
    //移出全部临时缓存
    clear(){
        sessionStorage.clear();
    }
}