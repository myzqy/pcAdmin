<template>
  <div>
    <header id="header">
      <div class="welcome">
        <i class="icon pl10">&#xe60d;</i>
        <span class="vm">{{welcome}}</span>
        <div class="user" @mouseover="over" @mouseout="out">
          <i class="icon pl10">&#xe70b;</i>
          <strong class="nick primary">{{userName}}</strong>
          <i class="icon pl5">&#xe6a6;</i>
        </div>
      </div> 
    <span>LESS</span>
    </header>
    <ul class="user-tool" :class="userTool" @mouseover="over" @mouseout="out">
      <li v-for="val in tools" @click="Chaining(val)"><i class="icon" v-html="val.icon"></i>{{val.text}}</li>
    </ul>
  </div>
</template>

<script>
import App from '@/js/app';
let vueItem = {
  name: 'hello', 
  props : ['userName'],
  data () {
    return {
      welcome : "欢迎来到管理后台",
      // userName : window.userInfo.content[0].userName,
      userTool : "",
      tools : [{ 
        icon : "&#xe69e;",
        text : "修改密码",
        link : "/jiexing/changePassword"
      },{
        icon : "&#xe60a;",
        text : "登出",
        link : "/jiexing",
        methods : "logout"
      }]
    }
  },
  created(){
  },
  methods:{
    //跳转链接
    Chaining(val){
      if(val.methods){
        this[val.methods]();
      }else{
        this.$router.push(val.link);
      }
    },
    logout(){
      var self = this;
      let args = {
        uid : userInfo.uid,
        pid : window.pid,
        source : "JIEXING",
        token : userToken.access_token
      };
      $.ajax({
        url : App.loginOut, 
        type : "GET",
        data : args,
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success(r){
          localStorage.userToken = "";
          self.$router.push("/jiexing/login");
        },
        error(){

        }
      });
    },
    over(){
      this.userTool = "show";
    },
    out(){
      this.userTool = "";
    }
  }
}
export default vueItem;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#header{
  padding:0 15px;
  background-color:#fff;
  box-sizing: border-box;
  line-height: 50px;
  .welcome{
    text-align: right;
  }
}
.user{
  display: inline-block;
  .nick{
    font-weight: normal;
    vertical-align: middle;
  }
}
.user-tool{
  position: fixed;
  top: 50px;
  right: 10px;
  z-index: 1;
  background: #333;
  border: 1px solid #fff;
  border-radius: 3px 0 0;
  opacity: 0;
  visibility: hidden;
  transition: all .2s;
  -moz-transition: all .2s;
  -webkit-transition: all .2s;
  -o-transition: all .2s;
  &.show{
    opacity: 1;
    visibility: visible;
  }
  li{
    width: 156px;
    height: 40px;
    padding:0 15px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
    .icon{
      margin-right: 5px;
      color: #fff;
      font-size: 14px;
    }
    &:first-child{
      &:before{
        position: absolute;
        top: -6.6px;
        right: 24px;
        content: "";
        border-top: 0;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #fff;
        border-left: 7px solid transparent;
      }
      &:after{
        position: absolute;
        top: -5px;
        right: 25px;
        border-top: 0;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #333;
        border-left: 6px solid transparent;
        content: "";
      }
    }
    &:hover{
      background:#4a4a4a;
    }
  }
}

</style>
