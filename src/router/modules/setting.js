import Layout from '@/layout'
const setting = {
  path: '/setting',
  component: Layout,
  redirect: '/setting/list',
  name: 'Setting',
  meta: {
    title: '配置',
    icon: 'example'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/setting/setting/create'),
      name: 'SettingCreate',
      meta: { title: '新增配置', icon: 'edit' },
      hidden: true

    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/setting/setting/edit'),
      name: 'SettingEdit',
      meta: { title: '编辑配置', noCache: true, activeMenu: '/setting/list' },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/setting/setting/list'),
      name: 'SettingList',
      meta: { title: '配置列表', icon: 'list' }
    },
    {
      path: 'cate/create',
      component: () => import('@/views/setting/setting_cate/create'),
      name: 'SettingCateCreate',
      meta: { title: '新增配置分类', icon: 'edit' },
      hidden: true

    },
    {
      path: 'cate/edit/:id(\\d+)',
      component: () => import('@/views/setting/setting_cate/edit'),
      name: 'SettingCateEdit', meta: { title: '编辑配置分类', noCache: true, activeMenu: '/setting/cate/list' },
      hidden: true
    },
    {
      path: 'cate/list',
      component: () => import('@/views/setting/setting_cate/list'),
      name: 'SettingCateList',
      meta: { title: '配置分类列表', icon: 'list' }
    }
  ]
}
export default setting

