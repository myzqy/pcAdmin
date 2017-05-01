import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import './css/public/main.less';//公用样式

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