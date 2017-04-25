<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      
    </div>
  </div>
</template>

<script>
import location from '../tool/location'
import search from '../tool/search'
import page from '../tool/page'
import modal from '../tool/modal'
export default {
  name: 'userList',
  data () {
    return {
      location : [{
        name : "权限管理",
        path : "/permission"
      }],
      modal : {},
      titles : [{
        name : "序号"
      },{
        name : "用户ID"
      },{
        name : "用户名称"
      },{
        name : "手机"
      },{
        name : "邮箱"
      },{
        name : "用户类型"
      },{
        name : "设备数量"
      },{
        name : "创建时间"
      },{
        name : "操作"
      }],
      list : [{
        id : "330011",
        user : "成吉思汗",
        phone : "18888888888",
        email : "18888888888@qq.com", 
        userType : "超管用户",
        createTime : "2017-02-11 10:10:00",
        devices : 2,
      },{
        id : "330012",
        user : "刘秀",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "厂家用户",
        createTime : "2017-02-11 10:10:00",
        devices : 3,
      },{
        id : "330013",
        user : "刘邦",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "环保局用户",
        createTime : "2017-02-11 10:10:00",
        devices : 4,
      },{
        id : "330011",
        user : "成吉思汗",
        phone : "18888888888",
        email : "18888888888@qq.com", 
        userType : "超管用户",
        createTime : "2017-02-11 10:10:00",
        devices : 0,
      },{
        id : "330012",
        user : "刘秀",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "厂家用户",
        createTime : "2017-02-11 10:10:00",
        devices : 3,
      },{
        id : "330013",
        user : "刘邦",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "环保局用户",
        createTime : "2017-02-11 10:10:00",
        devices : 0,
      },{
        id : "330011",
        user : "成吉思汗",
        phone : "18888888888",
        email : "18888888888@qq.com", 
        userType : "超管用户",
        createTime : "2017-02-11 10:10:00",
        devices : 1,
      },{
        id : "330012",
        user : "刘秀",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "厂家用户",
        createTime : "2017-02-11 10:10:00",
        devices : 0,
      },{
        id : "330013",
        user : "刘邦",
        phone : "18888888888",
        email : "18888888888@qq.com",
        userType : "环保局用户",
        createTime : "2017-02-11 10:10:00",
        devices : 0,
      },{
        id : "330011",
        user : "成吉思汗",
        phone : "18888888888",
        email : "18888888888@qq.com", 
        userType : "超管用户",
        createTime : "2017-02-11 10:10:00",
        devices : 7,
      }],
      tools : {
        edit : "&#xe69e;",
        editClass : "success hover",
        delete : "&#xe601;",
        deleteClass : "danger hover"
      }
    }
  },
  methods:{
    
  },
  components : {
    location,
    search,
    page,
    modal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
