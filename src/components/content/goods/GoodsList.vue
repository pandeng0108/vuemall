<template>
  <div class="goods">
    <goods-list-item v-for="(item,i) in goods" :goods-item="item" :key="'keys'+i">
    </goods-list-item>

  </div>
</template>

<script>
  import GoodsListItem from "@components/content/goods/GoodsListItem";
    export default {
        name: "GoodsList",
      components:{
        GoodsListItem
      },
      props:{
          goods:{
            type: Array,
            default(){
              return []
            }
          }
      }
    }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 4px;
  }

</style>
