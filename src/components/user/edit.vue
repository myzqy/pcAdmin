<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <template v-if="nowStatus">
        <div class="tc mt30">{{nowStatus}}</div>
      </template>
      <template v-else="">
        <!--添加用户-->
        <table class="input-form mt20">
          <tbody>
            <tr v-for="val in list" :class="val.last&&'line'">
                <th>{{val.title}}：</th>
                <td>
                    <input class="input input-long" :class="val.warning&&'danger'" v-model="val.value" :placeholder="val.placeholder" @blur="val.blur(val)" @focus="focus(val)" :value="val.value"/>
                    <div class="hint" v-if="val.hint">{{val.hint}}</div>
                </td>
            </tr>
            <tr>
                <th></th>
                <td colspan="2">
                    <div class="mt30">
                        <input @click="commit" type="button" :disabled="submitDisabled" class="btn mr10" :class="submitClass" :value="submitValue">
                        <input @click="cancel" type="button" class="btn" :class="cancelClass" :value="cancelValue">
                    </div>
                </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script>
import $ from 'n-zepto';
import App from '@/js/app';
import commitAjax from '@/js/commitAjax';
import {Check,Commit} from '@/js/tool/tool.js';
import location from '@/components/tool/location'
export default {
  name: 'userNew',
  components : {
    location,
  },
  data () {
    return {
      location : [{
        link : "/user",
        name : "用户管理",
        path : "/user"
      },{
        name : "用户修改",
        path : "/new"
      }],
      nowStatus : "正在加载中...",
      list : [
        {
            title : "用户名称",
            value : "",
            hint : "",
            placeholder : "请输入用户名称",
            warning : false, 
            success : true,
            blur(val){
              //判断是否有值
              Check.haveValue(val);
            }
        },
        {
            title : "邮箱",
            value : "",
            hint : "",
            placeholder : "请输入邮箱",
            warning : false, 
            success : true,
            last : true,
            blur(val){
              //判断是否是邮箱号
              Check.ifEmail(val);
            }
        }
      ],
      submitClass : "btn-primary",
      submitValue : "保存",
      submitDisabled : false,
      cancelClass : "btn-default",
      cancelValue : "取消" 
    }
  },
  created(){
    //获取用户信息
    this.getUserInfo();
  },
  methods : {
    //获取用户信息
    getUserInfo(){
      var self = this;
      let args = {
        Uid : this.$route.params.id
      }; 
      commitAjax.AJAX({
        url : App.userProfile,
        data : args,
        type : "GET",
        success(r){
          console.log(r,"success rrrr",r.content.userName)
          self.nowStatus = "";
          self.list[0].value = r.content[0].userName; 
          self.list[1].value = r.content[0].userEmail;
        },
        error(r){
          console.log(r,"rrrr")
          self.nowStatus = r.desc||"获取用户信息失败";
        },
        headers : {
          Authorization: "Bearer "+userToken.access_token
        }
      });
    },
    focus(val){
      val.warning = false;
      val.hint = "";
    },
    cancel(){
      this.$router.push("/user");
    },
    commit(){
      if(Check.list(this.list)){
        return;
      }
      //保存
      Commit.save({
        self : this
      });
      var self = this;
      let args = {
        uid : 29738729154,
        pid : window.pid,
        userName : 185191672195,
        userEmail : "111@qq.com"
      };
      // debugger;
      let aform = new FormData(); 
      aform.append('uid',args.uid);
      aform.append('pid',args.pid);
      commitAjax.AJAX({
        url : App.userProfile,
        data : args,
        type : "PUT", 
        dataType : "json",
        success(r){
          console.log(r,"success rrrr")
          //保存失败
          Commit.success({
            self : self,
            callback(){
              self.submitValue = "保存成功";
            }
          });
        },
        error(r){
          //保存失败 
          Commit.error({
            self : self,
            callback(){
              self.submitValue = "保存";
            }
          });
          console.log(r,"rrrr")
        },
        headers : {
          "Accept": "application/json",
          "contentType": "application/json",
          Authorization: "Bearer "+userToken.access_token
        }
      });
    }
  },
}
var data = {
  uid:"29738729154",
  pid:"00000000000",
  userName:"185191672195",
  userEmail:"111@qq.com"
}
$.ajax({
  url : "http://test-uaa-openapi.hekr.me/subUser/profile",
  data : data,
  type : "PUT",
  dataType:"json",
  success : function(e){
    console.log(e,"success");
  },
  error : function(e){
    console.log(e,"error");
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
