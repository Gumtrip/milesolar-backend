import Layout from '@/layout'
const order = {
  path: '/order',
  component: Layout,
  redirect: '/order/list',
  name: 'Order',
  meta: {
    title: '订单',
    icon: 'example'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/order/order/list'),
      name: 'OrderList',
      meta: { title: '订单列表', icon: 'list' }
    },
    {
      path: 'create',
      component: () => import('@/views/order/order/create'),
      name: 'OrderCreate',
      meta: { title: '新增订单', icon: 'edit', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/order/order/edit'),
      name: 'OrderEdit',
      meta: { title: '编辑订单', noCache: true, activeMenu: '/order/list' },
      hidden: true
    }
  ]
}
export default order

