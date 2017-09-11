<template>
  <div>
    <location :list="location"></location>
    <modal :modal="modal"></modal>
    <div class="container">
      <!--基础信息-->
      <table class="input-form mt20" v-show="step=='step1'">
        <tbody>
          <tr v-for="val in list">
              <th>{{val.title}}：</th>
              <td>
                  <input class="input input-long" :class="val.warning&&'danger'" v-model="val.value" @keyup.enter="commit" :placeholder="val.placeholder" @blur="val.blur(val)" @focus="focus(val)" :value="val.value"/>
                  <div class="hint" v-if="val.hint">{{val.hint}}</div>
              </td>
          </tr>
          <tr>
            <th>{{userType.title}}</th>
            <td> 
              <select v-model="userType.value">
                <option v-for="val in userType.list"  @change="userType.change(1,2)" :value="val.value">{{val.text}}</option>
              </select>
            </td>
          </tr>
          <tr>
              <th></th>
              <td colspan="2">
                  <div class="mt30">
                      <input @click="next" type="button" class="btn mr10 btn-primary" value="下一步">
                      <input @click="cancel" type="button" class="btn" :class="cancelClass" :value="cancelValue">
                  </div>
              </td>
          </tr>
        </tbody>
      </table>
      <!--手机信息-->
      <table class="input-form mt20" v-show="step=='step2'">
        <tbody>
          <tr>
              <th>{{phone.title}}：</th>
              <td>
                  <input class="input input-long" :class="phone.warning&&'danger'" v-model="phone.value" @keyup.enter="commit" :placeholder="phone.placeholder" @blur="phone.blur(phone)" @focus="focus(phone)" :value="phone.value"/>
                  <div class="hint" v-if="phone.hint">{{phone.hint}}</div>
              </td>
          </tr>
          <tr>
            <th>{{photoCode.title}}</th>
            <td>
              <label class="label">
                <input class="input" :class="photoCode.warning&&'danger'" :placeholder="photoCode.placeholder" @focus="focus(photoCode)" @blur="photoCode.checkPhotoCode(photoCode)" @keyup.enter="commit" :value="photoCode.value" v-model="photoCode.value">
              </label>
              <img class="photoCodeImg" :src="photoCode.codeUrl+photoCode.rid" @click="getPhotoCode(photoCode.codeUrl)">
              <span @click="getPhotoCode(photoCode.codeUrl)">换一张</span>
              <div class="hint" v-if="photoCode.hint">{{photoCode.hint}}</div>
            </td>
          </tr>
          <tr class="line">
            <th>{{getCode.title}}</th>
            <td>
              <label class="label">
                <input class="input" :class="getCode.warning&&'danger'" :placeholder="getCode.placeholder" @blur="checkVerifyCode(getCode)" @focus="focus(getCode)" @keyup.enter="commit" :value="getCode.value" v-model="getCode.value">
              </label>
              <input type="button" class="btn" :class="getCode.disabled?'btn-default':'btn-primary'" @click="getPhoneCode(getCode)" :value="getCode.btn+getCode.loadTime">
              <div class="hint" v-if="getCode.hint">{{getCode.hint}}</div>
            </td>
          </tr>
          <tr>
              <th></th>
              <td colspan="2">
                  <div class="mt30">
                      <input @click="commit" type="button" :disabled="submitDisabled" class="btn mr10" :class="submitClass" :value="submitValue">
                      <input @click="prev" type="button" class="btn btn-default" value="返回">
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
// import commitAjax from '@/js/commitAjax';
import {Check,Commit} from '@/js/tool/tool.js';
import location from '@/components/tool/location';
import modal from '@/components/tool/modal';
export default {
  name: 'userNew',
  components : {
    location,
    modal
  },
  data () {
    return {
      location : [{
        link : "/jiexing/user",
        name : "用户管理",
        path : "/jiexing/user"
      },{
        name : "用户创建",
        path : "/jiexing/new"
      }],
      modal : {},
      step : "step1",
      list : [
        {
            title : "用户名称",
            value : "",
            hint : "",
            placeholder : "请输入用户名称",
            warning : false, 
            success : false,
            blur(val){
              //判断是否有值
              Check.haveValue(val);
            }
        },
        {
            title : "初始密码",
            value : "",
            hint : "",
            placeholder : "请输入初始密码",
            warning : false,
            success : false,
            blur(val){
              //判断是否为密码格式
              Check.ifPassword(val,["初始密码不能为空"]);
            }
        },
        {
            title : "邮箱",
            value : "",
            hint : "",
            placeholder : "请输入邮箱",
            warning : false, 
            success : false,
            last : true,
            blur(val){
              //判断是否是邮箱号
              Check.ifEmail(val);
            }
        }
      ],
      userType : {
        value : "1",
        title : "用户类型",
        list : [{
          text : "超管用户",
          value : "1"
        },{
          text : "厂家用户",
          value : "2"
        },{
          text : "环保局用户",
          value : "3"
        }],
      },
      phone : {
        title : "手机",
        value : "",
        hint : "",
        placeholder : "请输入手机号码",
        warning : false, 
        success : false,
        blur(val){
          //判断是否是手机号
          Check.ifPhone(val);
        }
      },
      getCode : {
        title : "获取手机验证码",
        loadTime : "",
        value : "",
        hint : "",
        placeholder : "请输入手机验证码",
        warning : false, 
        success : false,
        btn : "获取验证码",
        disabled : false,
        token : "",
        blur(val){
          //判断是否为6位验证码
          Check.ifCode(val);
        }
      },
      photoCode : { 
        title : "图形验证码",
        warning : false,
        success : false,
        value : "",
        hint : "", 
        rid : "123456782314534562",
        codeUrl : App.getImgCaptcha+"?rid=",
        // codeUrl : "http://test-uaa-openapi.hekr.me/images/getImgCaptcha?rid=",
        placeholder : "请输入图文验证码",
        //验证图形验证码
        checkPhotoCode(val){
          
          val.warning = false;
          val.hint = "";
          val.success = true; 
          if(val.value&&val.value.length==4){
            var self = this;
            let args = {"rid":val.rid,"code":val.value};
            $.ajax({
              url : App.checkCaptcha,
              data : args,
              type : "GET",
              success(r){
                // self.getCode.loadTime = 
                val.captchaToken = r.captchaToken;
              },
              error(r){
                val.warning = true;
                val.hint = "图形码错误";
                val.success = false; 
              }
            });
          }else{
            val.warning = true;
            val.hint = "格式错误";
            val.success = false;
          }
          
        },
      },
      submitClass : "btn-primary",
      submitValue : "保存",
      submitDisabled : false,
      cancelClass : "btn-default",
      cancelValue : "取消" 
    }
  },
  created(){
    // this.checkVerifyCode();
    
    
  },  
  methods : {
    focus(val){
      val.warning = false;
      val.hint = "";
    },
    next(){
      if(Check.list(this.list)){
          return;
      }
      this.step = "step2";
    },
    prev(){
      this.step = "step1";
    },
    //获取图片验证码
    getPhotoCode(){
      this.photoCode.rid+=1;
    },
    //获取短信验证码
    getPhoneCode(val){
      if(val.disabled){
        return;
      }
      if(this.phone.success&&this.photoCode.success){
        let args = {
          phoneNumber : this.phone.value,
          pid : "00000000000",
          type : "register",
          token : this.photoCode.captchaToken
        }; 
        var self = this;
        $.ajax({
          url : App.getVerifyCode,
          data : args,
          type : "get",
          success(r){
            val.warning = false;
            val.hint = "";
            val.success = true;
            self.countdown(60);
            self.getCode.disabled = true;
          },
          error(r){
            val.warning = true;
            val.hint = "获取验证码失败";
            // self.phone.hint = JSON.parse(r.response).desc;
            val.success = false;
          },
        });
      }else{
        this.phone.blur(this.phone);
        this.photoCode.checkPhotoCode(this.photoCode);
      }
    },
    checkVerifyCode(getCode){
      //判断是否是手机号正确
      if(!Check.ifPhone(this.phone)){
        return;
      }
      getCode.warning = true;
      getCode.success = false;
      if(getCode.value.length!=6){
        getCode.hint = "请输入6位验证码";
        return; 
      }
      let args = {
          // phoneNumber : this.list[2].value,
          // code : this.photoCode.captchaToken,
          phoneNumber : this.phone.value,
          code : this.getCode.value,
        }; 
        var self = this;
        $.ajax({
          url : App.checkVerifyCode,
          data : args,
          type : "GET",
          success(r){
            getCode.token = r.token;
            getCode.warning = false;
            getCode.success = true;
            getCode.hint = ""; 
            var self = this;
            setTimeout(()=>{
              self.modal = { 
                show : true,
                type : "success",
                hint : "手机验证成功",
                cancel(){
                  self.modal = {};
                }
              };
              setTimeout(()=>{
                self.modal = {};
              },1000)
            },1000)
          },
          error(r){
            if(JSON.parse(aa.response).desc=="Verify code error"){
              getCode.hint = "验证码错误";
            }else{
              getCode.hint ="验证失败";
            }
          }
        });
    },
    //倒计时
    countdown(time){
      this.getCode.loadTime = "("+time+")";

      var self = this;
      setTimeout(()=>{
        time--;
        if(time>0){
          self.countdown(time);
        }else{
          this.getCode.loadTime = "";
        }
      },1000);
    },
    cancel(){
      this.$router.push("/jiexing/user");
    },
    commit(){
      var self = this;
      if(this.disabledCommit){
        return;
      }
      if(!this.getCode.token){
        this.phone.warning = true;
        this.phone.hint = "请先完成验证手机号码";
        this.phone.success = false;
        return;
      }
      self.disabledCommit = true;
      //保存
      Commit.save({
        self : this
      }); 
      var self = this;
      let args = {
        "type" : "phone",
        "pid" : window.pid,
        "phoneNumber" : this.phone.value, 
        "userName" : this.list[0].value,
        "password" : this.list[1].value,
        "userEmail" : this.list[2].value, 
        "userType" : this.userType.value,//967129
        "token" : this.getCode.token,
      }; 
		  $.ajax({
        //提交数据的类型 POST GET
        type:"POST", 
        //提交的网址
        url:App.userProfile,
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        //提交的数据
        data:JSON.stringify(args),
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        success(r){
          //保存失败
          Commit.success({
            self : self,
            callback(){
              self.submitValue = "保存成功";
            }
          }); 
          setTimeout(()=>{
            self.$router.push("/jiexing/user");
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

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
select{
  width: 183px;
  height: 32px;
}
.photoCodeImg{
  height: 32px;
}  
</style>
