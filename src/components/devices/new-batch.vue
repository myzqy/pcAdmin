
<template>
  <div>
    <location :list="location"></location>
    <div class="container">
      <!--<span class="" @click="oppop">发送</span>-->
      <!--<input id="fileId1" type="file"  name="file" />-->
      <!--添加设备信息-->
      <table class="input-form mt20">
        <tbody>
          <tr class="line">
            <th>上传文件：</th>
            <td>
              <!--<a href="javascript:;" class="a-upload">
                  <input type="file" name="" id="">点击这里上传文件
              </a>-->
              <span class="pr5">{{fileName}}</span>
              <a href="javascript:;" class="file">{{fileName?"重新选择":"选择文件"}}
                  <input type="file" accept="text/csv" name="" id="fileId1">
              </a>
              <a v-if="fileName" href="javascript:;" @click="del()" class="file cancel">删除</a>
              <div class="warning-text">{{warningText}}</div>
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
import App from '@/js/app';
import {Check,Commit} from '@/js/tool/tool.js';
import location from '@/components/tool/location';
export default { 
  name: 'deviceNew',
  data () {
    return {
      location : [{
        link : "/jiexing/devices",
        name : "设备管理",
        path : "/jiexing/devices"
      },{
        name : "设备批量录入",
        path : "/jiexing/new"
      }],
      fileName : "",
      fileContent : "",
      devTid : "",
      warningText : "",
      submitClass : "btn-primary",
      submitValue : "保存",
      submitDisabled : false,
      cancelClass : "btn-default",
      cancelValue : "取消" 
    }
  },
  created(){
    this.event();
  },
  methods : {
    event(){
      let self = this;
      setTimeout(function(){
        //选择文件事件  
        $("#fileId1").change(function(){  
            var fileSelector = $("#fileId1")[0].files;  
            var file = fileSelector[0];  
        
            // $('#fileNameDes').text(fileSelector[0].name);  
            self.fileName = fileSelector[0].name;
            var reader = new FileReader();  
            reader.onload = function()  
            {  
                let info = this.result.split("\n"),
                    data = []; 
                for(let i=0;i<info.length;i++){
                  if(info[i]){ 
                    let val = info[i].split(",")[1];
                    if(val&&val!="devTid"){
                      data.push(val);
                    }
                  }
                }
                self.fileContent = data;
                // document.getElementById("showFile").innerHTML = this.result;  
            };  
            reader.readAsText(file);  
         
        });  
      },1000);
    },
    del (){
      this.fileName = "";
      this.fileContent = "";
    },
    cancel(){
      this.$router.push("/jiexing/devices");
    },
    commit(){
      if(this.disabledCommit){
        return;
      }
      if(this.fileContent){
        var self = this;
        let args = {
          pid : window.pid,
          devTids : this.fileContent||[]
        }
        //保存
        Commit.save({
          self : this
        });
        this.disabledCommit = true;
        $.ajax({
          url : App.deviceInfo,
          data : JSON.stringify(args),
          type : "POST",
          headers:{"Content-Type":"application/json","Authorization":"Bearer "+userToken.access_token},
          success(r){
            //保存成功 
            Commit.success({
              self : self,
              callback(){
                self.submitValue = "保存成功";
              }
            }); 
            setTimeout(()=>{
              self.$router.push("/jiexing/devices");
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
      }else{
        this.warningText = "请上传.csv后缀的文件";
      }
    },
  },
  components : {
    location,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/*a  upload */
.a-upload {
    padding: 4px 10px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
}

.a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}

.a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
}  


.file {
    display: inline-block;
    position: relative;
    top:10px;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    &.cancel{
      background: #fff;
      color: #666;
      &:hover{
        background: #f0f0f0;
        color: #333;
      }
    }
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
    
}
.warning-text{
  padding: 20px 0 0 5px;
  color:#f00;
  font-size: 12px;
}
</style>
