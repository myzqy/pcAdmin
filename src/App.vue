<template>
  <div id="app" v-cloak>
    <template v-if="$route.name=='login'">
      <transition name="fade">
          <router-view></router-view>
      </transition>  
    </template>
    <template v-else>
      <nav-view></nav-view> 
      <main id="main"> 
        <header-view :userName="userName"></header-view>  
        <div id="content">
          <transition name="fade">
              <router-view></router-view>
          </transition>
        </div>
      </main>
    </template>
  </div>
</template>
<script>
import App from '@/js/app';
import navView from './components/common/nav'
import headerView from './components/common/header'
export default {
  name: 'app',
  data (){
    return {
      userName : "--" 
    }
  },
  components : {
    navView,
    headerView,
  },
  computed: { 
      
  }, 
  created(){
    let self = this;
    this.$nextTick(()=>{
      setTimeout(()=>{
        document.getElementById("app").setAttribute("class","show");
      },50)
    });
    //获取全局信息
    window.path = self.$route.path;
    window.pid = "01279786102";
    // window.pid = "01015362077";
    window.userToken = (localStorage.userToken&&JSON.parse(localStorage.userToken))||{};
    window.pageSize = 10;
    this.getUserInfo();
    // $.ajax({
    //   // url : "file:///Library/tomcat/webapps/admin/src/device-private-key.csv",
    //   url : "http://115.28.137.213:8080/device-private-key.csv",
    //   type : "get", 
    //   headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
    //   dataType : "text", 
    //   success(r){
    //     console.log(r,"rrr");
    //   },
    //   error(r){
    //     console.log(r,"rrr");
    //   }
    // });
  }, 
  methods : { 
    //获取用户信息
    getUserInfo(){
      var self = this;
      //获取用户信息
      let args = {"Uid":-1};
      $.ajax({
        url : App.userProfile, 
        data : args,
        type : "GET",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success(r){
          if(r){
            window.userInfo = r;
            localStorage.userInfo = JSON.stringify(r);
            self.userName = r.userName;
            if(r.userTypeName!="杰兴超级管理员"){
              $(".nav-permission,.nav-user").hide();
              // self.$router.push("/devices");
            }else{ 
              // self.$router.push("/user");
            }
          }else if(self.$route.path!="/jiexing/login"){
            self.$router.push("/jiexing/login");
          }
        },
        error(r){
          self.$router.push("/jiexing/login");
        },
      }); 
    }
  },
}
</script>
<style lang="less">
  .fade-enter-active,.fade-leave-active {
    /*transition: opacity .3s;*/
  }
  .fade-enter{
   opacity: 0;
  } 
  .fade-leave-active {
    opacity: 0;
  }
  .login-page{
    #nav,#header{
      display:none;
    }
    #main{
      padding:0;
    }
  }
  #app{
    display:none;
  }
</style>
