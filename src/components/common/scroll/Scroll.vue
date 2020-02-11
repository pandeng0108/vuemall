<template>
<!--  ref/children
如果是绑定在组件中的，那么通过this.$refs.refName 获取到的是一个组件对象
如果绑定在普通元素中，那么通过this.$refs.refName 获取到的是一个元素对象
-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      components:{
          BScroll
      },
      props:{
        probeType: {
          type: Number,
          default(){
            return 1
          }
        },
        pullUpLoad:{
          type: Boolean,
          default: false
        }
      },
      data(){
          return{
            scroll: null
          }
      },
      mounted() {
        //1.创建Bscroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
          prototype: this.probeType,
          click:true,
          pullUpLoad: this.pullUpLoad
        })
        //2.监听滚动位置
        if (this.probeType === 2 || this.probeType === 3){
          this.scroll.on('scroll', position=>{
            this.$emit('scroll',position)
          })
        }

        //3.监听scroll滚动到底部
        if (this.pullUpLoad){
          this.scroll.on("pullingUp",()=>{
            console.log('监听到底部');
            this.$emit("pullingUp")
          })
        }
      },
      methods:{
          //包装Home使用的回到顶部
          scrollTo(x,y,time=300){
             this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
          },
          //包装Home使用的重新计算页面高度
          refresh(){
            console.log('-----');
            this.scroll  && this.scroll.refresh()
          },
          //包装Home使用的刷新
          finishPullUp(){
            this.scroll.finishPullUp()
          },
      }
    }
</script>

<style scoped>

</style>
