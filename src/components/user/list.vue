<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--搜索添加-->
      <div class="search-add clearfix">
        <router-link to="/user/new">
          <input type="button" class="btn btn-primary" value="用户创建">
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
                  <td>{{val.id}}</td> 
                  <td>{{val.user}}</td>
                  <td>{{val.phone}}</td>
                  <td>{{val.email}}</td>
                  <td>{{val.userType}}</td>
                  <td>{{val.devices}}</td>
                  <td>{{val.createTime}}</td>
                  <td class="tools">
                    <ul>
                      <li class="icon" :class="tools.editClass" @click="edit(val)" v-html="tools.edit"></li>
                      <li class="icon" :class="tools.deleteClass" @click="deleteHint(val,key)" v-html="tools.delete" v-if="!val.devices"></li>
                    </ul>
                  </td>
              </tr>
          </tbody>
        </table> 
      </div>
      <page></page>
    </div>
    <modal :modal="modal"></modal>
  </div>
</template>

<script>
import $ from 'n-zepto';
import App from '@/js/app';
import commitAjax from '@/js/commitAjax';
import location from '@/components/tool/location'
import search from '@/components/tool/search'
import page from '@/components/tool/page'
import modal from '@/components/tool/modal'
export default {
  name: 'userList',
  components : {
    location,
    search,
    page,
    modal
  }
  data () {
    return {
      location : [{
        name : "用户管理",
        path : "/user"
      }],
      modal : {},
      titles : [{
        name : "序号"
      },{
        name : "用户ID"
      },{
        name : "用户名称"
      },{
        name : "手机"
      },{
        name : "邮箱"
      },{
        name : "用户类型"
      },{
        name : "设备数量"
      },{
        name : "创建时间"
      },{
        name : "操作"
      }],
      list : [{
        id : "330011",
        user : "成吉思汗",
        phone : "18888888888",
        email : "18888888888@qq.com", 
        userType : "超管用户",
        createTime : "2017-02-11 10:10:00",
        devices : 2,
      },{
        id : "330012",
        user : "刘秀",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "厂家用户",        
        createTime : "2017-02-11 10:10:00",
        devices : 3,
        class : "",
      },{
        id : "330013",
        user : "刘邦",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "环保局用户",
        createTime : "2017-02-11 10:10:00",
        devices : 4,
        class : "",
      },{
        id : "330011",
        user : "成吉思汗",
        phone : "18888888888",
        email : "18888888888@qq.com", 
        userType : "超管用户",
        createTime : "2017-02-11 10:10:00",
        devices : 0,
        class : "",
      },{
        id : "330012",
        user : "刘秀",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "厂家用户",
        createTime : "2017-02-11 10:10:00",
        devices : 3,
        class : "",
      },{
        id : "330013",
        user : "刘邦",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "环保局用户",
        createTime : "2017-02-11 10:10:00",
        devices : 0,
        class : "",
      },{
        id : "330011",
        user : "成吉思汗",
        phone : "18888888888",
        email : "18888888888@qq.com", 
        userType : "超管用户",
        createTime : "2017-02-11 10:10:00",
        devices : 1,
        class : "",
      },{
        id : "330012",
        user : "刘秀",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "厂家用户",
        createTime : "2017-02-11 10:10:00",
        devices : 0,
        class : "",
      },{
        id : "330013",
        user : "刘邦",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "环保局用户",
        createTime : "2017-02-11 10:10:00",
        devices : 0,
        class : "",
      },{
        id : "330011",
        user : "成吉思汗",
        phone : "18888888888",
        email : "18888888888@qq.com", 
        userType : "超管用户",
        createTime : "2017-02-11 10:10:00",
        devices : 7,
        class : "",
      }],
      tools : {
        edit : "&#xe69e;",
        editClass : "success hover",
        delete : "&#xe601;",
        deleteClass : "danger hover"
      }
    }
  },
  created(){
    var self = this;
    //获取用户信息
    let args = {"Uid":-1};
    commitAjax.AJAX({
      url : App.userProfile,
      data : args,
      type : "GET",
      success(r){
        window.userInfo = r;
      },
      error(r){
        self.$router.push("/");
      },
      headers : {
        Authorization: "Bearer "+userToken.access_token
      }
    });
  },
  methods:{
    //编辑
    edit(val){
      // path: '/user/edit/:id/:user/:phone/:email/:userType/:devices',
      this.$router.push('/user/edit/'+val.id+'/'+val.user+'/'+val.phone+'/'+val.phone+'/'+val.userType+'/'+val.devices);
      // this.$router.push('/user/edit/'+val.id);
    },
    //删除提示
    deleteHint(val,index){
      var self = this;
      this.modal = {
        show : true,
        icon : "&#xe601;",
        iconClass : "danger",
        val : val,
        hint : "是否确定要删除？",
        tools : {
          submit : "确定",
          submitClass : "btn-danger",
          submitCallback(){
            self.list[index].class = "fadeOut"; 
            setTimeout(()=>{ 
              self.list.splice(index,1);
            },500);
          },
          cancel : "取消",
          cancelClass : "btn-primary",
          cancelCallback(){
          },
        },
      }
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
