<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>

    <!--    直接这样写，插槽定义的样式会被传进来的标签覆盖掉，样式不会加载-->
<!--    <slot :class="{active: isActive}" name="item-text"></slot>-->

    <!--    这样包一层后，插槽替换的就是div内部的标签不会替换外面绑定的样式-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>

    <!-- 所有的item都展示同一个图片，同一个文字   -->
<!--    <img src="@assets/img/tabbar/home.svg" alt="">-->
<!--    <div>首页</div>-->
  </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      //定义属性的类型
      props: {
        link: String,
        activeColor: {
          type: String,
          default: 'red'
        }
      },
      data(){
          return{
            // isActive: true,
          }
      },
      computed: {
        isActive(){
          // $route.path = /home -> this.link = /home = true
          // $route.path = /home -> this.link = /category = false
          // $route.path = /home -> this.link = /shopcart = false
          // $route.path = /home -> this.link = /profile = false
          // console.log(this.$route.path,this.link)
          // console.log(this.$route.path.indexOf(this.link))
          return this.$route.path.indexOf(this.link) !==-1
        },
        //绑定动态样式
        activeStyle(){
          return this.isActive ? {color: this.activeColor}:{}
        }
      },
      methods: {
        itemClick(){
          // console.log(this.$route)
          this.$router.push(this.link)
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item {
    /*将div安装屏幕大小均等分和居中展示,调整文字离边框的高度*/
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  /*调整图片大小*/
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    /*图片离组件内距*/
    margin-top: 3px;
    /*压缩图片空间*/
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
