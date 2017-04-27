export default {
  //判断是否有值
  haveValue(val,hint="用户名称不能为空"){
    if(val.value){
        val.warning = false;
        val.hint = "";
        val.success = true;
        return true;
    }else{
        val.warning = true;
        val.hint = hint;
        val.success = false;
        return false;
    }
  },
  //判断是否是手机号
  ifPhone(val,hint=["联系电话不能为空","联系电话不正确"]){
    val.warning = true; 
    val.success = false;
    if(!val.value){ 
        val.hint = hint[0];
        return false;
    }else if(!/^1[34578]\d{9}$/.test(val.value)){
        val.hint = hint[1];
        return false;
    }else{
        val.warning = false;
        val.hint = "";
        val.success = true;
        return true;
    }
  },
  //判断是否是邮箱号
  ifEmail(val,hint=["邮箱不能为空","邮箱不正确"]){
    val.warning = true; 
    val.success = false;
    if(!val.value){ 
        val.hint = hint[0];
        return false;
    }else if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val.value)){
        val.hint = hint[1];
        return false;
    }else{
        val.warning = false;
        val.hint = "";
        val.success = true;
        return true;
    }
  },
  //验证验证码  
  ifCode(val,hint="请输入6位验证码"){
    if(val.value&&val.value.length==6){
        val.warning = false;
        val.hint = "";
        val.success = true;
        return true;
    }else{
        val.warning = true;
        val.hint = hint;
        val.success = false;
        return false;
    }
  },
  //验证图形验证码
  ifPhotoCode(val,hint="格式错误"){
    if(val.value&&val.value.length==4){
        val.warning = false;
        val.hint = "";
        val.success = true;
        return true;
    }else{
        val.warning = true;
        val.hint = hint;
        val.success = false;
        return false;
    }
  },
  //验证密码
  ifPassword(val,hint=[]){
    val.warning = true; 
    val.success = false;
    if(!val.value){ 
        val.hint = hint[0]||"当前密码不能为空";
        return false;
    }else if(!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\_\-]{6,16}$/.test(val.value)){
        val.hint = hint[1]||"请输入6-16位不含特殊符号的密码";
        return false;
    }else{
        val.warning = false;
        val.hint = "";
        val.success = true;
        return true;
    }  
  },
  //检查列表
  list(list,params=""){
        for(var i=0;i<list.length;i++){
            if(!list[i].success){
                list[i].blur(list[i],list,params);
                return true;
            }
        }
    }
}