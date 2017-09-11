<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--搜索添加--> 
      <div class="search-add clearfix">
        <router-link :to="'/jiexing/devices/info/'+$route.params.id+'/'+$route.params.pid">
          <span class="active">设备状态</span>
        </router-link>
        <router-link v-if="userTypeName!='生产厂家'" :to="'/jiexing/devices/log/'+$route.params.id+'/'+$route.params.pid">
          <span>设备信息</span>
        </router-link>
        <router-link v-if="userTypeName!='生产厂家'" :to="'/jiexing/devices/warning/'+$route.params.id+'/'+$route.params.pid">
          <span>设备警告</span>
        </router-link>
        <!--<search :search="search" v-on:message="useSearch"></search>-->
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
                  <!--<td>{{key+1}}</td>-->
                  <td>{{val.name}}</td> 
                  <td>{{val.type}}</td> 
                  <td>{{val.unit}}</td> 
                  <td v-html="val.val"></td> 
                  <td>{{val.msg}}</td> 
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
        link : "/jiexing/devices",
        name : "设备管理",
        path : "/jiexing/devices"
      },{
        name : "设备状态",
        path : "/jiexing/devices"
      }],
      userTypeName : userInfo.userTypeName,
      modal : {},
      page : {},
      orderNumber : 0,
      titles : [
      //   {
      //   name : "序号",
      //   styleObject : {
      //     width : "60px" 
      //   }
      // },
      {
        name : "参数名称"
      },{
        name : "参数类型"
      },{
        name : "参数单位"
      },{
        name : "状态值"
      },{
        name : "描述"
      }],
      list : []
    }
  },
  methods:{
    //获取列表
    getLog(){
      var args = {
        devTid : this.$route.params.id,
        // devTid : "c7716d465ae74ea392af8aebddf342e7", 
        pid : this.$route.params.pid,
        // pid : "01870841347",
      } 
      let self = this;
      $.ajax({
        url : App.devStatus,
        data : args,
        type : "GET", 
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success (r){
          console.log(r,"rrr");
          //获取值
          self.getVal(r);
        },
        error (r){
          console.log(r,"errorrrr");
        },
      });
    },
    //获取值
    getVal(r){
      if(r&&r[0]){
        let data = r[0].status,
            list = [];
        for(let i in data){
            let type = "NUMBER(1)";
            let unit;
            let val;
            let msg;
            if(i=="currentPower"||i=="power_Set"){
              type = "NUMBER(2)"
            }
            if(i=="mode"){
              val = `<ul class="val-list">
                <li>1 自动</li>
                <li>2 手动</li>
              </ul>`;
              msg = "模式选择"; 
            }else if(i=="current"){
              val = `[0<span>0</span>,20<span>20mA</span>]`;
              msg = "电流状态"; 
            }else if(i=="temp"){
              val = `[0<span>0</span>,150<span>150</span>]`;
              msg = "温度"; 
            }else if(i=="power_Sw"){
              val = `<ul class="val-list">
                <li>1 开</li>
                <li>2 关</li>
              </ul>`;
              msg = "功率开关"; 
            }else if(i=="currentPower"){
              val = `[0<span>0</span>,300<span>300</span>]`;
              msg = "瞬时功率"; 
            }else if(i=="rh"){
              val = `[10<span>10%</span>,90<span>90%</span>]`;
              msg = "湿度"; 
            }else if(i=="alarm"){
              val = `<ul class="val-list">
                <li>0 无报警</li>
                <li>1 短路</li>
                <li>2 开路</li>
                <li>3 超温</li>
                <li>4 打火</li>
              </ul>`;
              msg = "报警"; 
            }else if(i=="airquality"){
              val = `<ul class="val-list">
                <li>0 优</li>
                <li>1 良</li>
                <li>2 中</li>
                <li>3 差</li>
              </ul>`;
              msg = "VOC";
            }else if(i=="power_Set"){
              val = `[0<span>0</span>,300<span>300W</span>]`;
              msg = "功率设置"; 
            }else if(i=="voltage"){
              val = `[0<span>0</span>,20<span>20KV</span>]`;
              msg = "电压状态"; 
            }
            val = data[i].currentValue;
            list.push({
              name : i,
              unit : unit,
              type : type,
              val : val,
              msg : msg
            });
        }
        this.list = list;
      }
    },
    changePage(num){ 
      //获取用户信息
      this.getLog(num);
    },
  },
  created(){
    //获取列表
    this.getLog();
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
  .val-list{
    
  }
  
</style>
