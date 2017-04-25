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
        name : "设备管理",
        path : "/user"
      },{
        name : "设备信息录入",
        path : "/new"
      }],
      list : [
        {
            title : "生厂编号",
            value : "",
            hint : "",
            placeholder : "请输入生厂编号",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "生厂日期",
            value : "",
            hint : "",
            placeholder : "请输入生厂日期",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "厂家名称",
            value : "",
            hint : "",
            placeholder : "请输入厂家名称",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "厂家联系方式",
            value : "",
            hint : "",
            placeholder : "请输入厂家联系方式",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "安装日期",
            value : "",
            hint : "",
            placeholder : "请输入安装日期",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "使用时长",
            value : "",
            hint : "",
            placeholder : "请输入厂家使用时长",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "使用单位",
            value : "",
            hint : "",
            placeholder : "请输入使用单位",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "单位联系方式",
            value : "",
            hint : "",
            placeholder : "请输入单位联系方式",
            warning : false, 
            success : false,
            blur(val){
              
            }
        },
        {
            title : "设备SIM",
            value : "",
            hint : "",
            placeholder : "请输入设备SIM",
            warning : false, 
            success : false,
            last : true,
            blur(val){
              
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
  components : {
    location,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
