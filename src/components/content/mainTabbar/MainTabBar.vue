<template>
  <tab-bar>
    <!--往tab-bar插槽中插入四个插件，对应首页、分类、购物车、我的 -->
    <tab-bar-item link="/home" activeColor="pink">
      <!--使用具名插槽，可以随时扩展，后续要增加的时候只需要增加tab-bar-item-->
      <img slot="item-icon" src="~@assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~@assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <!--通过link属性把路径推送到$route中去，通过activeColor把焦点颜色传入进去     -->
    <tab-bar-item link="/category" activeColor="pink">
      <img slot="item-icon" src="~@assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~@assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item link="/cart" activeColor="pink">
      <img slot="item-icon" src="~@assets/img/tabbar/cart.svg" alt="">
      <img slot="item-icon-active" src="~@assets/img/tabbar/cart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item link="/profile" activeColor="pink">
      <img slot="item-icon" src="~@assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~@assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "@components/common/tabbar/TabBar";
  import TabBarItem from "@components/common/tabbar/TabBarItem";
    export default {
        name: "MainTabBar",
      components: {
        TabBar,
        TabBarItem
      },

    }
</script>

<style scoped>

</style>
