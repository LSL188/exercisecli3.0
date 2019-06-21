import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/home/Home.vue'
import Welcome from './views/home/Welcome.vue'
import User from './views/user/User.vue'
import Role from './views/power/Role.vue'
import Power from './views/power/Power.vue'
import GoodsList from './views/goods/GoodsList.vue'
import GoodsAdd from './views/goods/GoodsAdd.vue'
import GoodsParams from './views/goods/GoodsParams.vue'
import GoodsCategories from './views/goods/GoodsCategories.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      redirect: 'welcome',
      component: Home,
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: User },
        { path: '/roles', component: Role },
        { path: '/rights', component: Power },
        { path: '/goods', redirect: '/goods/list'},
        { path: '/goods/list', component: GoodsList},
        { path: '/goods/add', component: GoodsAdd},
        { path: '/params', component: GoodsParams },
        { path: '/categories', component: GoodsCategories }
      ] 
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
