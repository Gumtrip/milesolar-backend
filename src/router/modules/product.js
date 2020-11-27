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
      component: () => import('@/views/product/create'),
      name: 'ProductCreate',
      meta: { title: '新建产品', icon: 'edit' },
      hidden: true
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/product/edit'),
      name: 'ProductEdit',
      meta: { title: '编辑产品', noCache: true, activeMenu: '/product/list' },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/product/list'),
      name: 'ProductList',
      meta: { title: '产品列表', icon: 'list' }
    },
    {
      path: 'cate/create',
      component: () => import('@/views/product_cate/create'),
      name: 'ProductCateCreate',
      meta: { title: '新增产品分类', icon: 'edit', activeMenu: '/product/cate/list' },
      hidden: true
    },
    {
      path: 'cate/edit/:id(\\d+)',
      component: () => import('@/views/product_cate/edit'),
      name: 'ProductCateEdit',
      meta: { title: '编辑产品分类', noCache: true, activeMenu: '/product/cate/list' },
      hidden: true
    },
    {
      path: 'cate/list',
      component: () => import('@/views/product_cate/list'),
      name: 'ProductCateList',
      meta: { title: '产品分类列表', icon: 'list' }
    }
  ]
}

export default product

