<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <div class="nowUser">
        <span>用户：185191672195</span>
        <span>杰兴超级管理员</span>
      </div>
      <!--搜索添加--> 
      <div class="search-add mt10 clearfix">
        <search :search="search" v-on:message2="useSearch" v-on:error="searchBack"></search>
      </div>
      <div class="table-box">
        <h5 class="title">未添加设备</h5>
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
                  <td>{{val.powerPdNo}}</td> 
                  <td class="tools">
                    <ul>
                      <li class="icon" :class="tools.addClass" @click="add(val,key)" v-html="tools.add"></li>
                    </ul>
                  </td>
              </tr>
              <!--<tr v-if="!userList.length">
                <td :colspan="titles.length">{{userListStatus}}</td>
              </tr>-->
              <tr v-if="userList.length==0">
                <td :colspan="userTitles.length">{{listStatus}}</td>
              </tr>
          </tbody>
        </table> 
      </div>
       <div class="table-box">
        <h5 class="title">已添加设备</h5>
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
                  <td>{{val.powerPdNo}}</td>  
                  <td class="tools">
                    <ul>
                      <li class="icon" :class="tools.delClass" @click="del(val,key)" v-html="tools.del"></li>
                    </ul>
                  </td>
              </tr>
              <tr v-if="deviceList.length==0">
                <td :colspan="deviceTitles.length">{{userListStatus}}</td>
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
import App from '@/js/app';
import location from '@/components/tool/location';
import page from '@/components/tool/page';
import modal from '@/components/tool/modal';
import search from '@/components/tool/search';
export default {
  name: 'userList',
  components : {
    location,
    modal,
    search
  },
  data () {
    return {
      location : [{
        name : "权限管理",
        path : "/jiexing/permission"
      },{
        link : "/jiexing/permission/user",
        name : "用户列表",
        path : "/jiexing/permission"
      },{
        name : "设置用户设备",
        path : "/jiexing/userSetDevices"
      }],
      modal : {},
      search : {
        placeholder : "请输入生厂编号查询",
        key : "powerPdNo",
        value : this.$route.query.searchVal||"",
        numStart : this.$route.query.numStart||"",
        numEnd : this.$route.query.numEnd||"",
        search : false,
        numSearch : true,
      },
      userList : [],
      userTitles : [{
        name : "序号"
      },{
        name : "生厂编号"
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
      userListStatus : "正在加载中...",
      tools : {
        add : "&#xe602;",
        addClass : "success hover",
        del : "&#xe601;",
        delClass : "danger hover",
      }
    }
  },
  created(){
    //获取设备信息
    this.getDeviceList("","","",[this.$route.query.numStart,this.$route.query.numEnd]);
  },
  methods:{
    //获取设备信息
    getDeviceList(page=this.$route.query.page,value=this.$route.query.searchVal,searchVal=this.$route.query.searchVal,numSearchVal){
      let self = this;
      page = page||0;
      let args = {size:99999,page:page};
      console.log(numSearchVal,"numSearchVal",[this.$route.query.numStart,this.$route.query.numEnd]);
      if(numSearchVal&&numSearchVal.length){
        args.startPowerPdNo = numSearchVal[0]||0;
        args.endPowerPdNo = numSearchVal[1]||0;
      }
      if(value){
        args["powerPdNo"] = value;
      }
      $.ajax({
        url : App.devList, 
        data : args,
        type : "GET", 
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success (r){
          console.log(r,"rrr");
          //遍历数组
          self.findList(r.content);
          self.listStatus = "没有数据";
          self.userListStatus = "没有数据";
          self.orderNumber = (window.pageSize*page)||0;
        },
        error (r){
          self.listStatus = r.desc||"获取数据失败";
        },
      });
    },
    //遍历数组
    findList(data){ 
      // self.userList = r.content; 
      var self = this; 
      self.userList = [];
      self.deviceList = [];
      let $id = this.$route.params.id;
      for(let i=0;i<data.length;i++){
        if(data[i].ownerUid&&data[i].ownerUid.length){
          for(let j=0;j<data[i].ownerUid.length;j++){
            if(data[i].ownerUid[j].uid==$id){
              self.deviceList.push(data[i]);
              break; 
            }
            if(j==data[i].ownerUid.length-1){
              self.userList.push(data[i]);
            }
          }
        }else{
          self.userList.push(data[i]);
        }
      }
    },
    //搜索添加 
    useSearch(value,numSearchVal){
      //获取列表
      this.getDeviceList(0,value,"",numSearchVal);
    },
    //搜索反馈
    searchBack(status){
      let self = this;
      if(status=="startValError"){
        self.modal = {
          show : true,
          type : "warning",
          hint : "编号起始不正确"
        };
      }else if(status=="endValError"){
        self.modal = {
          show : true,
          type : "warning",
          hint : "编号结尾不正确"
        };
      }else if(status=="startValSmall"){
        self.modal = {
          show : true,
          type : "warning",
          hint : "编号起始不能比结尾大"
        };
      }
      setTimeout(()=>{
        self.modal = {};
      },800);
    },
    add(val,key){
      var self = this;
      let args = {
        grantee : this.$route.params.id,
        pid : window.pid,
        devTid : val.devTid  
      }
      $.ajax({
        url : App.deviceAuthorization,
        data : args,
        type : "POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded","Authorization":"Bearer "+userToken.access_token},
        success(r){
          self.deviceList.push(self.userList[key]); 
          self.userList.splice(key,1);
        },
        error(r){
          self.modal = {
            show : true,
            type : "error",
            hint : "授权失败",
            cancel(){
              self.modal = {};
            }
          };
          setTimeout(()=>{
            self.modal={};
          },1000);
          console.log(r,"err");
        }
      }); 
      
    },
    del(val,key){
      var self = this;
      let args = {
        grantee : this.$route.params.id,
        pid : window.pid,
        devTid : val.devTid  
      } 
      console.log(args);
      // return;
      $.ajax({
        url : App.deleteDeviceAuthorization,
        data : args,
        type : "POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded","Authorization":"Bearer "+userToken.access_token},
        success(r){
          self.userList.push(self.deviceList[key]);
          self.deviceList.splice(key,1);
        },
        error(r){
          console.log(r,"err");
        }
      });
    }
  },
  
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.nowUser{
  height: 50px;
  padding:0 20px;
  background-color: #ddd;
  line-height: 50px;
  span{
    padding-right: 15px;
  }
}
.search-add{
  padding-bottom: 0;
}
.table-box{
  float: left;
  width:50%;
  padding-top: 0px;
  box-sizing: border-box;
  .title{
    height: 40px;
    font-weight: normal;
    line-height: 40px;
  }
}
.table{
  border:1px solid #eee;
}
</style>
