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
            <th>{{userType.title}}</th>
            <td>
              <select v-model="userType.value" :value="userType.value">
                <option>超管用户</option>
                <option>厂家用户</option>
                <option>环保局用户</option>
              </select>
              <!--<label class="cp mr10">
                <input type="radio" name="a" class="mr5" @click="aaa(userType.a)" :checked="userType.superAdmin.checked" v-model="userType.a">
                <span class="vm">{{userType.superAdmin.value}}</span>
              </label>
              <label class="cp mr10">
                <input type="radio" name="b" class="mr5" @click="aaa(userType.a)" :checked="userType.commonAdmin.checked" v-model="userType.a">
                <span class="vm">{{userType.commonAdmin.value}}</span>
                <template v-if="userType.commonAdmin.checked">
                  <select>
                    <option v-for="val in userType.commonAdmin.list">{{val.value}}</option>
                  </select>  
                </template>
              </label>-->
              <!--<select>
                <option v-for="val in userType.list"></option>
              </select>-->
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
        name : "用户创建",
        path : "/new"
      }],
      list : [
        {
            title : "用户名称",
            value : "",
            hint : "",
            placeholder : "请输入用户名称",
            warning : false, 
            success : false,
            blur(val){
              //判断是否有值
              Check.haveValue(val);
            }
        },
        {
            title : "初始密码",
            value : "",
            hint : "",
            placeholder : "请输入初始密码",
            warning : false,
            success : false,
            blur(val){
              //判断是否为密码格式
              Check.ifPassword(val,["初始密码不能为空"]);
            }
        },
        {
            title : "手机",
            value : "",
            hint : "",
            placeholder : "请输入手机号码",
            warning : false, 
            success : false,
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
            success : false,
            last : true,
            blur(val){
              //判断是否是邮箱号
              Check.ifEmail(val);
            }
        }
      ],
      userType : {
        value : "超管用户",
        title : "用户类型",
        // superAdmin : {
        //   value : "超管用户",
        //   checked : true,
        // },
        // commonAdmin : {
        //   value : "普通用户",
        //   checked : false,
        //   list : [{
        //     value : "厂家用户"
        //   },{
        //     value : "环保局用户"
        //   }]
        // },
      },
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
  components : {
    location,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
