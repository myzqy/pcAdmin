<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <div class="table-box">
        未添加设备
        <table class="table">
          <thead>
          <tr>
              <th v-for="val in userTitles" v-bind:style="val.styleObject">
                  {{val.name}}
              </th>
          </tr>
          </thead> 
          <tbody>
              <tr v-for="(val,key) in userList" :class="val.class">  
                  <td>{{key+orderNumber+1}}</td>
                  <td>{{val.uid}}</td> 
                  <td class="tools">
                    <ul>
                      <li class="icon" :class="tools.addClass" @click="add(val)" v-html="tools.add"></li>
                    </ul>
                  </td>
              </tr>
              <!--<tr v-if="!userList.length">
                <td :colspan="titles.length">{{userListStatus}}</td>
              </tr>-->
          </tbody>
        </table> 
      </div>
       <div class="table-box">
        已添加设备
        <table class="table">
          <thead>
          <tr>
              <th v-for="val in deviceTitles" v-bind:style="val.styleObject">
                  {{val.name}}
              </th>
          </tr>
          </thead> 
          <tbody>
              <tr v-for="(val,key) in deviceList" :class="val.class">  
                  <td>{{key+orderNumber+1}}</td>
                  <td>{{val.uid}}</td> 
                  <td class="tools">
                    <ul>
                      <li class="icon" :class="tools.delClass" @click="del(val)" v-html="tools.del"></li>
                    </ul>
                  </td>
              </tr>
              <!--<tr v-if="!userList.length">
                <td :colspan="titles.length">{{userListStatus}}</td>
              </tr>-->
          </tbody>
        </table>
      </div>
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
      },{
        name : "设置用户设备",
        path : "/userSetDevices"
      }],
      modal : {},
      userList : [],
      userTitles : [{
        name : "序号"
      },{
        name : "设备编号"
      },{
        name : "操作"
      }],
      deviceList : [],
      deviceTitles : [{
        name : "序号"
      },{
        name : "设备编号"
      },{
        name : "操作"
      }],
      listStatus : "正在加载中...",
      tools : {
        add : "&#xe602;",
        addClass : "success hover",
        del : "&#xe601;",
        delClass : "danger hover",
      }
    }
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
          self.userList = r.content; 
          self.userListStatus = "没有数据";
          self.deviceList = r.content; 
          self.userListStatus = "没有数据";
          // self.page = r;
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
    add(){}
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.table-box{
  float: left;
  width:40%;
  margin:0 5%;
  box-sizing: border-box;
}
</style>
