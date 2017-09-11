<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--搜索添加--> 
      <div class="search-add clearfix">
        <router-link to="/jiexing/user/new">
          <input type="button" class="btn btn-primary" value="用户创建">
        </router-link>
        <search :search="search" v-on:message2="useSearch"></search>
      </div>
      <div class="table-box">
        <table class="table">
          <thead>
          <tr>
              <th v-for="val in titles" v-bind:style="val.styleObject">
                  {{val.name}}
              </th>
          </tr>
          </thead> 
          <tbody>
              <tr v-for="(val,key) in list" :class="val.class">  
                  <td>{{key+orderNumber+1}}</td>
                  <td>{{val.uid}}</td> 
                  <td>{{val.userName}}</td>
                  <td>{{val.phoneNumber}}</td>
                  <td>{{val.userEmail}}</td>
                  <td>{{val.userTypeName}}</td> 
                  <td>{{val.deviceNu}}</td>
                  <td>{{val.createDate}}</td>
                  <td>{{val.status==3?"已删除":"正常"}}</td>
                  <td class="tools"> 
                    <ul>
                      <li class="icon" v-if="val.status!=3" :class="tools.editClass" @click="edit(val)" v-html="tools.edit"></li>
                      <li v-if="val.deviceNu==0&&val.status!=3" class="icon" :class="tools.deleteClass" @click="deleteHint(val,key)" v-html="tools.delete"></li>
                    </ul>
                  </td>
              </tr>
              <tr v-if="!list.length">
                <td :colspan="titles.length">{{listStatus}}</td>
              </tr>
          </tbody>
        </table> 
      </div>
      <page :page="page" v-on:message="changePage"></page>
    </div>
    <modal :modal="modal"></modal>
  </div> 
</template>

<script>
import App from '@/js/app';
import location from '@/components/tool/location';
import page from '@/components/tool/page';
import modal from '@/components/tool/modal';
import search from '@/components/tool/search';
export default {
  name: 'userList',
  components : {
    location,
    page,
    modal,
    search
  },
  data () {
    return {
      location : [{
        name : "用户管理",
        path : "/jiexing/user"
      }],
      modal : {},
      page : {}, 
      search : {
        placeholder : "请输入用户名称查询",
        key : this.$route.query.searchKey||"userName",
        value : this.$route.query.searchVal||"",
        select : [{
          name : "用户名称",
          placeholder : "请输入用户名称查询",
          key : "userName"
        },{
          name : "手机号码",
          placeholder : "请输入手机号码查询",
          key : "phoneNumber"
        }]
      },
      orderNumber : 0,
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
        name : "用户状态"
      },{
        name : "操作"
      }],
      list : [],
      listStatus : "正在加载中...",
      tools : {
        edit : "&#xe69e;",
        editClass : "success hover",
        delete : "&#xe601;",
        deleteClass : "danger hover"
      }
    }
  },
  created(){
    console.log(this.$route.query,"query")
    //获取用户信息 
    this.getUserList();
  },
  methods:{
    deletes(){},
    //获取用户信息
    getUserList(page=this.$route.query.page,searchKey=this.$route.query.searchKey,searchVal=this.$route.query.searchVal){
      var self = this;
      page = page||0; 
      searchKey = searchKey||"";
      searchVal = searchVal||"";
      let args = {
        size:window.pageSize,
        page:page,
      };
      if(searchKey){
        args[searchKey] = searchVal;
      }
      
      $.ajax({ 
        url : App.getUserList,
        data : args,
        type : "GET",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success(r){
          self.list = r.content; 
          self.listStatus = "没有数据";
          self.page = r;
          self.orderNumber = (window.pageSize*page)||0;
        },
        error(r){
          self.listStatus = r.desc||"获取数据失败";
        }, 
      });
    },
    //编辑
    edit(val){
      this.$router.push('/jiexing/user/edit/'+val.uid);
    },
    //切换页面
    changePage(num){ 
      //获取用户信息
      this.getUserList(num);
    },
    //搜索添加
    useSearch(data,value){
      //获取用户信息
      this.getUserList(0,data.key,value);
    },
    //删除提示
    deleteHint(val,index){
      var self = this;
      this.modal = {
        show : true,
        type : "error",
        hint : "你要删除么?",
        tools : true,
        submit(){
          self.modal = {
            show : true,
            type : "success",
            hint : "正在删除中..."
          };
          $.ajax({ 
            url : App.userDelete, 
            type : "POST",
            data : JSON.stringify({
              uid : val.uid,
              pid : window.pid, 
              source : "JIEXING"   
            }),
            headers:{"Content-Type":"application/json", "Accept" : "application/json","Authorization":"Bearer "+userToken.access_token},
            success(r){
              self.modal.hint = "删除成功";
              setTimeout(()=>{ 
                self.modal = {};
                val.status = 3;
                // self.list.splice(index,1);
              },500);
            },
            error(r){
              self.modal = {
                show : true,
                type : "error",
                hint : "删除失败"
              };
              setTimeout(()=>{
                self.modal={};
              },1000);
            }
          });
          
        },
        cancel(){
          self.modal = {};
        }
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
