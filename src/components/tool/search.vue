<template>
  <div class="search">
    <input class="input" placeholder="请输入用户名称查询">
    <input type="button" class="btn btn-primary" value="查询">
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .search{
    float: right;
  }
</style>
