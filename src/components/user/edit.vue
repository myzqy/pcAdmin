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
                    <input class="input input-long" :class="val.warning&&'danger'" v-model="val.value" @keyup.enter="commit" :placeholder="val.placeholder" @blur="val.blur(val)" @focus="focus(val)" :value="val.value"/>
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
    <modal :modal="modal"></modal>
  </div>
</template>

<script>
import $ from 'n-zepto';
import App from '@/js/app';
import {Check,Commit} from '@/js/tool/tool.js';
import location from '@/components/tool/location';
import modal from '@/components/tool/modal';
export default {
  name: 'userNew',
  components : {
    location,
    modal
  },
  data () {
    return {
      location : [{
        link : "/jiexing/user",
        name : "用户管理",
        path : "/jiexing/user"
      },{
        name : "用户修改",
        path : "/jiexing/new"
      }],
      modal : {},
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
      $.ajax({
        url : App.userProfile,
        data : args,
        type : "GET",
        headers : {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer "+userToken.access_token
        },
        success(r){
          self.nowStatus = "";
          self.list[0].value = r.userName; 
          self.list[1].value = r.userEmail;
        },
        error(r){ 
          self.nowStatus = r.desc||"获取用户信息失败";
        },
      });
    },
    focus(val){
      val.warning = false;
      val.hint = "";
    },
    cancel(){
      window.history.go(-1);
    },
    commit(){
      if(this.disabledCommit){
        return;
      }
      if(Check.list(this.list)){
        return;
      }
      //保存
      Commit.save({
        self : this
      });
      var self = this;
      let args = {
        uid : this.$route.params.id,
        pid : window.pid,
        userName : this.list[0].value,
        userEmail : this.list[1].value
      };
      this.disabledCommit = true;
      // debugger;
      $.ajax({
        url : App.userProfile,
        data : JSON.stringify(args),
        type : "PUT", 
        dataType : "json",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
        success(r){
          //保存失败
          Commit.success({ 
            self : self,
            callback(){
              self.submitValue = "保存成功";
            }
          });
          setTimeout(()=>{
            window.history.go(-1);
          },1000);
        },
        error(r){
          self.disabledCommit = false;
          //保存失败
          Commit.error({
            self : self,
            callback(){
              self.submitValue = "保存"; 
            }
          });
        },
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
