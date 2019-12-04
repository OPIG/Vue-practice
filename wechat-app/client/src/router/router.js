import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children:[
      {
        path:'',
        redirect:'/me' //first redirect
      },
      {
        path:'/chats',
        name:'chats',
        component:() => import('../views/Chats')
      },
      {
        path:'/contacts',
        name:'contacts',
        component:()=>import('../views/Contacts.vue') //懒加载
      },
      {
        path:'/discover',
        name:'discover',
        component:()=>import('../views/Discover.vue') //懒加载
      },
      {
        path:'/moments',
        component:()=>import('../views/Moments.vue')
      },
      {
        path:'/me',
        name:'me',
        component:()=>import('../views/Me.vue') //懒加载
      }]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/register',
    name:'register',
    component:() => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to,from,next) => {
  const isLogin = localStorage.wxpyqToken ? true : false;
  if(to.path == '/register' || to.path == '/login'){
    next();
  }else{
    //next();
    isLogin ? next(): next('/login');
  }
})

export default router
