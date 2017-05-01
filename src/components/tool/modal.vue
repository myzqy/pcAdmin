<template> 

  <div class="modal" v-if="modal.show">
    <div class="center-box">
        <i class="bg" @click="clickBG"></i>
        <div class="box">
            <i class="icon" :class="typeData[modal.type].iconClass" v-html="typeData[modal.type].icon"></i>
            <span class="vm">{{modal.hint}}</span>
            <div v-if="modal.tools" class="btn-group tl mt15">
                <input type="button" class="btn mr10 btn-primary" @click="submit" value="提交">
                <input type="button" class="btn btn-default" @click="cancel" value="取消">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  props : ['modal'],
  data () {
    return {
      typeData : {
        error : {
          icon : "&#xe601;",
          iconClass : "danger",
        },
        success : {},
        warning : {}
      },
      // show : false,
      modalShow : false,
      // error : {
      //   icon : "&#xe601;",
      //   iconClass : "danger",
      //   // val : val,
      //   hint : "是否确定要删除？",
      //   tools : {
      //     submit : "确定",
      //     submitClass : "btn-danger",
      //     submitCallback(){
      //       self.list[index].class = "fadeOut"; 
      //       setTimeout(()=>{ 
      //         self.list.splice(index,1);
      //       },500);
      //     },
      //     cancel : "取消",
      //     cancelClass : "btn-primary",
      //     cancelCallback(){
      //     },
      //   },
      // }
    }
  },
  created(){
    
  }, 
  computed:{
    params(){
      if(!this.modal.tools){
        setTimeout(function(){

        });
      }
      return this.modal;
    }
  //   // modalTypeChange
  //   params(){
  //     let [val,info=""] = [{},this[this.modal.type]];
  //     // this.show = true;
  //     // console.log(this.modal,"this.modal",this[this.modal.type],info)
  //     if(info){
  //       Object.assign(val,info,this.modal);
  //       return val;
  //     }else{
  //       return {};
  //     }
  //   }
  },
  methods : {
    clickBG(){
      if(!this.modal.tools){
        this.cancel();    
      }
    },
    cancel(){
      this.modal.cancel();
      // console.log("cancel")
      // this.ifShow = false;
      // this.params.show = false;
      // this.params.tools.cancelCallback();
      // this.modal = {};+
    },
    hideShow(){
      this.modalShow = false;
    },
    submit(){
      this.modal.submit();
      // this.params.show = "";
      // this.params.tools.submitCallback();
      // this.modal.callback();
      //ajax
      
      // this.modal = {};
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .modal{
    /*弹框*/
    display: table;
    position: fixed;
    top:0;
    left:0; 
    z-index: 20;
    width:100%;
    height:100%;
    background-color: rgba(255,255,255,0.2);
    // opacity:0;
    vertical-align: middle;
    .icon-close{ 
      position: absolute;
      top:5px;
      right:5px;
      color: #ccc;
      font-size: 24px;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
    .box{
      display: inline-block;
      position: relative;
      max-width: 1000px;
      padding:20px;
      border-radius:4px;
      background-color: rgba(255,255,255,0.8);
      box-sizing: border-box;
      box-shadow:3px 3px 11px 9px #d9d8dd;
      color: #555;
      line-height: 150%;
      text-align: left;
      .main-icon{
        font-size: 28px;
      }
    } 
    .bg{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      background:rgba(255,255,255,0.2);
    }
  }
</style>
