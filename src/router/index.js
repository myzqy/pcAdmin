import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
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
      redirect : "/jiexing/login"
    },
    { 
      path: '/jiexing',
      redirect : "/jiexing/login"
    },
    //登陆 
    {
      path: '/jiexing/login',
      name: 'login',
      component : resolve => require(['@/components/login.vue'], resolve),
    },
    {
      path: '/jiexing/changePassword',
      name: 'changePassword',
      component : resolve => require(['@/components/changePassword.vue'], resolve),
    },
    //用户管理
    {
      path: '/jiexing/user',
      name: 'user',
      component : resolve => require(['@/components/user/list.vue'], resolve),
    },
    {
      path: '/jiexing/user/new',
      name: 'userNew',
      component : resolve => require(['@/components/user/new.vue'], resolve),
    },
    {
      path: '/jiexing/user/edit/:id',
      name: 'userEdit',
      component : resolve => require(['@/components/user/edit.vue'], resolve),
    },
    //权限管理
    {
      path: '/jiexing/permission/user',
      name: 'permission',
      component : resolve => require(['@/components/permission/userList.vue'], resolve),
    },
    {
      path: '/jiexing/permission/user/setDevices/:id',
      name: 'permissionUserSetDevice',
      component : resolve => require(['@/components/permission/userSetDevices.vue'], resolve),
    },
    {
      path: '/jiexing/permission/user/devices',
      name: 'permissionUserDevices',
      component : resolve => require(['@/components/permission/devicesList.vue'], resolve),
    },
    //设备管理
    {
      path: '/jiexing/devices',
      name: 'devices',
      component : resolve => require(['@/components/devices/list.vue'], resolve),
    },
    {
      path: '/jiexing/devices/new',
      name: 'devicesNew',
      component : resolve => require(['@/components/devices/new.vue'], resolve),
    },
    {
      path: '/jiexing/devices/new-batch',
      name: 'devicesNewBatch',
      component : resolve => require(['@/components/devices/new-batch.vue'], resolve),
    },
    {
      path: '/jiexing/devices/edit/:id/:pid',
      name: 'devicesEdit',
      component : resolve => require(['@/components/devices/edit.vue'], resolve),
    },
    {
      path: '/jiexing/devices/info/:id/:pid',
      name: 'devicesInfo',
      component : resolve => require(['@/components/devices/info.vue'], resolve),
    },
    {
      path: '/jiexing/devices/log/:id/:pid',
      name: 'devicesLog',
      component : resolve => require(['@/components/devices/log.vue'], resolve),
    },
    {
      path: '/jiexing/devices/warning/:id/:pid',
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


