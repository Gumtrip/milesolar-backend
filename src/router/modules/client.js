import Layout from '@/layout'
const order = {
  path: '/client',
  component: Layout,
  redirect: '/client/list',
  name: 'Client',
  meta: {
    title: '订单',
    icon: 'example'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/client/list'),
      name: 'ClientList',
      meta: { title: '客户列表', icon: 'list' }
    },
    {
      path: 'create',
      component: () => import('@/views/client/create'),
      name: 'ClientCreate',
      meta: { title: '客户新增', icon: 'edit', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/client/edit'),
      name: 'ClientEdit',
      meta: { title: '客户编辑', noCache: true, activeMenu: '/client/list' },
      hidden: true
    }
  ]
}
export default order

