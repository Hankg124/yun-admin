import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      name:'Login',
      component:()=>import('@/views/login/login.vue')
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            //面包屑内容
            title:"首页",
            //菜单图标
            icon:"Menu",
            //页面是否需要缓存  false为不缓存  true为缓存
            cache:true,
            //控制当前是否显示为菜单  false为显示  true为不显示
            hidden:false
          }
        },
        {
          path: '/system',
          name: 'systemMenu',
          meta: {
            title:"系统管理",
            icon:"Menu"
          },
          redirect:"/system/menu",
          children:[
            {
              path: '/system/menu',
              name: 'systemMenu',
              component: () => import('@/views/system/menu/index.vue'),
              meta: {
                title:"菜单管理",
                icon:"Menu",
                cache:true,
                hidden:false
              }
            },
            {
              path: '/system/role',
              name: 'systemRole',
              component: () => import('@/views/system/role/index.vue'),
              meta: {
                title:"角色管理",
                icon:"Menu",
                cache:false,
                hidden:false
              }
            },
            {
              path: '/system/user',
              name: 'systemUser',
              component: () => import('@/views/system/user/index.vue'),
              meta: {
                title:"用户管理",
                icon:"Menu",
                cache:false,
                hidden:false
              }
            }
          ]
        },
        {
          path: '/goods',
          name: 'goods',
          meta: {
            title:"商品管理",
            icon:"Menu"
          },
          redirect:"/goods/list",
          children:[
            {
              path: '/goods/list',
              name: 'goodsList',
              component: () => import('@/views/goods/list/index.vue'),
              meta: {
                title:"商品列表",
                icon:"Menu",
                cache:false,
                hidden:false
              }
            },
            {
              path: '/goods/category',
              name: 'goodsCategory',
              component: () => import('@/views/goods/category/index.vue'),
              meta: {
                title:"商品分类",
                icon:"Menu",
                cache:false,
                hidden:false
              }
            }
          ]
        },
        {
          path: '/mengxuegu',
          name: 'Mengxuegu',
          component: () => import('@/views/link/index.vue'),
          meta: {
            title:"积云官网",
            icon:"Menu",
            cache:false,
            hidden:false
          }
        },
        {
          path: '/401',
          name: 'NoPromission',
          component: () => import('@/views/error/401.vue'),
          meta: {
            title:"梦学谷官网",
            icon:"Menu",
            cache:false,
            hidden:false
          }
        },
        {
          path: '/:pathMatch(.*)*',
           name: 'NotFound',
          component: () => import('@/views/error/404.vue'),
          meta: {
            title:"梦学谷官网",
            icon:"Menu",
            cache:false,
            hidden:false
          }
        },
      ]
    }
  ]
})
// /system/role
export default router
