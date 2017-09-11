<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--添加设备信息-->
      <table class="input-form mt20">
        <tbody>
          <tr v-for="val in list" :class="val.last&&'line'">
              <th>{{val.title}}：</th>
              <td>
                  <input class="input input-long" :class="[val.warning&&'danger',val.class]" v-model="val.value" @blur="val.blur&&val.blur(val)" :placeholder="val.placeholder" :value="val.value"/>
                  <div class="hint" v-if="val.hint">{{val.hint}}</div>
              </td>
          </tr> 
          <tr>
              <th></th>
              <td colspan="2">
                  <div class="mt30"> 
                      <input @click="commit" type="button" :disabled="submitDisabled" class="btn mr10" :class="submitClass" :value="submitValue">
                      <input @click="cancel" type="button" class="btn" :class="cancelClass" :value="cancelValue">
                  </div>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import App from '@/js/app';
import {Check,Commit} from '@/js/tool/tool.js';
import location from '@/components/tool/location';
export default { 
  name: 'deviceNew',
  data () {
    return {
      location : [{
        link : "/jiexing/devices",
        name : "设备管理",
        path : "/jiexing/devices"
      },{
        name : "设备信息录入",
        path : "/jiexing/new"
      }],
      list : [
        {
            title : "生厂编号",
            hint : "",
            value : "",
            warning : false, 
            success : true,
            placeholder : "请输入生厂编号",
            blur(val){
              if(!val.value){
                val.hint = "";
                val.warning = false;
                val.success = true;
                return true;
              }
              //判断是否数字
              return Check.ifNumber(val,["生厂编号不能为空","生厂编号的格式应该正整数"]);
            }
        },
        {
            title : "厂家名称",
            value : "",
            placeholder : "请输入厂家名称",
        },
        {
            title : "厂家联系方式",
            value : "",
            hint : "",
            placeholder : "请输入厂家联系方式",
            warning : false, 
            success : true,
            blur(val){
              if(!val.value){
                val.hint = "";
                val.warning = false;
                val.success = true;
                return true;
              }
              //判断是否是手机号
              return Check.ifPhone(val);
            }
        },
        {
            class : "powerPdDate",
            title : "生厂日期",
            value : "",
            placeholder : "请输入生厂日期",
        },
        {
            class : "cleanerInstallDate",
            title : "安装日期",
            value : "",
            placeholder : "请输入安装日期",
        },
        {
            title : "使用时长",
            value : "",
            placeholder : "请输入厂家使用时长",
        },
        {
            title : "单位名称",
            value : "",
            placeholder : "请输入使用单位",
        },
        {
            title : "单位联系方式",
            value : "",
            hint : "",
            placeholder : "请输入单位联系方式",
            warning : false, 
            success : true,
            blur(val){
              if(!val.value){
                val.hint = "";
                val.warning = false;
                val.success = true;
                return true;
              }
              //判断是否是手机号
              return Check.ifPhone(val);
            }
        },
        {
            title : "设备SIM",
            value : "",
            placeholder : "请输入设备SIM",
            last : true,
        }
      ], 
      submitClass : "btn-primary",
      submitValue : "保存",
      submitDisabled : false,
      cancelClass : "btn-default",
      cancelValue : "取消" 
    }
  },
  created(){
    //时间时间组件
    this.useDatetime();
    //获取列表
    this.getDetail();
  },
  methods : {
    //获取列表
    getDetail(){
      let self = this;
      let args = {devTid:this.$route.params.id,pid:window.pid};
      $.ajax({
        url : App.devInfo,
        data : args,
        type : "GET", 
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success (r){
          self.list[0].value = r.powerPdNo,
          self.list[1].value = r.cleanerPdName;
          self.list[2].value = r.cleanerPdPhone,
          self.list[3].value = r.powerPdDate;
          self.list[4].value = r.cleanerInstallDate,
          self.list[5].value = r.cleanerUseTime,
          self.list[6].value = r.cleanerUseCompany,
          self.list[7].value = r.cleanerUseCompanyPhone,
          self.list[8].value = r.cleanerSIMPhone;
        },
        error (r){
          self.listStatus = r.desc||"获取数据失败";
        }, 

        // devTid:this.list[0].value||Date.parse(new Date()),
        // powerPdDate : this.list[4].value,
        // cleanerInstallDate : this.list[5].value,
        // cleanerUseTime : this.list[6].value,
        // cleanerUseCompany : this.list[7].value,
        // cleanerUseCompanyPhone : this.list[8].value,
        // cleanerSIMPhone : this.list[9].value,
      });
    },
    //时间时间组件
    useDatetime(){
      var self = this;
      setTimeout(()=>{   
        $('.powerPdDate').datetimepicker({ 
            lang:'ch',
            format:"Y-m-d H:00",
            showSecond : true,
        });  
        $('.cleanerInstallDate').datetimepicker({ 
            lang:'ch',
            format:"Y-m-d H:00",
            showSecond : true,
        });  
        //时间事件
        self.dataTimeEvent();
      },500);
    },
    //时间事件
    dataTimeEvent(){
      var self = this;
      $('.powerPdDate').on("change",function(){
        self.list[3].value = $(this).val();
      });
      $('.cleanerInstallDate').on("change",function(){
        self.list[4].value = $(this).val();
      });
    },
    focus(val){
      val.warning = false;
      val.hint = "";
    },
    cancel(){
      this.$router.push("/jiexing/devices");
    },
    commit(){
      if(this.disabledCommit){
        return;
      }
      for(let i=0;i<this.list.length;i++){
        if(this.list[i].success===false){
          this.list[i].blur(this.list[i]);
          return;
        }
      }
      var self = this;
      let args = {
        pid : window.pid,
        devTid:this.$route.params.id,
        powerPdNo : this.list[0].value,
        cleanerPdName : this.list[1].value,
        cleanerPdPhone : this.list[2].value, 
        powerPdDate : this.list[3].value,
        cleanerInstallDate : this.list[4].value,
        cleanerUseTime : this.list[5].value,
        cleanerUseCompany : this.list[6].value,
        cleanerUseCompanyPhone : this.list[7].value,
        cleanerSIMPhone : this.list[8].value,
      };
      // return;
      //保存
      Commit.save({
        self : this
      });
      $.ajax({
        url : App.devInfo,
        data : JSON.stringify(args),
        type : "PUT",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success(r){
          //保存失败
          Commit.success({
            self : self,
            callback(){
              self.submitValue = "保存成功";
            }
          });
          setTimeout(()=>{
            self.$router.push("/jiexing/devices");
          },1000);
        },
        error(r){
          //保存失败
          Commit.error({
            self : self,
            callback(){
              self.submitValue = "保存";
            }
          });
        },
      });


      // let args = {
      //   devTiv : Date.parse(new Date()),
      //   powerPdDate : this.list[0].value,
      //   powerPdNo : this.list[1].value,
      //   cleanerPdName : this.list[2].value,
      //   cleanerPdPhone : this.list[3].value,
      //   cleanerInstallDate : this.list[4].value,
      //   cleanerUseTime : this.list[5].value,
      //   cleanerUseCompany : this.list[6].value,
      //   cleanerUseCompanyPhone : this.list[7].value,
      //   cleanerSIMPhone : this.list[8].value,
      // };
      // self.disabledCommit = true;
      // $.ajax({
      //   url : App.devInfo,
      //   data : JSON.stringify(args),
      //   type : "POST",
      //   headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
      //   success(r){
      //     console.log(r,"success rrrr")
      //   },
      //   error(r){
      //     self.disabledCommit = false;
      //     //保存失败
      //     Commit.error({
      //       self : self,
      //       callback(){
      //         self.submitValue = "保存";
      //       }
      //     });
      //     console.log(r,"rrrr")
      //   },
      // });
    }
  },
  components : {
    location,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>