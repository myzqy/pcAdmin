export default {
    //设置
    setPath(info=""){
        //获取location信息
        let data = data||[];
        let params = this.getParams(info);

        for(let i in params){
            if(params[i]){
                data[i] = params[i];
            }
        }
        //设置href值
        this.setUrlParam(data);
    },
    //获取参数
    getParams(info){
        var href = location.href.split(location.pathname)[1];
        if(!href&&!info){
            return {
                urlParamVal : 0
            };
        }
        href = href.replace("?","&");
        href = href.split("&");
        href.shift();
        console.log(href,"href")
        var data = {
            urlParamVal : 0
        };
        for(var i=0;i<href.length;i++){
            var val = href[i].split("=");
            if(val[1]){
                data[val[0]] = val[1];
                data.urlParamVal++;
            }
        }
        Object.assign(data,info);
        return data;
    },
    //设置href值
    setUrlParam(info){ 
        var data = "";
        for(var i in info){
            if(i!="urlParamVal"){
                data += i+"="+info[i]+"&";
            }
        }
        data = data.slice(0,data.length-1);
        history.pushState("","","?"+data);
    },
    //清除参数
    clean(){
        history.pushState("","",location.pathname);
    },
}