
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
            title : "devTid",
            value : "",
            hint : "",
            warning : false, 
            success : false,
            placeholder : "请输入设备devTid",
            blur(val){
              //判断是否数字
              return Check.haveValue(val,"devTid不能为空");
            }
        },
        { 
            title : "生厂编号",
            value : "",
            hint : "",
            warning : false, 
            success : false,
            placeholder : "请输入生厂编号",
            blur(val){
              if(!val.value){
                val.hint = "";
                val.warning = false;
                val.success = true;
                return true;
              }
              //判断是否是手机号
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
      fileName : "",
      fileContent : "",
      devTid : "",
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
  },
  methods : {
    del (){
      this.fileName = "";
      this.fileContent = "";
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
        self.list[4].value = $(this).val();
      });
      $('.cleanerInstallDate').on("change",function(){
        self.list[5].value = $(this).val();
      });
    },
    focus(val){
      val.warning = false;
      val.hint = "";
    },
    cancel(){
      this.$router.push("/jiexing/devices");
    },
    oppop(){
      let args = {
        pid : window.pid,
        devTids : this.fileContent||[]
      }
      $.ajax({
        url : App.deviceInfo,
        data : JSON.stringify(args),
        type : "POST",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success(r){
          console.log(r,"rrr")
        },
        error(r){
          console.log(r,"rrrerr")
        },
      });
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
        devTid:this.list[0].value||Date.parse(new Date()),
        powerPdNo : this.list[1].value,
        cleanerPdName : this.list[2].value,
        cleanerPdPhone : this.list[3].value, 
        powerPdDate : this.list[4].value,
        cleanerInstallDate : this.list[5].value,
        cleanerUseTime : this.list[6].value,
        cleanerUseCompany : this.list[7].value,
        cleanerUseCompanyPhone : this.list[8].value,
        cleanerSIMPhone : this.list[9].value,
      };
      // return;
      //保存
      Commit.save({
        self : this
      });
      this.disabledCommit = true;
      $.ajax({
        url : App.devInfo,
        data : JSON.stringify(args),
        type : "POST",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success(r){
          //保存成功
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
          self.disabledCommit = false;
          //保存失败 
          Commit.error({
            self : self,
            callback(){
              self.submitValue = "保存";
            }
          });
        },
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
/*a  upload */
.a-upload {
    padding: 4px 10px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
}

.a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}

.a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
}  


.file {
    display: inline-block;
    position: relative;
    top:10px;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    &.cancel{
      background: #fff;
      color: #666;
      &:hover{
        background: #f0f0f0;
        color: #333;
      }
    }
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
</style>
