<template>
  <div class="search">
    <span class="pr10" v-if="search.numSearch">
      编号区域：
      <input class="input input-small numStart" @keyup.enter="commitSearch" :value="search.numStart" placeholder="编号起始">
      ->
      <input class="input input-small numEnd" @keyup.enter="commitSearch" :value="search.numEnd" placeholder="编号结束">
      <span class="pl10" v-if="search.search!=false">过滤条件：</span>
    </span>
    <template v-if="search.search!=false">
    <select v-if="search.select" @change="select(search)" v-model="search.key">
      <option v-for="val in search.select" :selected="search.key==val.key?true:false" :value="val.key" >{{val.name}}</option>
    </select> 
    <input class="input" :placeholder="search.placeholder" @keyup.enter="commitSearch" :value="search.value" v-model="search.value"> 
    </template>
    <input type="button" @click="commitSearch" class="btn btn-primary" value="查询">
  </div>
</template>

<script> 
import path from '@/js/tool/path'; 
export default {
  name: 'search',
  props : ['search'],
  data () {
    return {
      active : {}
    }
  }, 
  created(){
    
  },
  methods : {  
    //选择过滤内容
    select(search){
      //获取选中
      let val = this.getActive(search,search.key);
    },
    //获取选中
    getActive(search,active){
      var self = this;
      for(let i=0;i<search.select.length;i++){
        if(search.select[i].key==active){
          search.placeholder = search.select[i].placeholder;
          self.active = search.select[i];
          return search.select[i];
        }
      }
    },
    //查询 
    commitSearch(){
      // debugger;
      let startVal = $(".numStart").val(),
          endVal = $(".numEnd").val();
          // this.$emit('message',123123);
      if(startVal||endVal){
        path.setPath({
          numStart : "",
          numEnd : ""
        });  
        if(!/^[0-9]*$/.test(startVal)||startVal==""){ 
          this.$emit('error',"startValError");
          return;
        }else if(!/^[0-9]*$/.test(endVal)||endVal==""){
          this.$emit('error',"endValError");
          return;
        }else if(Number.parseInt(startVal)>=Number.parseInt(endVal)){
          this.$emit('error',"startValSmall");
          return;
        }
        startVal = Number.parseInt(startVal);
        endVal = Number.parseInt(endVal);
        path.setPath({
          numStart : startVal,
          numEnd : endVal
        });
      }
      let numSearchVal = [startVal,endVal];
      
      if(this.search.select&&this.search.select.length){
        //获取选中
        let val = this.getActive(this.search,this.search.key); 
        path.setPath({
          searchVal : this.search.value,
          searchKey : this.search.value==""?"":this.search.key
        });
        this.$emit('message2',val,this.search.value,numSearchVal);
      }else{
        path.setPath({
          searchVal : this.search.value,
        });
        this.$emit('message2',this.search.value,numSearchVal);
      }
      
      // this.useSearch(val,this.search.value); 
    },
    //搜索
    useSearch(data,value){
       this.$emit('message2',data);
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .search{
    float: right;
  }
  select{
    height: 32px;
    border:1px solid #cfdadd;
  }
   .input-small{
     width:100px;
   }
</style>
