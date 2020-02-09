<template>
  <div id="tab-bar">
<!--    <div v-for="(item,index) in tabBarName" class="tab-bar-item">{{item}}</div>-->
<!--    插槽-->
   <slot></slot>
  </div>
</template>

<script>
    export default {
      name: "TabBar",
      data(){
        return{
          tabBarName:['首页','分类','购物车','我的']
        }
      }
    }
</script>

<style scoped>
  #tab-bar {
    /*水平分布*/
    display: flex;

    /*设置tabbar背景颜色*/
    background-color: #f6f6f6;

    /*调整tabbar至页面下方*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /*增加阴影效果*/
    box-shadow: 0 -1px 1px rgba(100,100,100,0.3);
  }

</style>

