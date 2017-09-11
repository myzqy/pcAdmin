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
          <span class="active">设备信息</span>
        </router-link>
        <router-link :to="'/jiexing/devices/warning/'+$route.params.id+'/'+$route.params.pid">
          <span>设备警告</span>
        </router-link>
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
                  <td>{{val.action}}</td>
                  <td>{{val.timestamp/1000|getLocalTime}}</td>
                  <td>{{val.action=='devSend'?"设备上报":"控制下发"}}</td>
                  <td>{{val.html}}</td>
                  <td>成功</td>
                  <td></td>
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
import App from '@/js/app';
import {Tool} from '@/js/tool/tool.js';
import path from '@/js/tool/path';
export default {
  name: 'userList',
  data () {
    return {
      location : [{
        link : "/jiexing/devices",
        name : "设备管理",
        path : "/jiexing/devices"
      },{
        name : "设备日志",
        path : "/jiexing/devices"
      }],
      modal : {},
      page : {},
      date : {
        startValue : 1,
        endValue : 2
      },
      orderNumber : 0,
      list : [],
      titles : [{
        name : "序号",
        styleObject : {
          width : "60px"
        }
      },{
      name : "控制命令"
      },{
      name : "控制时间"
      },{
      name : "控制类型"
      },{
      name : "控制内容"
      },{
      name : "结果"
      },{
      name : "失败原因"
      }],
      listStatus : "正在加载中...",
      time : ""
        
    }
  },
  filters : {
    getLocalTime(nS) {     
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,':00');     
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
    //获取列表
    getLog(page=this.$route.query.page){
      page = page||0;
      var self = this; 
      var args = {
        devTid : this.$route.params.id,
        // devTid : "c7716d465ae74ea392af8aebddf342e7", 
        pid : this.$route.params.pid,
        // pid : "01870841347",
        start : self.time.before, 
        end : self.time.after,
        action : "devSend",
        size:window.pageSize,
        page:page
      } 
      $.ajax({
        url : App.deviceLog,
        data : args, 
        type : "GET",  
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success (r){
          //检查信息
          self.checkInfo(r.content);
          self.listStatus = "没有数据";
          self.page = r;
          self.orderNumber = (window.pageSize*page)||0;
          console.log(r,"rrr",r.content.length);
        },
        error (r){
          console.log(r,"errorrrr");
        },
      });
    },
    //检查信息
    checkInfo (list=[]){
      // list = [
      //     {
      //       "objectId": "59281353e4b06cce66e14098",
      //       "finger": "40200a16-c7cf-4d4e-b90e-54b75ac98eef",
      //       "sessionId": "bc301882-871e-47ad-8e34-3d1f8f3fc43f",
      //       "action": "devSend",
      //       "devTid": "c7716d465ae74ea392af8aebddf342e7",
      //       "ctrlKey": "a3cd91d7c750499984bc878402dd2d24",
      //       "msgId": 0,
      //       "timestamp": 1495798611043,
      //       "pid": "01870841347",
      //       "mid": "vDL8AIiePDVE",
      //       "cid": null,
      //       "rawRequest": "SBIJAAIEAQABJiYAAgIAAwG/",
      //       "rawResult": "SAkKAAAAAABb",
      //       "request": {
      //         "frameNumber": 0,
      //         "payload": "AgQBAAEmJgAC",
      //         "frameType": 9,
      //         "raw": {
      //           "cmdId": 2,
      //           "cmdTag": "reportDev",
      //           "data": {
      //             "mode": 1,
      //             "current": 1,
      //             "temp": 38,
      //             "power_Sw": 2,
      //             "currentPower": 1,
      //             "rh": 38,
      //             "alarm": 2,
      //             "airquality": 0,
      //             "power_Set": 3,
      //             "voltage": 4
      //           }
      //         }
      //       },
      //       "result": null
      //     }
      //   ]
      for(let i=0;i<list.length;i++){
        if(list[i].request.params&&list[i].request.params.data){
          let html = "";
          let data = list[i].request.params.data; 
          // list[i].timestamp = getTimeFormat(list[i].timestamp/1000);
          switch(data.cmdId){
            case 1:
              html+="设备查询、";
              break;
            case 2:
              html+="设备上报、";
              break;
            case 3:
            html+="设定功率开关、";
            break;
            case 4:
            html+="设定功率、";
            break;
            case 5:
            html+="设置模式、";
            break;
            case 6:
            html+="推送设置、";
            break;
          }
          if(data.mode==1){
            html+="自动模式、";
          }else if(data.mode==2){
            html+="手动模式、";
          }
          if(data.current>=0&&data.current<=20){
            html+="电流状态"+data.current+"、";
          }
          if(data.temp>=0&&data.temp<=150){
            html+=+data.temp+"℃、";
          }
          if(data.power_Sw==1){
            html+="功率开、";
          }else if(data.power_Sw==2){
            html+="功率关、";
          }
          if(data.currentPower>=0&&data.currentPower<=300){
            html+="瞬时功率"+data.currentPower+"、";
          }
          if(data.rh>=10&&data.rh<=90){
            html+="温度"+data.rh+"、";
          }
          if(data.airquality==1){
            html+="空气优、";
          }else if(data.airquality==2){
            html+="空气良、";
          }else if(data.airquality==3){
            html+="空气中、";
          }else if(data.airquality==4){
            html+="空气差、";
          }
          if(data.power_Set>=0&&data.power_Set<=300){
            html+="功率"+data.currentPower+"、";
          }
          if(data.voltage>=0&&data.voltage<=20){
            html+="电压"+data.voltage+"、";
          }
          if(html){
            html = html.slice(0,html.length-1)
          }
          list[i].html = html;
        }
        
      }
      this.list = list;
    },
    changePage(num){ 
      //获取用户信息
      this.getLog(num);
    },
  },
  created(){
    var self = this;
    window.Tool.getTimeArea({
      status : "month",
      callback(e){
        console.log(1)
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
    this.getLog();
    this.useDatetime();
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
  .date{
    float: right;
  }
  .xdsoft_timepicker.active{
    display: none !important;
  }
</style>
