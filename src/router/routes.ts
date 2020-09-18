import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'loginpage',
        component: () => import('pages/Login.vue')
      }
    ]
  },
  {
    path: '/portal',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'portal', component: () => import('pages/Index.vue') },
      { path: '/oss', component: () => import('pages/OSS.vue') },
      {
        path: '/securityIndex',
        name: 'securityRoute',
        component: () => import('pages/SecurityIndex.vue')
      },
      {
        path: '/securityEvidence',
        name: 'securityEvidence',
        props: true,
        component: () => import('pages/SecurityEvidence.vue')
      },
      {
        path: '/securityDetails',
        name: 'securityDetails',
        props: true,
        component: () => import('pages/SecurityDetails.vue')
      },
      {
        path: '/securityChart',
        component: () => import('pages/Security.vue')
      },
      { path: '/noc', component: () => import('pages/NOC.vue') },
      {
        path: '/Customersupport',
        component: () => import('pages/Customersupport.vue')
      },
      {
        path: '/Networkplanning',
        component: () => import('pages/Networkplanning.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
