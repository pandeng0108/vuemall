<template>
<!--  ref/children
如果是绑定在组件中的，那么通过this.$refs.refName 获取到的是一个组件对象
如果绑定在普通元素中，那么通过this.$refs.refName 获取到的是一个元素对象
-->
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      data(){
        return{
          _scroll: null
        }
      },
      components:{
          BScroll
      },
      props:{
        probeType: {
          type: Number,
          default: 0
        },
        pullUpLoad:{
          type: Boolean,
          default: false
        }
      },

      mounted() {
        //1.创建Bscroll对象
        this._scroll = new BScroll(this.$refs.wrapper,{
          pullUpLoad: this.pullUpLoad,
          prototype: this.probeType,
          click:true,
        })


        //2.监听scroll滚动到底部
        if (this.pullUpLoad){
          this._scroll.on("pullingUp",()=>{
            // console.log('监听到底部');
            this.$emit("pullingUp")
          })
        }

        //2.监听滚动位置
        this._scroll.on('scroll', (position) => {
          console.log(position)
          this.$emit('scroll', position)
        })
      },
      methods:{
          //包装Home使用的回到顶部
          scrollTo(x,y,time=300){
             this._scroll && this._scroll.scrollTo && this._scroll.scrollTo(x,y,time)
          },
          //包装Home使用的重新计算页面高度
          refresh(){
            // console.log('-----');
            this._scroll  && this._scroll.refresh && this._scroll.refresh()
          },
          //包装Home使用的刷新
          finishPullUp(){
            this._scroll && this._scroll.finishPullUp()
          },
          //获取scroll的Y值
          getScrollY(){
            return this._scroll? this._scroll.y : 0
          }
      }
    }
</script>

<style scoped>

</style>
