<template>
  <div id="app" v-cloak>
    <template v-if="$route.name=='login'">
      <transition name="fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>  
    </template>
    <template v-else>
      <nav-view></nav-view>
      <main id="main"> 
        <header-view></header-view> 
        <div id="content">
          <transition name="fade">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
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
      
    }
  },
  components : {
    navView,
    headerView,
  },
  computed: { 
      
  }, 
  created(){
    this.$nextTick(()=>{
      setTimeout(()=>{
        document.getElementById("app").setAttribute("class","show");
      },50)
    }); 
    //获取全局信息
    window.pid = "00000000000";
    window.userToken = (localStorage.userToken&&JSON.parse(localStorage.userToken))||{};
    var self = this;
    //获取用户信息
    let args = {"Uid":-1};
    commitAjax.AJAX({
      url : App.userProfile,
      data : args,
      type : "GET",
      success(r){
        window.userInfo = r;
      },
      error(r){
        self.$router.push("/");
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
