import Layout from '@/layout'
const sample = {
  path: '/sample',
  component: Layout,
  redirect: '/sample/list',
  name: 'Sample',
  meta: {
    title: '案例',
    icon: 'example'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/sample/list'),
      name: 'SampleList',
      meta: { title: '案例列表', icon: 'list' }
    },
    {
      path: 'cate/list',
      name: 'SampleCateList',
      component: () => import('@/views/sample_cate/list'),
      meta: {
        title: '案例分类列表',
        icon: 'example'
      }
    },
    {
      path: 'create',
      component: () => import('@/views/sample/create'),
      name: 'SampleCreate',
      meta: { title: '新增案例', icon: 'edit', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/sample/edit'),
      name: 'SampleEdit',
      meta: { title: '编辑案例', noCache: true, activeMenu: '/sample/list' },
      hidden: true
    },
    {
      path: 'cate/create',
      component: () => import('@/views/sample_cate/create'),
      name: 'SampleCateCreate',
      meta: { title: '新增案例分类', icon: 'edit', noCache: true },
      hidden: true
    },
    {
      path: 'cate/edit/:id(\\d+)',
      component: () => import('@/views/sample_cate/edit'),
      name: 'SampleCateEdit',
      meta: { title: '编辑案例分类', noCache: true, activeMenu: '/sample/cate/list' },
      hidden: true
    }
  ]
}
export default sample

