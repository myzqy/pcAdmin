import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode : "history",
  routes: [
    {
      path: '/', 
      redirect : "/login"
    },
    //登陆
    {
      path: '/login',
      name: 'login',
      component : resolve => require(['@/components/login.vue'], resolve),
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component : resolve => require(['@/components/changePassword.vue'], resolve),
    },
    //用户管理
    {
      path: '/user',
      name: 'user',
      component : resolve => require(['@/components/user/list.vue'], resolve),
    },
    {
      path: '/user/new',
      name: 'userNew',
      component : resolve => require(['@/components/user/new.vue'], resolve),
    },
    {
      path: '/user/edit/:id/:user/:phone/:email/:userType/:devices',
      name: 'userEdit',
      component : resolve => require(['@/components/user/edit.vue'], resolve),
    },
    //权限管理
    {
      path: '/permission',
      name: 'permission',
      component : resolve => require(['@/components/permission/list.vue'], resolve),
    },
    //设备管理
    {
      path: '/devices',
      name: 'devices',
      component : resolve => require(['@/components/devices/list.vue'], resolve),
    },
    {
      path: '/devices/new',
      name: 'devicesNew',
      component : resolve => require(['@/components/devices/new.vue'], resolve),
    },
    {
      path: '/devices/log',
      name: 'devicesLog',
      component : resolve => require(['@/components/devices/log.vue'], resolve),
    }
  ]
})
