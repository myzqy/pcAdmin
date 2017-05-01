<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <div class="table-box">
        设备编号：207212311
        <table class="table mt20">
          <thead>
          <tr>
              <th v-for="val in titles" v-bind:style="val.styleObject">
                  {{val.name}}
              </th>
          </tr>
          </thead> 
          <tbody>
              <tr v-for="(val,key) in list" :class="val.class">  
                  <td>{{key+1}}</td>
                  <td>{{val.time}}</td> 
                  <td>
                      <div class="tl">
                        {{val.log}}
                      </div>
                  </td>
              </tr>
          </tbody>
        </table> 
      </div>
      <page :page="page" v-on:message="changePage"></page>
    </div>
    <modal :modal="modal"></modal>
  </div>
</template>

<script>
import Vue from 'vue';
import location from '@/components/tool/location';
import search from '@/components/tool/search';
import page from '@/components/tool/page';
import modal from '@/components/tool/modal';
import $ from 'n-zepto';
import App from '@/js/app';
import commitAjax from '@/js/commitAjax';
import {Tool} from '@/js/tool/tool.js';
export default {
  name: 'userList',
  data () {
    return {
      location : [{
        link : "/devices",
        name : "设备管理",
        path : "/devices"
      },{
        name : "设备警告日志",
        path : "/devices/warning"
      }],
      modal : {},
      page : {},
      orderNumber : 0,
      titles : [{
        name : "序号"
      },{
        name : "日志时间",
        styleObject : {
          width : "200px"
        }
      },{
        name : "警告日志"
      }],
      list : [{
        time : "2013-10-10 18:11:35",
        log : `{"code":3400010,"desc":"Could not authenticate user. Verify the user name and password, and try again","timestamp":1492990328790}{"code":3400010,"desc":"Could not authenticate user. Verify the user name and password, and try again","timestamp":1492990328790}{"code":3400010,"desc":"Could not authenticate user. Verify the user name and password, and try again","timestamp":1492990328790}{"code":3400010,"desc":"Could not authenticate user. Verify the user name and password, and try again","timestamp":1492990328790}{"code":3400010,"desc":"Could not authenticate user. Verify the user name and password, and try again","timestamp":1492990328790}{"code":3400010,"desc":"Could not authenticate user. Verify the user name and password, and try again","timestamp":1492990328790}{"code":3400010,"desc":"Could not authenticate user. Verify the user name and password, and try again","timestamp":1492990328790}`,
      }]
    }
  },
  methods:{
    //获取列表
    getList(){
      var args = {
        devTid : this.$route.params.id,
        pid : window.pid,
      }
      commitAjax.AJAX({
        url : App.deviceLog,
        data : args,
        type : "GET", 
        success (r){
          console.log(r,"rrr");
        },
        error (r){
          console.log(r,"errorrrr");
        },
        headers : {
          Authorization: "Bearer "+userToken.access_token
        }
      });
    },
    changePage(num){ 
      //获取用户信息
      this.getList(num);
    },
  },
  created(){
    //获取列表
    this.getList();
    //window.history.pushState("","","?devices?a=2124");
  },
  components : {
    location,
    page,
    modal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
