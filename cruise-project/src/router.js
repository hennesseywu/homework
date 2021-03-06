import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/login'
import Home from './pages/Home'
import Agent from './pages/agent'
import Help from './pages/help.vue'

Vue.use(Router)

let routes = [{
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: 'DASHBOARD',
    leaf: true, //only one node
    children: [{
      path: '/dashboard',
      component: Help,
      name: 'DASHBOARD',
      iconCls: 'icon-dashboard', //icon
    }, ]
  },
  {
    path: '/',
    component: Home,
    name: 'AGENT',
    leaf: true,
    children: [{
      path: '/agent',
      component: Agent,
      name: 'AGENT',
      iconCls: 'icon-sitemap',
    }]
  },
  {
    path: '/',
    component: Home,
    name: 'MY CRUISE',
    leaf: true,
    children: [{
      path: '/mycruise',
      component: Help,
      name: 'MY CRUISE',
      iconCls: 'icon-boat'
    }]
  },
  {
    path: '/',
    component: Home,
    name: 'HELP',
    leaf: true,
    children: [{
      path: '/help',
      component: Help,
      name: 'HELP',
      iconCls: 'icon-life-bouy',
    }]
  },
  {
    path: '*',
    hidden: true,
    redirect: {
      path: '/404'
    }
  }
];

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router