import Vue from 'vue'
import Router from 'vue-router'
import sample from './modules/sample'
import setting from './modules/setting'
import product from './modules/product'
import message from './modules/message'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'order',
    meta: {
      title: '订单',
      icon: 'example',
      hidden: true
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/order/create'),
        name: 'CreateOrder',
        meta: { title: '新增订单', icon: 'edit' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/order/edit'),
        name: 'EditOrder',
        meta: { title: '编辑订单', noCache: true, activeMenu: '/order/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/order/list'),
        name: 'OrderList',
        meta: { title: '订单列表', icon: 'list' }
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'Article',
    meta: {
      title: '文章',
      icon: 'example'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/article/list'),
        name: 'ArticleList',
        meta: { title: '文章列表', icon: 'list' }
      },
      {
        path: 'cate/list',
        component: () => import('@/views/article_cate/list'),
        name: 'ArticleCateList',
        meta: { title: '文章列表分类', icon: 'list' }
      },
      {
        path: 'create',
        component: () => import('@/views/article/create'),
        name: 'ArticleCreate',
        meta: { title: '新增文章', icon: 'edit', noCache: true },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/article/edit'),
        name: 'ArticleEdit',
        meta: { title: '编辑文章', noCache: true, activeMenu: '/article/list' },
        hidden: true
      },

      {
        path: 'cate/create',
        component: () => import('@/views/article_cate/create'),
        name: 'ArticleCateCreate',
        meta: { title: '新增文章分类', icon: 'edit', noCache: true },
        hidden: true
      },
      {
        path: 'cate/edit/:id(\\d+)',
        component: () => import('@/views/article_cate/edit'),
        name: 'ArticleCateEdit',
        meta: { title: '编辑文章分类', noCache: true, activeMenu: '/article/cate/list' },
        hidden: true
      }
    ]
  },
  sample,
  setting,
  product,
  message,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service suhpport
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
