import Layout from '@/layout'
const article = {
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
      component: () => import('@/views/article/article/list'),
      name: 'ArticleList',
      meta: { title: '文章列表', icon: 'list' }
    },
    {
      path: 'cate/list',
      component: () => import('@/views/article/article_cate/list'),
      name: 'ArticleCateList',
      meta: { title: '文章列表分类', icon: 'list' }
    },
    {
      path: 'create',
      component: () => import('@/views/article/article/create'),
      name: 'ArticleCreate',
      meta: { title: '新增文章', icon: 'edit', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/article/article/edit'),
      name: 'ArticleEdit',
      meta: { title: '编辑文章', noCache: true, activeMenu: '/article/list' },
      hidden: true
    },

    {
      path: 'cate/create',
      component: () => import('@/views/article/article_cate/create'),
      name: 'ArticleCateCreate',
      meta: { title: '新增文章分类', icon: 'edit', noCache: true },
      hidden: true
    },
    {
      path: 'cate/edit/:id(\\d+)',
      component: () => import('@/views/article/article_cate/edit'),
      name: 'ArticleCateEdit',
      meta: { title: '编辑文章分类', noCache: true, activeMenu: '/article/cate/list' },
      hidden: true
    }
  ]
}
export default article

