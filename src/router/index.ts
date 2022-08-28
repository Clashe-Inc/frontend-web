import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import AuthService from '../services/auth';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/',
        name: 'Team',
        component: () => import('../views/TeamView.vue'),
        meta: {
          icon: 'mdi-account-multiple-plus',
          name: 'Team',
          order: 1,
        },
      },
      {
        path: '/comps',
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
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (!AuthService.isLoggedIn() && to.name !== 'Login') {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
