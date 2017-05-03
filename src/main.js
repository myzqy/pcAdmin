import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import './css/public/main.less';//公用样式

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


Vue.http.post("https://test-uaa-openapi.hekr.me/subUser/profile",{
  "type":"phone",
  "pid":"00000000000",
  "phoneNumber":18868707977,
  "password":111111,
  "userName":"LEE",
  "userEmail":"1308250571@qq.com",
  "userType":1,
  "token":"eb4a3266-0300-424e-a506-c17ca231beac"
},{ 
  headers : {
    "Authorization" : "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIzNzk0MDAwMDc5OSIsImlzb2xhdGlvbiI6IjAwMDAwMDAwMDAwIiwiZXhwIjoxNDkzODY4MDczLCJ0eXBlIjoiV0VCIiwiYXV0aG9yaXRpZXMiOlsiSlhfQURNSU4iLCJST0xFX1VTRVIiXSwianRpIjoiNDczOWFhZTEtYTQ0OS00YjU1LTgyZGEtYmQxOTQ5ZjYxMzlmIn0.WC7s71xNzh_taorr6ygyeIbfVcR8l2qSJSJgzVfuJTnZL7oIc71-Lo3QQnvf6SsJEpe6sIlfXAfMj4_4CRfO5g",
    "Accept": "application/json",
    "contentType": "application/json"
  }
}).then(function(r){
  console.log(r,"rrrrr");
},function(r){
  console.log(r,"error");
});