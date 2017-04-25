/**
 * Created by boli on 2017/3/14.
 */
let head = "http://test-uaa-openapi.hekr.me";
export default {
  //基本
  "getImgCaptcha" : head+"/images/getImgCaptcha",//获取图形验证码
  "checkCaptcha" : head+"/images/checkCaptcha",//验证图形验证码
  "getVerifyCode" : head+"/sms/getVerifyCode",//获取手机验证码
  "login" : head+"/login",//获取手机验证码
  "changePassword" : head+"/changePassword",//修改密码

  //用户管理
  "userProfile" : head+"/subUser/profile",//添加/修改用户  获取用户详情
  // "userNew" : head+"/subUser/profile ",//添加用户
  "getUserList" : head+"/subUser/list",//获取用户列表
  "userDelete" : head+"/subUser/delete",//删除用户

  //设备管理
  "devList" : head+"/dev/list",//设备管理列表
}