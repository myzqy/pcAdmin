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
    let args = {"Uid":-1};
    commitAjax.AJAX(App.checkCaptcha,args,"GET",function (r) {
      self.photoCode.captchaToken = r.captchaToken;
    },function(r){
      val.warning = true;
      val.hint = "图形码错误";
      val.success = false;
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
