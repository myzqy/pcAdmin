<template>
  <div class="full-container">
    <div class="center-table">
      <div class="box">
          <div id="login">
              <h1 id="login-logo"><img src="../images/logo.png"></h1> 
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
                  <li>
                      <input type="button" class="btn btn-primary btn-login btn-high" @click="submitLogin" id="login-btn" :value="loginVal">
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
import modal from '@/components/tool/modal';
import {Check} from '@/js/tool/tool.js';
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
        codeUrl : App.getImgCaptcha+"?rid=",
        // codeUrl : "http://test-uaa-openapi.hekr.me/images/getImgCaptcha?rid=",
        placeholder : "图文验证码",
        blur : function(val){
            //验证密码
            Check.ifPhotoCode(val);
        }
      },
      rememberPassword : localStorage.rememberPassword,
      warningIcon : "&#xe617;",
      loginVal : "登录",
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
    submitLogin(){
      if(this.disabledCommit){
        return;
      }
      if(!Check.ifPhone(this.phone)){
        return;
      }else if(!Check.ifPassword(this.password)){
        return;
      } 
      let args = {
        pid : window.pid, 
        username : this.phone.value,
        password : this.password.value, 
        clientType : "WEB" 
      };
      var self = this;
      this.loginVal = "登录中...";
      this.disabledCommit = true;
      $.ajax({
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
          window.userToken = r;
          localStorage.userToken = JSON.stringify(r);
          
          //获取用户详情 
          self.getUserDetail();
        },
        error (r){ 
          self.disabledCommit = false;
          self.loginVal = "登录";
          self.phone.warning = true;
          self.phone.hint = "账号获或密码错误";
        },
      });
    },
    checkInput(){
      //验证用户账号
      Check.ifPhone(this.phone);
    },
    //获取用户详情 
    getUserDetail(){
      var self = this;
      //获取用户信息
      let args = {"uid":-1};
      $.ajax({  
        url : App.userProfile, 
        data : args,
        type : "GET",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success(r){
          window.userInfo = r;
          localStorage.userInfo = JSON.stringify(r);
          if(r){
            if(r.userTypeName!="杰兴超级管理员"){
              self.$router.push("/jiexing/devices");
              //设置页面信息
              self.setPageInfo(()=>{
                $(".nav-permission,.nav-user").hide();
                $(".nick").html(r.userName);
              });
            }else{
              self.$router.push("/jiexing/user");
              //设置页面信息
              self.setPageInfo(()=>{
                $(".nick").html(r.userName);
              });
            }
          }
        }
      });
    },
    //设置页面信息
    setPageInfo(callback){
      //监听dom渲染
      let $tiem = setInterval(()=>{ 
        if($(".nav-permission").length){
          clearInterval($tiem); 
          callback();
        }
      },10);
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
    height: 380px;
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
  padding:20px 0;
  color: #fff;
  font-size: 30px;
  line-height: 100px;
  img{
    height: 80px;
  }
}
#login-btn{
  width:350px;
}


  // #nav,#header,#main{
  //   display:none;
  // }
</style>
