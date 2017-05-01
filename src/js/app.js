/**
 * Created by boli on 2017/3/14.
 */
let head = "https://test-uaa-openapi.hekr.me/";
let head2 = "http://test-user-openapi.hekr.me/";
export default {
  //基本
  "getImgCaptcha" : head+"images/getImgCaptcha",//获取图形验证码
  "checkCaptcha" : head+"images/checkCaptcha",//验证图形验证码
  "getVerifyCode" : head+"sms/getVerifyCode",//获取手机验证码
  "checkVerifyCode" : head+"sms/checkVerifyCode",//验证手机验证码
  "login" : head+"login",//登录
  "changePassword" : head+"/changePassword",//修改密码
 
  //用户管理
  "userProfile" : head+"subUser/profile",//添加/修改用户  获取用户详情
  // "userNew" : head+"/subUser/profile ",//添加用户
  "getUserList" : head+"subUser/list",//获取用户列表
  "userDelete" : head+"subUser/delete",//删除用户

  //设备管理
  "devList" : head2+"device/list",//设备管理列表
  "devInfo" : head2+"device/info",//设备信息添加
  "deviceLog" : head2+"device/log",//获取设备日志
  "deviceWarnings" : head2+"device/warnings",//获取警告日志
}