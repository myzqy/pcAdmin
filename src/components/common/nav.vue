<template>
  <nav id="nav">
    <h1 id="LOGO"><img src="../../images/logo.png"></h1> 
    <ul>
      <li v-for="val in list" :class="'nav-'+val.name">
        <router-link  tag="div" :to="{name:val.name,query:val.query}">
          <i class="icon" v-html="val.icon"></i>
          <span>{{val.title}}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      list : [{
        title : "用户管理",
        name : "user",
        query : {},
        icon : "&#xe89e;"
      },{
        title : "权限管理",
        name : "permission",
        query : {},
        icon : "&#xe600;"
      },{
        title : "设备管理",
        name : "devices",
        query : {},
        icon : "&#xe6ae;"
      }]
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#LOGO{
  width: 100%;
  padding: 10px 0;
  // background-color: #131e26;
  color:#fff;
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  img{
    height: 80px;
  }
}
#nav{
  ul{
    border-top:2px solid #131e26;
  }
  li{
    width: 100%;
    color: #869fb1;
    line-height: 45px;
    cursor: pointer;
    >div{
      width: 100%;
      padding:0 20px;
      border-left: 4px solid transparent; 
      border-bottom:2px solid #131e26;
      box-sizing: border-box;
    }
    span{
      vertical-align: middle;
    }
    &:hover{
      color: #fff;
      background-color: #131e26;
    }
    .router-link-active{
      border-left: 4px solid #19a9d5;
      color: #fff;
    }
  }
  .icon{
    margin-right: 5px;
    color: #fff;
  }
}
</style>
