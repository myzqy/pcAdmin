<template>
  <div class="location">
    <ul>
      <li v-for="val in list" :class="val.link&&'hover'" @click="link(val.link)">{{val.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'location',
  props : ['list'],
  data () {
    return {
      
    }
  },
  methods:{
    link(link){
      this.$router.push(link);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.location {
  height: 40px;
  padding: 0 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #f6f8f8;
  font-size: 0;
  line-height: 40px;
  li {
    display: inline-block;
    color: #777;
    font-size: 12px;
    text-align: justify;
    &:after {
      display: inline-block;
      padding: 0 2px;
      content: ">";
    }
    &:last-child:after{
      display: none;
    }
    &.hover{
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>
