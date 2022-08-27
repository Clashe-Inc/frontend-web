import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import AuthService from '../services/auth';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
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
