import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/oss', component: () => import('pages/OSS.vue') },
      {
        path: '/security',
        name: 'securityRoute',
        component: () => import('pages/Security.vue')
      },
      {
        path: '/securityDetails',
        name: 'securityDetails',
        component: () => import('pages/SecurityDetails.vue')
      },
      {
        path: '/securityIndex',
        component: () => import('pages/SecurityIndex.vue')
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
