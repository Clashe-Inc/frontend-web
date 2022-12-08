import { authStore } from '@/stores/AuthStore';
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'Team',
        component: () => import('../views/TeamView.vue'),
        meta: {
          icon: 'mdi-account-multiple-plus',
          name: 'Team',
          order: 1,
        },
      },
      {
        path: 'comps',
        name: 'Comps',
        component: () => import('../views/CompsView.vue'),
        meta: {
          icon: 'mdi-controller',
          name: 'Comps',
          order: 2,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'Summoner Register',
    component: () => import('../views/RegisterSummonerView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const allowedRoutes: string[] = ['Summoner Register', 'Login'];
  const routeName = to.name?.toString() ?? '';
  if (!authStore.isAuthenticated && !allowedRoutes.includes(routeName)) {
    next({ name: 'Login' });
  } else next();
});

export default router;
