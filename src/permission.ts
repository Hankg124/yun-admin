import router from "@/router";
import {useAuthStore} from "@/stores/auth"

// 路由守卫
//beforeEach是Vue Router的导航守卫，用于在路由跳转前执行某些操作
// 如果你在beforeEach生命周期中实例化Pinia store，确保在实例化之后再使用store中的状态或action。这是因为beforeEach是同步执行的，如果你在beforeEach中直接使用store，可能会遇到store还没有实例化完毕的情况。

// 解决方案是在beforeEach中不直接使用store，而是设置一个标志或者使用异步的方式确保在使用store之前它已经被实例化。
router.beforeEach((to, from, next) => {
    const state=useAuthStore();
    const whiteList = ['/login']
    // 判断是否需要权限
    if (state.token) {
        if(to.path=="/login"){
             next({path:from.path})
        }else{
             next()
        }
    }else{
        if(whiteList.includes(to.path)){
             next()
        }else{
             next("/login");
        }
    }
})