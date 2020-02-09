<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
      name: "RecommendView",
      props: {
          recommends :{
            type: Array,
            default(){
              return []
            }
          }
      }
    }
</script>

<style scoped>
  .recommend {
    /*水平布局*/
    display: flex;
    width: 100%;
    /*居中*/
    text-align: center;
    /*调整文字大小*/
    font-size: 12px;
    padding: 8px 0 15px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item {
    /*均等*/
    flex: 1;
  }
  .recommend-item img{
    width: 75px;
    height: 75px;
    /*图片和文字距离*/
    margin-bottom: 5px;
  }
</style>
