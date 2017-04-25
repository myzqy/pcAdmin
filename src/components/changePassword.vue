<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--添加用户-->
      <table class="input-form mt20">
        <tbody>
          <tr v-for="val in list" :class="val.last&&'line'">
              <th>{{val.title}}：</th>
              <td>
                  <input class="input input-long" type="password" :class="val.warning&&'danger'" v-model="val.value" :placeholder="val.placeholder" @keyup.enter="commit" @blur="val.blur(val,list)" @focus="focus(val)" :value="val.value"/>
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
    </div>
    <modal :modal="modal"></modal>
  </div>
</template>

<script>
import $ from 'n-zepto';
import App from '@/js/app';
import commitAjax from '@/js/commitAjax';
import modal from '@/components/tool/modal';
import location from '@/components/tool/location'
import {Check,Commit} from '@/assets/js/tool.js';
export default { 
  name: 'changePassword',
  components : {
    modal,
    Check,
    location
  },
  data () {
    return {
      location : [{
        name : "修改密码",
        path : "/user"
      }],
      list : [
        {
            title : "旧密码",
            value : "",
            hint : "",
            placeholder : "请输入旧密码",
            warning : false, 
            success : false,
            blur(val){
              //判断是否有值
              Check.ifPassword(val,["旧密码不能为空"]);
            }
        },
        {
            title : "新的密码",
            value : "",
            hint : "",
            placeholder : "请输入新密码",
            warning : false, 
            success : false,
            blur(val){
              //判断是否有值
              Check.ifPassword(val,["新的密码不能为空"]);
            }
        },
        {
            title : "确认新密码",
            value : "",
            hint : "",
            placeholder : "请输入新密码",
            warning : false, 
            success : false,
            last : true,
            blur(val,list){
              if(val.value.length<6){
                Check.ifPassword(val,["确认新的密码不能为空"]);  
              }else if(val.value!=list[1].value){
                val.warning = true;
                val.hint = "确认密码与新密码不一致";
                val.success = false;
              }else if(val.value==list[1].value){
                val.warning = false;
                val.hint = "";
                val.success = true;
              }
              //判断是否是邮箱号
              //Check.ifPassword(val,["确认新的密码不能为空"]);
            }
        }
      ],
      submitClass : "btn-primary",
      submitValue : "保存",
      submitDisabled : false,
      cancelClass : "btn-default",
      cancelValue : "取消",
      modal : {},
    }
  },
  created(){
    
  },
  methods:{
    focus(val){
      val.warning = false;
      val.hint = "";
    },
    cancel(){
      this.$router.back();
      // this.$router.push("/user");
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
      let args = {"newPassword":this.list[1].value,"oldPassword":this.list[0].value,"pid":window.pid};
      commitAjax.AJAX({
        url : App.changePassword,
        data : args,
        type : "POST", 
        success (r){
          self.$router.push("/");
        },
        error (r){
          console.log("错误")
          //错误
          Commit.error({
            self : self,
            callback(){
              self.submitValue = "保存";
              self.submitDisabled = false;
            }
          });
        },
        headers : {
          Authorization: "Bearer "+userInfo.access_token
        }
      });
    }
  },
  
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
