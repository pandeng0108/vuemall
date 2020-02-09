<template>
  <!-- 这里用class的好处是多个地方都会使用导航组件，可以统一管理，用id的话会重复 -->
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,0.3);
  }
  .left,.right {
    width: 60px;
  }
  .center {
    flex: 1;
  }
</style>
