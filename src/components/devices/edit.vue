<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--添加用户-->
      <table class="input-form mt20">
        <tbody>
          <tr v-for="val in list" :class="val.last&&'line'">
              <th>{{val.title}}：</th>
              <td>
                  <input class="input input-long" :class="val.warning&&'danger'" v-model="val.value" :placeholder="val.placeholder" :value="val.value"/>
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
import $ from 'n-zepto';
import App from '@/js/app';
import commitAjax from '@/js/commitAjax';
import {Check,Commit} from '@/js/tool/tool.js';
import location from '@/components/tool/location';
export default {
  name: 'userNew',
  data () {
    return {
      location : [{
        link : "/devices",
        name : "设备管理",
        path : "/devices"
      },{
        name : "设备信息录入",
        path : "/new"
      }],
      list : [
        {
            title : "生厂日期",
            value : "",
            placeholder : "请输入生厂日期",
        },
        {
            title : "生厂编号",
            value : "",
            placeholder : "请输入生厂编号",
        },
        {
            title : "厂家名称",
            value : "",
            hint : "",
            placeholder : "请输入厂家名称",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "厂家联系方式",
            value : "",
            hint : "",
            placeholder : "请输入厂家联系方式",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "安装日期",
            value : "",
            hint : "",
            placeholder : "请输入安装日期",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "使用时长",
            value : "",
            hint : "",
            placeholder : "请输入厂家使用时长",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "使用单位",
            value : "",
            hint : "",
            placeholder : "请输入使用单位",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "单位联系方式",
            value : "",
            hint : "",
            placeholder : "请输入单位联系方式",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "设备SIM",
            value : "",
            hint : "",
            placeholder : "请输入设备SIM",
            warning : false, 
            success : false,
            last : true,
            blur(val){
              
            }
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
    //获取列表
    this.getDetail();
  },
  methods : {
    //获取列表
    getDetail(){
      let self = this;
      let args = {devTid:this.$route.params.id};
      commitAjax.AJAX({
        url : App.devInfo, 
        data : args,
        type : "GET", 
        success (r){
          console.log(r,"rrrr");
        },
        error (r){
          self.listStatus = r.desc||"获取数据失败";
        }, 
        headers : {
          "Accept": "application/json",
          "contentType": "application/json",
          Authorization: "Bearer "+userToken.access_token
        }
      });
    },
    focus(val){
      val.warning = false;
      val.hint = "";
    },
    cancel(){
      this.$router.push("/devices");
    },
    commit(){
      //保存
      Commit.save({
        self : this
      });
      var self = this;
      let args = {
        powerPdDate : this.list[0].value,
        powerPdNo : this.list[1].value,
        cleanerPdName : this.list[2].value,
        cleanerPdPhone : this.list[3].value,
        cleanerInstallDate : this.list[4].value,
        cleanerUseTime : this.list[5].value,
        cleanerUseCompany : this.list[6].value,
        cleanerUseCompanyPhone : this.list[7].value,
        cleanerSIMPhne : this.list[8].value,
        // {"phoneNumber":"13276810715","verifyCode":"653141","token":"eb4a3266-0300-424e-a506-c17ca231beac","expireTime":1493537127385}
      }; 
      commitAjax.AJAX({
        url : App.devInfo,
        data : args,
        type : "POST",
        success(r){
          console.log(r,"success rrrr")
        },
        error(r){
          //保存失败
          Commit.error({
            self : self,
            callback(){
              self.submitValue = "保存";
            }
          });
          console.log(r,"rrrr")
        },
        headers : {
          Authorization: "Bearer "+userToken.access_token,
          "Accept": "application/json",
          "contentType": "application/json"
        }
      });
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
