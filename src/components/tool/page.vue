<template>
  <div class="page" v-if="info.totalPage>1">
    <aside>显示1到{{info.totalNum}}的{{info.currentSize}}个条目</aside>
    <ul>
        <li class=""><input class="pageNumber" /></li>
        <li class="prev">跳转</li>
        <li class="prev"><i class="icon">&#xe697;</i>{{prev}}</li>
        <li v-for="page in pageData(info)" :class="page.active+' '+page.omit">{{page.num}}</li>
        <li><i class="icon">&#xe6a7;</i>{{next}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search',
  // props : ['info'],
  data () {
    return {
      prev : "上一页",
      next : "下一页",
      info : {
        currentPage : 5,
        currentSize : 10,
        totalNum : 100,
        totalPage : 10
        // pages : Tool.pageData(info),
        // number : info.currentPage
      }
    }
  },
  methods : {
    pageData(data){
      data = data || {};
        var pages = [];
        //小于6页全部展示
        if(data.totalPage<=6){
            for(var i=0;i<data.totalPage;i++){
                pages.push({
                    num : i+1,
                    active : i==data.currentPage-1?"active":""
                });
            }
        }
        if(data.totalPage>6){
            //当前页面小于4前面全部展示
            if(data.currentPage<5){
                for(var i=0;i<4;i++){
                    pages.push({
                        num : i+1,
                        active : i==data.currentPage-1?"active":""
                    });
                }
                if(data.currentPage==4){
                    pages.push({ num : 5});
                }
                pages.push({ num : "...", omit : "omit"});
                pages.push({ num : data.totalPage });
            }else
            //当前页面在最后3页后面全部展示
            if(data.currentPage>=data.totalPage-4){
                pages.push({ num : 1 });
                pages.push({ num : "...", omit : "omit"});
                for(var i=data.totalPage-4;i<data.totalPage;i++){
                    pages.push({
                        num : i+1,
                        active : i==data.currentPage-1?"active":""
                    });
                }
            }else
            //页面在中间
            if(data.currentPage>=5&&data.currentPage<data.totalPage-4){
                pages.push({ num : 1 });
                pages.push({ num : "...", omit : "omit"});
                for(var i=data.currentPage-1;i<data.currentPage+3;i++){
                    pages.push({
                        num : i+1,
                        active : i==data.currentPage-1?"active":""
                    });
                }
                pages.push({ num : "...", omit : "omit"});
                pages.push({ num : data.totalPage });
            }
        }
        return pages;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  /*页码*/
.page{
  position: relative;
  padding:22px 10px 15px;
  text-align: right;
  .pageNumber {
    width: 20px;
    border: none;
    height: 25px;
    text-align: center;
  }
  aside{
    position: absolute;
    bottom:10px;
    left:10px;
    color:#7a7676;
    font-size:14px;
    text-align:left;
  }
  ul{
    font-size: 0;
  }
  li{
    display: inline-block;
    min-width: 32px;
    height:32px;
    margin:0 2px;
    padding:0 10px;
    border:1px solid #ccc;
    box-sizing: border-box;
    color:#4a4a4a;
    font-size:14px;
    line-height: 30px;
    cursor: pointer;
    .icon{
      padding-right:8px;
      font-size: 20px;
    }
    &.prev,&.next{
      color: #555;
      &.disabled{
        opacity: 0.5;
        cursor: default;
        &:hover{
          border:1px solid #ccc;
        }
      }
    }
    &:hover{
      border:1px solid #19a9d5;
    }
    //省略号
    &.omit{
      position: relative;
      top: 9px;
      min-width: 20px;
      padding: 0 2px 0 0;
      border: none;
      // letter-spacing: -2px;
      cursor: default;
    }
    //选中状态
    &.active{
      border:1px solid #19a9d5;
      background-color: #19a9d5;
      color: #fff;
      cursor: default;
    }
  }
}
</style>
