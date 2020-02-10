<template>
    <div class="tab-control">
      <div v-for="(item,index) in titles" class="tab-control-item" :class = "{active: index===currentIndex}" @click="controlCilck(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
      props: {
          titles: {
            type: Array,
            default(){
              return []
            }
          }
      },
      data(){
        return{
          currentIndex: 0,
        }
      },
      methods:{
        controlCilck(index){
          this.currentIndex = index
          this.$emit('control-cilck',index)
        }
      }
    }
</script>

<style scoped>
 .tab-control{
   display: flex;
   text-align: center;
   font-size: 15px;
   height: 40px;
   line-height: 40px;
   background-color: #fff;
 }
 .tab-control-item{
   flex: 1;

 }
 .tab-control-item span{
   /*给item标签下包含的span*/
   padding: 5px;
 }
 .active{
   color: var(--color-high-text);
 }
  .active span{
    /*给active下的span加上一个下划线，焦点在哪里，哪里就有一个下划线*/
    border-bottom: 3px solid var(--color-tint);
  }
</style>
