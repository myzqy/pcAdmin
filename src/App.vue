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
import $ from 'n-zepto';
import App from '@/js/app';
import commitAjax from '@/js/commitAjax';
import Vue from 'vue'
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
   mounted:function(){
      console.log('已经挂载到模板上:msg变量渲染到模板',this.$route.path)  
  },
  created(){
    console.log(123123);
    let self = this;
    
    this.$nextTick(()=>{
      setTimeout(()=>{
        document.getElementById("app").setAttribute("class","show");
      },50)
    }); 
    console.log(self.$route.path,"self.$route.path");
    //获取全局信息
    window.path = self.$route.path;
    window.pid = "00000000000";
    window.userToken = (localStorage.userToken&&JSON.parse(localStorage.userToken))||{};
    window.pageSize = 2;
    //获取用户信息
    let args = {"Uid":-1};
    commitAjax.AJAX({
      url : App.userProfile,
      data : args,
      type : "GET",
      success(r){
        window.userInfo = r;
        self.userName = r.content[0].userName;
      },
      error(r){
        console.log("error 呃呃呃呃");
        // self.$router.push("/");
      },
      headers : {
        Authorization: "Bearer "+userToken.access_token
      }
    });
  }
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
