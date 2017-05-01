<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--搜索添加-->
      <div class="search-add tr clearfix">
        <router-link to="/permissionDevices">
          <input type="button" class="btn btn-primary" value="前往设备列表">
        </router-link>
        <!--<search></search> -->
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
                  <td>{{key+orderNumber+1}}</td>
                  <td>{{val.uid}}</td> 
                  <td>{{val.userName}}</td>
                  <td>{{val.userTypeName}}</td>
                  <td>{{val.devices}}</td>
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
import $ from 'n-zepto';
import App from '@/js/app';
import commitAjax from '@/js/commitAjax';
import location from '@/components/tool/location';
import page from '@/components/tool/page';
import modal from '@/components/tool/modal';
export default {
  name: 'userList',
  components : {
    location,
    page,
    modal
  },
  data () {
    return {
      location : [{
        name : "权限管理",
        path : "/permission"
      },{
        name : "用户列表",
        path : "/permission"
      }],
      modal : {},
      page : {},
      orderNumber : 0,
      titles : [{
        name : "序号"
      },{
        name : "用户ID"
      },{
        name : "用户名称"
      },{
        name : "用户类型"
      },{
        name : "设备数量"
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
  watch(){
    console.log(123123123123)
  },
  created(){
    //获取用户信息
    this.getUserList();
  },
  methods:{
    //获取用户信息
    getUserList(page=this.$route.query.page){
      var self = this;
      page = page||0;
      let args = {size:window.pageSize,page:page};
      commitAjax.AJAX({
        url : App.getUserList,
        data : args,
        type : "GET",
        success(r){
          self.list = r.content; 
          self.listStatus = "没有数据";
          self.page = r;
          self.orderNumber = (window.pageSize*page)||0;
        },
        error(r){
          self.listStatus = r.desc||"获取数据失败";
        }, 
        headers : {
          Authorization: "Bearer "+userToken.access_token
        }
      });
    },
    //编辑
    set(val){
      this.$router.push('/permission/userSetDevices/'+val.uid);
    },
    changePage(num){
      //获取用户信息
      this.getUserList(num);
    },
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
