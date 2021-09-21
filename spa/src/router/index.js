import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'store';
// import Home from '../views/Home.vue';

import DashboardLayout from 'layouts/DashboardLayout.vue';
// GeneralViews
import NotFound from 'pages/NotFoundPage.vue';

// Admin pages
import Overview from 'pages/Overview.vue';
import UserProfile from 'pages/UserProfile.vue';
import TableList from 'pages/TableList.vue';
import Typography from 'pages/Typography.vue';
import Icons from 'pages/Icons.vue';
// import Maps from 'pages/Maps.vue';
import Notifications from 'pages/Notifications.vue';
import Upgrade from 'pages/Upgrade.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    meta: { requiresAuth: true },
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Home.vue') },
      {
        path: 'notas-fiscais',
        name: 'Notas Fiscais',
        component: Overview,
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', name: 'Login', component: () => import('pages/Login.vue') },
    ],
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile,
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList,
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography,
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons,
      },
      // {
      //   path: 'maps',
      //   name: 'Maps',
      //   component: Maps,
      // },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications,
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade,
      },
    ],
  },
  { path: '*', component: NotFound },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['auth/isAuthenticated']) {
      next();
      return;
    }

    let query = {};
    if (to.fullPath !== '/') query.redirect = to.fullPath;

    next({
      name: 'Login',
      query,
    });
  } else {
    next();
  }
});

export default router;
