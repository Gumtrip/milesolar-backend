import Layout from '@/layout'
const sample = {
  path: '/pages',
  component: Layout,
  redirect: '/pages/list',
  name: 'Page',
  meta: {
    title: '单页',
    icon: 'example'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/page/page/list'),
      name: 'PageList',
      meta: { title: '单页', icon: 'list' }
    },
    {
      path: 'create',
      component: () => import('@/views/page/page/create'),
      name: 'PageCreate',
      meta: { title: '新增单页', icon: 'edit', noCache: true, activeMenu: '/pages/list' },
      hidden: true
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/page/page/edit'),
      name: 'PageEdit',
      meta: { title: '编辑单页', noCache: true, activeMenu: '/pages/list' },
      hidden: true
    }

  ]
}
export default sample

