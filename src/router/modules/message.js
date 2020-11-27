import Layout from '@/layout'
const message = {
  path: '/messages',
  component: Layout,
  redirect: '/messages/list',
  name: 'Message',
  meta: {
    title: '消息',
    icon: 'example'
  },
  children: [
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/message/edit'),
      name: 'MessageEdit',
      meta: { title: '消息详情', noCache: true, activeMenu: '/messages/list' },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/message/list'),
      name: 'MessageList',
      meta: { title: '消息列表', icon: 'list' }
    }
  ]
}
export default message

