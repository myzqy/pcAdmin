<template>
  <div class="full-container">
    <div class="center-table">
      <div class="box">
          <div id="login">
              <h1 id="login-logo">LOGO</h1> 
              <ul>
                  <li :class="phone.warning&&'warning-item'">
                    <i class="icon" v-html="phone.icon"></i>
                    <input class="input input-login" :class="phone.warning&&'danger'" type="text" :placeholder="phone.placeholder" @focus="focus(phone)" @blur="phone.blur(phone)"  @keyup.enter="submitLogin" :value="phone.value" v-model="phone.value">
                    <i class="icon icon-small-big icon-warning" v-html="warningIcon"></i>
                    <i class="tooptip" v-show="phone.hint">{{phone.hint}}</i>  
                  </li>
                  <li :class="password.warning&&'warning-item'">  
                    <i class="icon" v-html="password.icon"></i>
                    <input class="input input-login" :class="password.warning&&'danger'" type="password" :placeholder="password.placeholder" @focus="focus(password)" @blur="password.blur(password)"  @keyup.enter="submitLogin" :value="password.value" v-model="password.value">
                    <i class="icon icon-small-big icon-warning" v-html="warningIcon"></i>
                    <i class="tooptip" v-show="password.hint">{{password.hint}}</i>
                  </li>
                  <!--<li class="code" > 
                    <label class="label" :class="code.warning&&'warning-item'">  
                      <input class="input input-login input-small" :class="code.warning&&'danger'" type="text" :placeholder="code.placeholder" @focus="focus(code)" @blur="code.blur(code)"  @keyup.enter="submitLogin" :value="code.value" v-model="code.value">
                      <i class="icon icon-small-big icon-warning" v-html="warningIcon"></i>
                      <i class="tooptip" v-show="code.hint">{{code.hint}}</i>
                    </label>
                    <input class="btn btn-success btn-high get-code" type="button" @click="getPhoneCode" value="获取验证码">
                  </li>-->
                  <!--<li class="photo-code" >
                    <label class="label" :class="photoCode.warning&&'warning-item'">  
                      <input class="input input-login" :class="photoCode.warning&&'danger'" type="text" :placeholder="photoCode.placeholder" @focus="focus(photoCode)" @blur="checkPhotoCode(photoCode)"  @keyup.enter="submitLogin" :value="photoCode.value" v-model="photoCode.value">
                      <i class="icon icon-small-big icon-warning" v-html="warningIcon"></i>
                      <i class="tooptip" v-show="photoCode.hint">{{photoCode.hint}}</i>
                    </label>
                    <img :src="photoCode.codeUrl+photoCode.rid" @click="getPhotoCode(photoCode.codeUrl)">
                    <span @click="getPhotoCode(photoCode.codeUrl)">换一张</span>
                  </li>  -->
                  <li>
                      <input type="button" class="btn btn-primary btn-login btn-high" @click="submitLogin" id="login-btn" value="登录">
                  </li>
                  <li>
                      <label class="next-auto-login">
                      <span class="checkout-box on">
                          <input id="next-auto-login" class="radio" type="checkbox" checked="rememberPassword" v-model="rememberPassword">
                      </span>
                          <!--<input id="next-auto-login" type="checkbox"/>--> 
                          <span class="vm">记住密码</span>
                      </label>
                  </li>
              </ul>
          </div>
      </div>
    </div>
    <modal :modal="modal"></modal>
  </div>
</template>

<script>
import $ from 'n-zepto';
import App from '@/js/app';
import commitAjax from '@/js/commitAjax';
import modal from '@/components/tool/modal';
import {Check} from '@/assets/js/tool.js';
export default { 
  name: 'login',
  components : {
    modal,
    Check
  },
  data () {
    return {
      phone :{
        icon : '&#xe737;',
        warning : false,
        success : localStorage.phone?true:false,
        value : localStorage.phone||"",
        hint : "",
        placeholder : "请输入手机号码",
        blur : function(val){
            //验证用户账号
            Check.ifPhone(val);
        } 
      },
      password :{ 
        icon : '&#xe736;',
        warning : false,
        success : localStorage.password?true:false,
        value : localStorage.password||"",
        hint : "",
        placeholder : "请输入密码",
        blur : function(val){
            //验证密码
            Check.ifPassword(val);
        }
      },
      code :{
        icon : '&#xe61f;',
        warning : false,
        success : false,
        value : "",
        hint : "", 
        placeholder : "请输入手机验证码",
        blur : function(val){
            //验证密码
            Check.ifCode(val);
        }
      },
      photoCode : {
        icon : '&#xe61f;',
        warning : false,
        success : false,
        value : "",
        hint : "", 
        rid : "123456782314534562", 
        codeUrl : "http://test-uaa-openapi.hekr.me/images/getImgCaptcha?rid=",
        placeholder : "图文验证码",
        blur : function(val){
            //验证密码
            Check.ifPhotoCode(val);
        }
      },
      rememberPassword : localStorage.rememberPassword,
      warningIcon : "&#xe617;",
      modal : {},
    }
  },
  created(){
    //获取图片验证码
    this.getPhotoCode();
  },
  methods:{
    //获取手机验证码 
    getPhoneCode(){
      
    },
    focus(val){
      val.warning = false;
      val.hint = "";
    },
    //获取图片验证码
    getPhotoCode(){
      this.photoCode.rid+=1;
    },
    //验证图形验证码
    checkPhotoCode(val){
      console.log(val,"val");
      if(val.value&&val.value.length==4){
        var self = this;
        let args = {"rid":this.photoCode.rid,"code":val.value};
        commitAjax.AJAX(App.checkCaptcha,args,"GET",function (r) {
          self.photoCode.captchaToken = r.captchaToken;
        },function(r){
          val.warning = true;
          val.hint = "图形码错误";
          val.success = false;
        });
      }else{
        val.warning = true;
        val.hint = "格式错误";
        val.success = false;
      }
      
    },
    submitLogin(){
      // this.phone.value = 18868707977;
      // this.password.value = "111111";
      if(!Check.ifPhone(this.phone)){
        return;
      }else if(!Check.ifPassword(this.password)){
        return;
      } 
      // window.a = commitAjax;
      let args = {
        pid : window.pid,
        username : this.phone.value,
        password : this.password.value, 
        clientType : "WEB" 
      };
      var self = this;
      // args = {}; 
      // +"pid=00000000000&username="+this.phone.value+"&password="+this.password.value+"&clientType=WEB"
      commitAjax.AJAX({
        url : App.login,
        data : args,
        type : "POST", 
        success (r){
          if(self.rememberPassword){
            localStorage.phone = self.phone.value;
            localStorage.password = self.password.value;
            localStorage.rememberPassword = false;
          }else{
            localStorage.phone = "";
            localStorage.password = "";
            localStorage.rememberPassword = true;
          }
          window.userInfo = r;
          localStorage.userInfo = JSON.stringify(r);
          self.$router.push("/user");
          console.log(r,"success");
        },
        error (r){
          self.phone.warning = true;
          self.phone.hint = "账号获或密码错误";
        },
      });
    },
    checkInput(){
      //验证用户账号
      Check.ifPhone(this.phone);
    }
  },
  
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.full-container{
  position:fixed;
  top:0;
  left:0;
  z-index:100;
  width:100%;
  height:100%;
  background-color: rgb(58, 166, 228);
}
#login {
    display: inline-block;
    position: relative;
    width: 448px;
    height: 350px;
    border: 1px solid #cfd6de;
    border-radius: 3px;
    background: rgba(255,255,255,.3);
    ul{
      li {
        position: relative;
        padding-bottom: 23px;
        .icon {
            position: absolute;
            top: 11px;
            left: 63px;
        }
        .input {
            padding: 0 50px 0 40px;
        }
        .icon-warning {
            display: none;
            position: absolute;
            top: 11px;
            left:inherit;
            right: 63px;
        }
        .next-auto-login {
            display: inline-block;
            float: left;
            padding-left: 50px;
            color: #fff;
            cursor: pointer;
        }
        
        //获取验证码
        &.code{
          font-size:0;
          .input{
            padding:0 10px;
          }
          .btn{
            margin-left:10px;
          }
        }
        //图片验证码
        &.photo-code{
          font-size:0;
          .input{
            width:124px;
            padding:0 10px;
          }
          img{
            margin:0 10px;
            cursor: pointer;
          }
          span{
            font-size:14px;
            color:#333;
            vertical-align: middle;
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
          }
        }
        .label{
          display:inline-block;
          position: relative;
          .icon-warning{ 
            right:10px;
          } 
          .tooptip{
            right:0;
          }
        }
        //错误警告
        
    } 
      .warning-item{
        .icon-warning{ 
          display:block;
          color:red;
        } 
        &:hover{
          .tooptip{
            opacity: 1;
            visibility:visible;
          }
        }
      }
    }
}
.tooptip {
    position: absolute;
    top: 58px;
    right: 50px;
    z-index: 8;
    padding: 5px 10px 5px 20px;
    background-color: #4a4a4a;
    color:#fff;
    font-style: normal;
    font-size:12px;
    line-height: 30px;
    opacity: 0;
    visibility: hidden;
    transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -o-transition: all .2s;
    &:before,&:after {
      position: absolute;
      top: -7px;
      right: 24px;
      content: "";
      border-top: 0;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #4a4a4a;
      border-left: 7px solid transparent;
    }
    &:after {
      top: -5px;
      right: 25px;
      border-top: 0;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #4a4a4a;
      border-left: 6px solid transparent;
    }
    
}

#login-logo{
  color: #fff;
  font-size: 30px;
  line-height: 100px;
}
#login-btn{
  width:350px;
}


  // #nav,#header,#main{
  //   display:none;
  // }
</style>
