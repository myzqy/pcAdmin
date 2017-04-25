<template>
  <div class="modal" v-if="modal.show">
    <div class="center-box">
        <i class="bg" @click="clickBG"></i>
        <div class="box">
            <i v-if="modal.icon" class="icon" :class="modal.iconClass" v-html="modal.icon"></i>
            <span class="vm">{{modal.hint}}</span>
            <div v-if="modal.tools" class="btn-group tl mt15">
                <input type="button" class="btn mr10" @click="submit" :class="modal.tools.submitClass||'btn-primary'" :value="modal.tools.submit">
                <input type="button" class="btn" @click="cancel" :class="modal.tools.cancelClass||'btn-default'" :value="modal.tools.cancel">
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
    }
  },
  created(){
    console.log("modal");
  },
  methods : {
    clickBG(){
      if(!this.modal.tools){
        this.modal.show = "";
      }
    },
    cancel(){
      this.modal.show = "";
      this.modal.tools.cancelCallback();
    },
    submit(){
      this.modal.show = "";
      this.modal.tools.submitCallback();
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
