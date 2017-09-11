import '@/css/public/main.less';//公用样式
import '@/js/plugin/jquery.js';
import '@/js/plugin/jquery.datetimepicker.full.min.js';
import '@/js/plugin/jquery.datetimepicker.less';

class Point {
  constructor() {
      this.init();
  }
  init(){
    //监听dom渲染
    let $tiem = setInterval(()=>{
      if($("#main").length){
        clearInterval($tiem); 
        //窗口改变监听 
        this.resize();
      }
    },10);
  }
  resize(){
    $(window).bind("resize",function(){
      var H = $(window).height(),
          $header = $("#header").height();
      $("#content").css({
        minHeight : H-$header-30
      });
    }).trigger("resize");
  }
}
new Point();

//获取整十
window.Tool = {
  tenNum (val) {
      val += "";
      if (val.length === 1) {
          return 0 + val;
      } else {
          return val;
      }
  }
}


 //获取时间
 Tool.getTimeArea = function(data){  
      data.callback = data.callback||function(){}; 
      var inFunc = {
          init : function(){
              var date = new Date; 
              //过滤
              inFunc.filter(date); 
              // var date = inFunc.getTime(); 
          },
          //过滤
          filter : function(date){
              if(data.status=="lastWeek"){
                  //最后一周
                  inFunc.getLastWeek(date);
              }
              if(data.status=="week"){
                  //当前周
                  inFunc.getNowWeek(date);
              }
              if(data.status=="month"){
                  //获取一个月
                  inFunc.getMonth(date);
              }
              //判断时间区域
              if(data.status=="ifArea"){
                  //获取时间区域 
                  inFunc.getTimeAreaInfo(date);
              }
          },
          //获取时间
          getTime : function(){
              var date = new Date;
              date.setDate(date.getDate() - beforeDay); 
              var week = date.getDay();
              return date;  
          },
          //最后一周
          getLastWeek : function(date){
              var day = date.getDate();
              var week = date.getDay();
              //上周一
              var beforeDate = new Date;
              beforeDate.setDate(day-week-7+1);
              //上周日
              var afterDate = new Date;
              afterDate.setDate(day-week);
              //回调
              data.callback({
                  before : inFunc.getTimeForget(beforeDate),//获取日期格式
                  after : inFunc.getTimeForget(afterDate),//获取日期格式
              });
          },
          //获取本周
          getNowWeek : function(date){
              var day = date.getDate();
              var week = date.getDay();
              //本周一
              var beforeDate = new Date;
              beforeDate.setDate(day-week+1);
              //回调
              data.callback({
                  before : inFunc.getTimeForget(beforeDate),//获取日期格式
                  after : inFunc.getTimeForget(date),//获取日期格式
              });
          },
          //获取一个月
          getMonth : function(date){
              var day = date.getDate();
              //本周一
              var beforeDate = new Date;
              beforeDate.setDate(day-90);
              //回调
              data.callback({
                  before : inFunc.getTimeForget(beforeDate),//获取日期格式
                  after : inFunc.getTimeForget(date),//获取日期格式
              });
          },
          //判断时间区域
          getTimeAreaInfo : function(date){
              var day = date.getDate();
              if(!data.start){
                  var beforeDate = new Date(); 
                  beforeDate.setDate(day-30);
                  data.start = inFunc.getTimeForget(beforeDate);//获取日期格式
              }
              if(!data.end){
                  data.end = inFunc.getTimeForget(date);//获取日期格式
              } 
              //判断时间 
              inFunc.ifTime();
          },
          ifTime : function(){
              var startTime = new Date(data.start).getTime();
              var endTime = new Date(data.end).getTime();
              var nowTime = new Date(data.val).getTime();
              console.log(endTime,startTime,"startTimestartTimestartTime")
              if(nowTime<startTime){
                  data.startError();
                  return false;
              }
              if(nowTime>endTime){
                  data.endError();
                  return false;
              }
              if(endTime<startTime||startTime>endTime){
                  data.error();
                  return false;
              } 
              
              data.callback&&data.callback();
          },
          //获取日期格式
          getTimeForget : function(date){
              return date.getFullYear()+"-"+Tool.tenNum((date.getMonth()+1))+"-"+Tool.tenNum(date.getDate());
          }
      };
      //初始化
      inFunc.init();
  };
window.getTimeFormat = (time)=>{
  var newDate = new Date();
  newDate.setTime(time * 1000);
  var newDateString = newDate+"";
  return newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDateString.slice(8,10)
};