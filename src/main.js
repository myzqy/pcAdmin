import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import './js/common.js';

// import './js/datetimepicker/jquery.datetimepicker.css';
// import './js/datetimepicker/jquery.datetimepicker.min.js';

Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.http.options.emulateJSON = true;
/* eslint-disable no-new */
new Vue({ 
  el: '#app',
  router,
  VueResource,
  template: '<App/>',
  components: { App }
}); 

window.userInfo = JSON.parse(localStorage.userInfo);