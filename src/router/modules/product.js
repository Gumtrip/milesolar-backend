import Layout from '@/layout'
const product = {
  path: '/product',
  component: Layout,
  redirect: '/product/list',
  name: 'product',
  meta: {
    title: '产品',
    icon: 'example'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/product/product/create'),
      name: 'ProductCreate',
      meta: { title: '新建产品', icon: 'edit' },
      hidden: true
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/product/product/edit'),
      name: 'ProductEdit',
      meta: { title: '编辑产品', noCache: true, activeMenu: '/product/list' },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/product/product/list'),
      name: 'ProductList',
      meta: { title: '产品列表', icon: 'list' }
    },
    {
      path: 'cate/create',
      component: () => import('@/views/product/product_cate/create'),
      name: 'ProductCateCreate',
      meta: { title: '新增产品分类', icon: 'edit', activeMenu: '/product/cate/list' },
      hidden: true
    },
    {
      path: 'cate/edit/:id(\\d+)',
      component: () => import('@/views/product/product_cate/edit'),
      name: 'ProductCateEdit',
      meta: { title: '编辑产品分类', noCache: true, activeMenu: '/product/cate/list' },
      hidden: true
    },
    {
      path: 'cate/list',
      component: () => import('@/views/product/product_cate/list'),
      name: 'ProductCateList',
      meta: { title: '产品分类列表', icon: 'list' }
    },
    //  属性
    {
      path: 'property/create',
      component: () => import('@/views/product/property/create'),
      name: 'PropertyCreate',
      meta: { title: '属性新建', icon: 'edit', activeMenu: '/property/list' },
      hidden: true
    },
    {
      path: 'property/edit/:id(\\d+)',
      component: () => import('@/views/product/property/edit'),
      name: 'PropertyEdit',
      meta: { title: '属性编辑', noCache: true, activeMenu: '/property/list' },
      hidden: true
    },
    {
      path: 'property/list',
      component: () => import('@/views/product/property/list'),
      name: 'PropertyList',
      meta: { title: '属性列表', icon: 'list' }
    },
    // 属性分类
    {
      path: 'property-category/create',
      component: () => import('@/views/product/property_cate/create'),
      name: 'PropertyCateCreate',
      meta: { title: '属性分类产品', icon: 'edit', activeMenu: '/property/list' },
      hidden: true
    },
    {
      path: 'property-category/edit/:id(\\d+)',
      component: () => import('@/views/product/property_cate/edit'),
      name: 'PropertyCateEdit',
      meta: { title: '属性分类产品', noCache: true, activeMenu: '/property/list' },
      hidden: true
    },
    {
      path: 'property-category/list',
      component: () => import('@/views/product/property_cate/list'),
      name: 'PropertyCateList',
      meta: { title: '属性分类列表', icon: 'list' }
    }

  ]
}

export default product

