<template>
  <div class="full-container">
    <div class="center-table">
      <div class="box">
        <img src="../images/timg.jpeg"><br>
        <span>啊哦-一不小心闯进了未知领域，请点击下面按钮返回首页......</span><br>
        <router-link to="/jiexing/user"> 
          <input type="button" class="btn btn-primary" value="返回首页">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'n-zepto';
import App from '@/js/app';
import commitAjax from '@/js/commitAjax';
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

    }
  },
  created(){

  },
  methods:{
    
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
  background-color: #fbfbfb;
}
span{
  color: #666;
  font-size: 12px;
}
input{
  margin-top: 20px;
}
</style>
