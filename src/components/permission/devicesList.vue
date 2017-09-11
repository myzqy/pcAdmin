<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--搜索添加-->
      <div class="search-add tr clearfix">
        <router-link to="/jiexing/permission/user">
          <input type="button" class="btn btn-primary" value="前往用户列表">
        </router-link>
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
                  <td>{{val.powerPdNo}}</td> 
                  <td>{{val.cleanerPdName}}</td>
                  <td>{{val.cleanerUseCompanyPhone}}</td>
                  <td class="tools">
                    <ul>
                      <li class="icon" :class="tools.setClass" @click="set(val)" v-html="tools.set"></li>
                    </ul>
                  </td>
              </tr>
              <tr v-if="!list.length">
                <td :colspan="titles.length">{{listStatus}}</td>
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
        name : "权限管理",
        path : "/jiexing/permission"
      },{
        name : "设备管理",
        path : "/jiexing/permissionDevices"
      }],
      modal : {},
      page : {},
      orderNumber : 0,
      titles : [{
        name : "序号"
      },{
        name : "生厂编号"
      },{
        name : "厂家名称"
      },{
        name : "单位名称"
      },{
        name : "操作"
      }],
      list : [],
      listStatus : "正在加载中...",
      tools : {
        set : "&#xe603;",
        setClass : "success hover",
      }
    }
  },
  methods:{
    //编辑
    set(val){
      this.$router.push('/jiexing/permission/userSetDevices/'+val.powerPdNo);
    },
    //获取列表
    getList(page=this.$route.query.page){
      let self = this;
      page = page||0;
      let args = {size:window.pageSize,page:page};
      commitAjax.AJAX({
        url : App.devList, 
        data : args,
        type : "GET", 
        success (r){
          self.list = r.content;
          self.listStatus = "没有数据";
          self.page = r;
          self.orderNumber = (window.pageSize*page)||0;
        },
        error (r){
          self.listStatus = r.desc||"获取数据失败";
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
    // console.log(this.$router,"this.$router",this.$route.params,this.$route.query);
    // window.b = this.$route;
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
