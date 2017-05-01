import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// Router.beforeEach((to, from, next) => {
//     // do something 
//     next();
// });

export default new Router({
  mode : "history",
  routes: [
    { 
      // path: '*', component: NotFoundComponent 
      path: '*',
      component : resolve => require(['@/components/NotFoundComponent.vue'], resolve),
    },
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
      path: '/user/edit/:id',
      name: 'userEdit',
      component : resolve => require(['@/components/user/edit.vue'], resolve),
    },
    //权限管理
    {
      path: '/permission',
      name: 'permission',
      component : resolve => require(['@/components/permission/userList.vue'], resolve),
    },
    {
      path: '/permission/userSetDevices/:id',
      name: 'permissionUserSetDevices',
      component : resolve => require(['@/components/permission/userSetDevices.vue'], resolve),
    },
    {
      path: '/permissionDevices',
      name: 'permissionDevices',
      component : resolve => require(['@/components/permission/devicesList.vue'], resolve),
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
      path: '/devices/edit/:id',
      name: 'devicesEdit',
      component : resolve => require(['@/components/devices/edit.vue'], resolve),
    },
    {
      path: '/devices/log/:id',
      name: 'devicesLog',
      component : resolve => require(['@/components/devices/log.vue'], resolve),
    },
    {
      path: '/devices/warning/:id',
      name: 'devicesWarning',
      component : resolve => require(['@/components/devices/warning.vue'], resolve),
    },
    // {
    //   path: '/devices/warning/:id',
    //   name: 'devicesWarning',
    //   component : resolve => require(['@/components/devices/warning.vue'], resolve),
    // }
  ]
})
