<template>
  <div class="page" v-if="page&&page.totalPages>1">
    <!--<aside>显示1到{{page.totalElements}}的{{page.numberOfElements}}个条目</aside>-->
    <ul> 
        <!--<li class=""><input class="pageNumber" /></li>
        <li class="prev">跳转</li>--> 
        <li class="prev" :class="page.number==0&&'disabled'" @click="prevPage(page.number==0)"><i class="icon">&#xe697;</i>{{prev}}</li>
        <li v-for="page in pageData(page)" @click="linkNnmber(page)" :class="page.active+' '+page.omit">{{page.num}}</li>
        <li @click="nextPage(page.number==page.totalPages-1)" class="next" :class="page.number==page.totalPages-1&&'disabled'"><i class="icon">&#xe6a7;</i>{{next}}</li>
    </ul>
  </div>
</template>
<script>
import path from '@/js/tool/path';
export default {
  name: 'search',
  props : ['page'],
  data () {
    return {
      prev : "上一页",
      next : "下一页",
    }
  },
  created(){
    
  },
  methods : {
    pageData(data){
      data = data || {};
        var pages = [];
        // totalPages : 20,
        // totalElements : 200,
        // numberOfElements : 10,
        // number : 5
        //小于6页全部展示
        if(data.totalPages<=6){
            for(var i=0;i<data.totalPages;i++){
                pages.push({
                    num : i+1,
                    active : i==data.number?"active":""
                });
            }
        }
        if(data.totalPages>6){
            //当前页面小于4前面全部展示
            if(data.number<5){
                for(var i=0;i<4;i++){
                    pages.push({
                        num : i+1,
                        active : i==data.number?"active":""
                    });
                }
                if(data.number==4){
                    pages.push({ num : 5});
                }
                pages.push({ num : "...", omit : "omit"});
                pages.push({ num : data.totalPages });
            }else
            //当前页面在最后3页后面全部展示
            if(data.number>=data.totalPages-4){
                pages.push({ num : 1 });
                pages.push({ num : "...", omit : "omit"});
                for(var i=data.totalPages-4;i<data.totalPages;i++){
                    pages.push({
                        num : i+1,
                        active : i==data.number?"active":""
                    });
                }
            }else
            //页面在中间
            if(data.number>=5&&data.number<data.totalPages-4){
                pages.push({ num : 1 });
                pages.push({ num : "...", omit : "omit"});
                for(var i=data.number-1;i<data.number+3;i++){
                    pages.push({
                        num : i+1,
                        active : i==data.number?"active":""
                    });
                }
                pages.push({ num : "...", omit : "omit"});
                pages.push({ num : data.totalPages });
            }
        }
        return pages;
    },
    //页码跳转页面
    linkNnmber(page){
      if(!page.active){
        let num = page.num-1;
        path.setPath({
          page : num
        });
        this.changePage(num);
      }
    },
    prevPage(disabled){
      if(!disabled){
        let num = this.page.number-1;
        path.setPath({
          page : num
        });
        this.changePage(num);
      }
    },
    nextPage(disabled){
      if(!disabled){
        let num = this.page.number+1;
        path.setPath({
          page : num
        });
        this.changePage(num);
      }
    },
    changePage(num){
       this.$emit('message',num);
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
