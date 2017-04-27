/**
 * Created by boli on 2017/2/15.
 */
import $ from 'n-zepto';
window._AjaxFlag = true;
export default{
  AJAX:function({
    url,
    data,
    type,
    success=()=>{},
    error=()=>{},
    headers={
      "Accept": "application/json",
      "contentType": "application/json"
    },
    dataType="json",
    before
  }){
    // if(_AjaxFlag) {
      // window._AjaxFlag = false;
      console.log(url,"url");
      $.ajax({
        url: url,
        data: data,
        type: type,
        beforeSend: function () {
            if(before!=undefined){
                var loading=$("#"+before);
                loading.removeClass('hide');
            }
        },
        dataType: dataType,
        headers : headers,
        success: function (r) {
          console.log(r,"rrrrrr");
          window._AjaxFlag = true;
            if(before!=undefined){
                var loading=$("#"+before);
                loading.addClass('hide');
            }
          return success(r);
        },
        error: function (e) {
          console.log(e,"eeeeee");
          window._AjaxFlag = true;
          return error();
          // location.reload();
        }
      })
    // }
  }
  // AJAX:function(url,data,type,success,error=()=>{},headers={
  //   "Accept": "application/json",
  //   "contentType": "application/json"
  // },dataType="json",before){
  //   if(_AjaxFlag) {
  //     window._AjaxFlag = false;
  //     $.ajax({
  //       url: url,
  //       data: data,
  //       type: type,
  //       beforeSend: function () {
  //           if(before!=undefined){
  //               var loading=$("#"+before);
  //               loading.removeClass('hide');
  //           }
  //       },
  //       dataType: dataType,
  //       headers : headers,
  //       success: function (r) {
  //         console.log(r,"rrrrrr");
  //         window._AjaxFlag = true;
  //           if(before!=undefined){
  //               var loading=$("#"+before);
  //               loading.addClass('hide');
  //           }
  //         return success(r);
  //       },
  //       error: function (e) {
  //         console.log(e,"eeeeee");
  //         window._AjaxFlag = true;
  //         return error();
  //         // location.reload();
  //       }
  //     })
  //   }
  // }
}
