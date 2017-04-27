<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--搜索添加-->
      <div class="search-add clearfix">
        <search></search> 
      </div>
      <div class="table-box">
        <table class="table">
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
                      {{val.log}}
                  </td>
              </tr>
          </tbody>
        </table> 
      </div>
      <page></page>
    </div>
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
import {Tool} from '@/assets/js/tool.js';
export default {
  name: 'userList',
  data () {
    return {
      location : [{
        name : "设备管理",
        path : "/devices"
      },{
        name : "设备日志",
        path : "/devices"
      }],
      info : {
        a : 1,
        b : 3
      },
      modal : {},
      titles : [{
        name : "序号"
      },{
        name : "日志时间",
        styleObject : {
          width : "200px"
        }
      },{
        name : "日志"
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
      commitAjax.AJAX({
        url : App.devList,
        data : {},
        type : "GET", 
        success (r){
        },
        error (r){
        },
        headers : {
          Authorization: "Bearer "+userToken.access_token
        }
      });
    }
  },
  created(){
    console.log(this.$router,"this.$router",this.$route.params,this.$route.query);
    window.b = this.$route;
    //获取列表
    this.getList();
    //window.history.pushState("","","?devices?a=2124");
  },
  components : {
    location,
    search,
    page,
    modal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
