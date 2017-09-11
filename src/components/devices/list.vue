<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--搜索添加-->
      <div class="search-add clearfix">
        <router-link to="/jiexing/devices/new">
          <input type="button" class="btn btn-primary" value="设备信息录入">
        </router-link>
        <router-link to="/jiexing/devices/new-batch">
          <input type="button" class="btn btn-primary ml10" value="设备批量录入">
        </router-link>
        <search :search="search" v-on:message2="useSearch" v-on:error="searchBack"></search>
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
                  <td>{{val.devTid}}</td>
                  <td>
                    <router-link class="info" :to="'/jiexing/devices/info/'+val.devTid+'/'+val.pid">
                      {{val.powerPdNo}}
                    </router-link>
                  </td> 
                  <td>{{val.cleanerPdName}}</td>
                  <td>{{val.cleanerPdPhone}}</td>
                  <td>{{val.powerPdDate}}</td>
                  <td>{{val.cleanerInstallDate}}</td>
                  <td>{{val.cleanerUseTime}}</td>
                  <td>{{val.cleanerUseCompany}}</td>
                  <td>{{val.cleanerUseCompanyPhone}}</td>
                  <td>{{val.status}}</td>
                  <td>{{val.gis}}</td>
                  <td>{{val.cleanerSIMPhone}}</td>
                  <td class="tools">
                    <ul>
                      <li v-if="userTypeName!='环保局'" class="icon" :class="tools.editClass" @click="link(tools.editLink,val)" v-html="tools.edit"></li>
                      <li v-if="userTypeName!='生产厂家'&&!val.devices" class="icon" :class="tools.warningLogClass" @click="link(tools.warningLogLink,val)" v-html="tools.warningLog"></li>
                      <li v-if="userTypeName!='生产厂家'&&!val.devices" class="icon" :class="tools.logClass" @click="link(tools.logLink,val)" v-html="tools.log"></li>
                      <!--<li class="icon" :class="tools.deleteClass" @click="deleteHint(val)" v-html="tools.delete" v-if="!val.devices"></li>-->
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
import location from '@/components/tool/location';
import page from '@/components/tool/page';
import modal from '@/components/tool/modal';
import App from '@/js/app';
import {Tool} from '@/js/tool/tool.js';
import search from '@/components/tool/search';
export default {
  name: 'userList',
  components : {
    location,
    page,
    modal,
    search
  },
  data () {
    return {
      location : [{
        name : "设备管理",
        path : "/jiexing/devices"
      }],
      modal : {},
      page : {},
      orderNumber : 0,
      userTypeName : userInfo.userTypeName,
      search : {
        placeholder : "请输入devTid查询",
        key : this.$route.query.searchKey||"devTid",
        value : this.$route.query.searchVal||"",
        numStart : this.$route.query.numStart||"",
        numEnd : this.$route.query.numEnd||"",
        numSearch : true,
        select : [{
          name : "devTid",
          placeholder : "请输入devTid查询",
          key : "devTid"
        },{ 
          name : "厂家名称",
          placeholder : "请输入厂家名称查询",
          key : "cleanerPdName"
        },{
          name : "厂家联系方式",
          placeholder : "请输入厂家联系方式查询",
          key : "cleanerPdPhone"
        },{
          name : "单位名称",
          placeholder : "请输入单位名称查询",
          key : "cleanerUseCompany"
        },{
          name : "单位联系方式",
          placeholder : "请输入单位联系方式查询",
          key : "cleanerUseCompanyPhone" 
        }]
      },
      titles : [{
        name : "序号"
      },{
        name : "devTid"
      },{
        name : "生厂编号"
      },{
        name : "厂家名称"
      },{
        name : "厂家联系方式"
      },{
        name : "生厂日期"
      },{
        name : "安装日期"
      },{
        name : "使用时长"
      },{
        name : "单位名称"
      },{
        name : "单位联系方式"
      },{
        name : "设备状态"
      },{
        name : "地址"
      },{
        name : "设备SIM"
      },{
        name : "操作"
      }],
      list : [],
      listStatus : "正在加载中...",
      tools : {
        edit : "&#xe69e;",
        editLink : "edit",
        editClass : "success hover",
        delete : "&#xe601;",
        deleteClass : "danger hover", 
        log : "&#xe64a;",
        logLink : "log",
        logClass : "primary hover",
        warningLog : "&#xe617;",
        warningLogLink : "warning",
        warningLogClass : "danger hover",
      }
    }
  },
  
  methods:{
    link(address,val){ 
        this.$router.push('/jiexing/devices/'+address+'/'+val.devTid+'/'+val.pid);
    },
    //获取列表
    getList(page=this.$route.query.page,searchKey=this.$route.query.searchKey,searchVal=this.$route.query.searchVal,numSearchVal){
      let self = this;
      page = page||0;
      searchKey = searchKey||"";
      searchVal = searchVal||""; 
      let args = {
        size:window.pageSize,
        page:page,
      }; 
      if(numSearchVal&&numSearchVal.length){
        args.startPowerPdNo = numSearchVal[0]||0;
        args.endPowerPdNo = numSearchVal[1]||0;
      }
      if(searchVal){
        args[searchKey] = searchVal;
      }
      $.ajax({
        url : App.devList, 
        data : args,
        type : "GET", 
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success (r){
          console.log(r,"rrr")  
          self.list = r.content||[];
          // for(var i=0;i<r.content.length;i++){
            // console.log(r.content[i].devTid);
          // } 
          self.listStatus = "没有数据";
          self.page = r;
          self.orderNumber = (window.pageSize*page)||0;
        },
        error (r){
          self.listStatus = r.desc||"获取数据失败";
        },
      });
    },
    //搜索添加 
    useSearch(data,value,numSearchVal){
      //获取列表
      this.getList(0,data.key,value,numSearchVal);
    },
    changePage(num){ 
      //获取列表
      this.getList(num);
    },
    //删除提示
    deleteHint(val){
      var self = this;
      this.modal = {
        show : true,
        type : "error",
        hint : "你要删除么?",
        tools : true,
        submit(){
          self.modal = {
            show : true,
            type : "success",
            hint : "正在删除中..."
          };
          $.ajax({
            url : App.userDelete,
            type : "GET",
            data : {
              uid : val.uid,
              pid : window.pid
            },
            headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
            success(r){
              self.modal.hint = "删除成功";
              self.list[index].class = "fadeOut"; 
              setTimeout(()=>{ 
                self.modal = {};
                self.list.splice(index,1);
              },500);
            },
            error(r){
              self.modal = {
                show : true,
                type : "error",
                hint : "删除失败"
              };
              setTimeout(()=>{
                self.modal={};
              },1000);
            }
          });
          
        },
        cancel(){
          self.modal = {};
        }
      }
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
    }
  },
  created(){
    //获取列表
    this.getList(this.$route.query.page,"","",[this.$route.query.numStart,this.$route.query.numEnd]);
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .info{
    color:#19a9d5;
    &:hover{
      text-decoration: underline;
    }
  }  
</style>
