<template>
  <nav id="nav">
    <h1 id="LOGO">LOGO</h1> 
    <ul>
      <router-link v-for="val in list" tag="li" :to="{name:val.name,query:val.query}">
        <i class="icon" v-html="val.icon"></i>
        <span>{{val.title}}</span>
      </router-link>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#LOGO{
  width: 100%;
  height: 50px;
  background-color: #131e26;
  color:#fff;
  font-weight: normal;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
}
#nav{
  li{
    width: 100%;
    padding:0 20px;
    border-left: 4px solid transparent;
    border-bottom:2px solid #131e26;
    box-sizing: border-box;
    color: #869fb1;
    line-height: 45px;
    cursor: pointer;
    span{
      vertical-align: middle;
    }
    &:hover{
      color: #fff;
      background-color: #131e26;
    }
    &.router-link-active{
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
