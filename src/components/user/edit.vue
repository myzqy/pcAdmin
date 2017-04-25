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
    </div>
  </div>
</template>

<script>
import {Check,Commit} from '@/assets/js/tool.js'
import location from '@/components/tool/location'
export default {
  name: 'userNew',
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
            title : "手机",
            value : "",
            hint : "",
            placeholder : "请输入手机号码",
            warning : false, 
            success : true,
            blur(val){
              //判断是否是手机号
              Check.ifPhone(val);
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
  methods : {
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
    }
  },
  created(){
    this.list[0].value = this.$route.params.user;
    this.list[1].value = this.$route.params.phone;
    this.list[2].value = this.$route.params.email+"@qq.com";
  },
  components : {
    location,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
