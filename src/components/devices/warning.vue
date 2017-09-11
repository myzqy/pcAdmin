<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--搜索添加--> 
      <div class="search-add clearfix">
        <router-link :to="'/jiexing/devices/info/'+$route.params.id+'/'+$route.params.pid">
          <span>设备状态</span>
        </router-link>
        <router-link :to="'/jiexing/devices/log/'+$route.params.id+'/'+$route.params.pid">
          <span>设备信息</span>
        </router-link>
        <router-link :to="'/jiexing/devices/warning/'+$route.params.id+'/'+$route.params.pid">
          <span class="active">设备警告</span>
        </router-link>
        <!--<search :search="search" v-on:message="useSearch"></search>-->
      </div>
      <div class="date">
        <input class="input" id="start"/> 
        -
        <input class="input" id="end"/> 
      </div>
      <div class="table-box">
        设备编号：{{$route.params.id}}
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
                  <td>{{key+orderNumber+1}}</td>
                  <td>{{val.reportTime}}</td> 
                  <td>{{val.isOriginal?"成功":"失败"}}</td> 
                  <td>{{val.content}}</td> 
              </tr>
              <tr v-if="!list.length">
                <td :colspan="titles.length">{{listStatus}}</td>
              </tr>
          </tbody>
        </table> 
      </div>
    </div>
    <page :page="page" v-on:message="changePage"></page>
    <modal :modal="modal"></modal>
  </div>
</template>

<script>
import Vue from 'vue';
import location from '@/components/tool/location';
import search from '@/components/tool/search';
import page from '@/components/tool/page';
import modal from '@/components/tool/modal';
import App from '@/js/app';
import {Tool} from '@/js/tool/tool.js';
import path from '@/js/tool/path';
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
        link : "/jiexing/devices",
        name : "设备管理",
        path : "/jiexing/devices"
      },{
        name : "设备警告日志",
        path : "/jiexing/devices/warning"
      }],
      modal : {},
      page : {},
      orderNumber : 0,
      time : "",
      titles : [{
        name : "序号"
      },{
        name : "告警时间"
      },{
        name : "处理结果"
      },{
        name : "告警内容"
      }],
      listStatus : "正在加载中...",
      //告警时间	处理结果	告警内容
      list : [],
      
    }
  },
  methods:{
    //时间时间组件
    useDatetime(){
      var self = this;
      setTimeout(()=>{   
        $('#start').datetimepicker({ 
            lang:'ch',
            format:"Y-m-d",
            showSecond : true, 
        });  
        $('#end').datetimepicker({ 
            lang:'ch',
            format:"Y-m-d",
            showSecond : true,
        });  
        $('#start').val(self.time.before);
        $('#end').val(self.time.after);
        //时间事件
        self.dataTimeEvent();
        $(".xdsoft_timepicker").remove();
      },500);
    },
    //时间事件
    dataTimeEvent(){
      var self = this;
      $('#start').on("change",function(){
        path.setPath({
          beforeTime : $(this).val(),
        });
        self.time.before = $(this).val();
        //获取列表
        self.getLog();
      });
      $('#end').on("change",function(){
        path.setPath({
          afterTime : $(this).val(),
        });
        self.time.after = $(this).val();
        //获取列表
        self.getLog();
      });
    },
    //获取日志
    getLog(page=this.$route.query.page){
      let self = this;
      page = page||0;
      var args = {
        devTid : this.$route.params.id,
        // devTid : "c7716d465ae74ea392af8aebddf342e7", 
        pid : this.$route.params.pid,
        // pid : "01870841347",
        start : self.time.before,
        end : self.time.after,
        size:window.pageSize,
        page:page
      }
      
      $.ajax({
        url : App.deviceWarnings,
        data : args,
        type : "GET", 
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success (r){ 
          console.log(r.content,r.content.length)
          for(let i=0;i<r.content.length;i++){
            r.content[i].reportTime = getTimeFormat(r.content[i].reportTime/1000);
          } 
          self.list = r.content;
          self.listStatus = "没有数据";
          self.page = r;
          self.orderNumber = (window.pageSize*page)||0;
          console.log(r,"rrr");
        },
        error (r){
          console.log(r,"errorrrr");
        },
      });
    },
    changePage(num){ 
      //获取日志
      this.getLog(num);
    },
  },
  created(){  
    var self = this;
    window.Tool.getTimeArea({
      status : "month",
      callback(e){
        self.time = e;
      }
    });
    if(this.$route.query.beforeTime){
      self.time.before = this.$route.query.beforeTime;
    }
    if(this.$route.query.beforeTime){
      self.time.after = this.$route.query.afterTime;
    }
    //获取列表
    this.useDatetime();
    this.getLog();
    //window.history.pushState("","","?devices?a=2124");
  },
  
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .search-add{
    padding:0 10px;
    margin:10px 0;
    border-bottom:1px solid #ddd;
    line-height: 40px;
    span{
      display: inline-block;
      padding: 0 10px;
      color: #666;
      &:hover{
        background-color: #eee;
      }
    }
    .active{
        color: #339ef3;
        border-bottom:2px solid #448aff;
    }
  }  
  .date{
    float: right;
  }
  .xdsoft_timepicker.active{
    display: none !important;
  }
</style>