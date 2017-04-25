import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import './assets/css/public/main.less';//公用样式

// Vue.use(VueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({ 
  el: '#app',
  router,
  VueResource,
  template: '<App/>',
  components: { App }
});

//获取全局信息
window.pid = "00000000000";
window.userInfo = JSON.parse(localStorage.userInfo);