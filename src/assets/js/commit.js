export default {
  // val,hint="保存中..."
  save({self,hint="保存中..."}){
    self.submitClass = "btn-default";
    self.submitValue = hint;
    self.submitDisabled = true;
  },
  success({
    self
    ,hint="保存成功",
    callback=()=>{}
  }){
    self.submitClass = "btn-success";
    self.submitValue = hint;
    self.submitDisabled = true;
    //回调
    callback();
  },
  error({
    self,
    hint="保存失败",
    submitClass = "btn-primary",
    callback=()=>{}
  }){
    console.log("保存失败");
    self.submitClass = "btn-danger";
    self.submitValue = hint;
    self.submitDisabled = true;
    setTimeout(()=>{
      self.submitClass = submitClass;
      self.submitValue = hint;
      self.submitDisabled = true;
      //回调
      callback();
    },1000);
  },
}