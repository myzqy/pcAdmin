<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--搜索添加-->
      <div class="search-add clearfix">
        <router-link to="/devices/new">
          <input type="button" class="btn btn-primary" value="设备信息录入">
        </router-link>
        <router-link to="/devices/log">
          <input type="button" class="btn btn-primary ml10" value="设备日志">
        </router-link>
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
                  <td>{{val.num}}</td> 
                  <td>{{val.factoryDate}}</td>
                  <td>{{val.factoryName}}</td>
                  <td>{{val.factoryContact}}</td>
                  <td>{{val.installdate}}</td>
                  <td>{{val.useTime}}</td>
                  <td>{{val.companyName}}</td>
                  <td>{{val.companyContact}}</td>
                  <td>{{val.SIM}}</td>
                  <td class="tools">
                    <ul>
                      <li class="icon" :class="tools.editClass" @click="tools.editFunc(val)" v-html="tools.edit"></li>
                      <li class="icon" :class="tools.deleteClass" @click="tools.deleteFunc(val,key)" v-html="tools.delete" v-if="!val.devices"></li>
                      <li class="icon" :class="tools.logClass" @click="tools.logFunc(val,key)" v-html="tools.log" v-if="!val.devices"></li>
                      <li class="icon" :class="tools.warningLogClass" @click="tools.warningLogFunc(val,key)" v-html="tools.warningLog" v-if="!val.devices"></li>
                    </ul>
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
      }],
      info : {
        a : 1,
        b : 3
      },
      modal : {},
      titles : [{
        name : "序号"
      },{
        name : "生厂编号"
      },{
        name : "生厂日期"
      },{
        name : "厂家名称"
      },{
        name : "厂家联系方式"
      },{
        name : "安装日期"
      },{
        name : "使用时长"
      },{
        name : "使用单位"
      },{
        name : "单位联系方式"
      },{
        name : "设备SIM"
      },{
        name : "操作"
      }],
      list : [{
        id : "330011",
        num : "aazz312345",
        factoryDate : "成吉思汗",
        factoryName : "阿里巴巴电器",
        factoryContact : "18868707977",
        installdate : "2017-02-11 10:10:00",
        useTime : "23小时",
        companyName : "华帮",
        SIM : "SIMSIM",
        companyContact : "18868707977"
      },{
        id : "330011",
        num : "aazz312345",
        factoryDate : "成吉思汗",
        factoryName : "阿里巴巴电器",
        factoryContact : "18868707977",
        installdate : "2017-02-11 10:10:00",
        useTime : "23小时",
        companyName : "华帮",
        SIM : "SIMSIM",
        companyContact : "18868707977"
      },{
        id : "330011",
        num : "aazz312345",
        factoryDate : "成吉思汗",
        factoryName : "阿里巴巴电器",
        factoryContact : "18868707977",
        installdate : "2017-02-11 10:10:00",
        useTime : "23小时",
        companyName : "华帮",
        SIM : "SIMSIM",
        companyContact : "18868707977"
      },{
        id : "330011",
        num : "aazz312345",
        factoryDate : "成吉思汗",
        factoryName : "阿里巴巴电器",
        factoryContact : "18868707977",
        installdate : "2017-02-11 10:10:00",
        useTime : "23小时",
        companyName : "华帮",
        SIM : "SIMSIM",
        companyContact : "18868707977"
      },{
        id : "330011",
        num : "aazz312345",
        factoryDate : "成吉思汗",
        factoryName : "阿里巴巴电器",
        factoryContact : "18868707977",
        installdate : "2017-02-11 10:10:00",
        useTime : "23小时",
        companyName : "华帮",
        SIM : "SIMSIM",
        companyContact : "18868707977"
      }],
      tools : {
        edit : "&#xe69e;",
        editClass : "success hover",
        editFunc(){},
        delete : "&#xe601;",
        deleteClass : "danger hover",
        deleteFunc(){},
        log : "&#xe64a;",
        logClass : "primary hover",
        logFunc(){},
        warningLog : "&#xe617;",
        warningLogClass : "danger hover",
        warningLogFunc(){},
      }
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
