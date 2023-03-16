import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../views/login/index.vue'),
      meta: { iskeep: false }
    },
    {
      path: '/',
      redirect: '/layout',
      children: [
        {
          path: 'layout',
          redirect: '/layout/control',
          meta: { iskeep: true},
          component: ()=> import('../views/layout/index.vue'),
          children: [
            {
              path: 'control',
              component: () => import('../views/comtainer/BackgroundPanel/control/index.vue'),
              meta: { name: '控制台' }
            },
            {
              path: 'employees',
              component: () => import('../views/comtainer/ManagementEmployees/employees/index.vue'),
              meta: { name: '员工' }
            },
            {
              path: 'role',
              component: () => import('../views/comtainer/ManagementEmployees/role/index.vue'),
              meta: { name: '角色管理' }
            },
            {
              path: 'books',
              component: () => import('../views/comtainer/Books/Books/index.vue'),
              meta: { name: '图书' }
            },
            {
              path: 'writebook',
              component: () => import('../views/comtainer/writebook/index.vue'),
              meta: { name: '撰写小说' }
            },
            {
              path: 'news',
              component: () => import('../views/comtainer/news/index.vue'),
              meta: { name: '个人信息' }
            },
            {
              path: 'classify',
              component: () => import('../views/comtainer/Books/classify/index.vue'),
              meta: { name: '分类管理' }
            },
            {
              path: 'noticeinfo',
              component: () => import('../views/comtainer/news/BulletinInformation/index.vue'),
              meta: { name: '公告信息' }
            }
          ]
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  let valuetoken=localStorage.getItem('valuetoken')
  if(valuetoken){
    if(to.fullPath==='/login'){
      next('/')
    }
    else{
      next()
    }
  }
  else{
    if(to.fullPath!=='/login'){
      next('/login')
    }
    else{
      next()
    }
  }
})
export default router
