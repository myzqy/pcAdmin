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

  //设备管理
  "devList" : head+"/dev/list",//设备管理列表
}