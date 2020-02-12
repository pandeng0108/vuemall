<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="GoodsInfo"></detail-base-info>
      <detail-shop-info :shop="GoodsShop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-params-info :paramInfo="paramsInfo" ref="param"></detail-params-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "@views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@views/detail/childComps/DetailShopInfo";
  import DetailGoodsInfo from "@views/detail/childComps/DetailGoodsInfo";
  import DetailParamsInfo from "@views/detail/childComps/DetailParamsInfo";
  import DetailCommentInfo from "@views/detail/childComps/DetailCommentInfo";
  import Scroll from '@components/common/scroll/Scroll'
  import {getDetail, GoodsInfo, GoodsShop, GoodsParam, GoodsCommentInfo, getRecommend} from "@network/detall";
  import GoodsList from "@components/content/goods/GoodsList";
  import {itemListenerMixin} from "@commonjs/mixin";
  import {debounce} from "@commonjs/utils";

  export default {
    name: "Detail",
    components: {
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      Scroll,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        GoodsInfo: {},
        GoodsShop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    mixins: [itemListenerMixin],
    created() {
      //获取iid
      this.iid = this.$route.params.iid
      //获取详情数据
      getDetail(this.iid)
        .then(result => {
          // console.log(result)
          const data = result.result
          //1.获取顶部商品图片
          this.topImages = data.itemInfo.topImages

          //2.获取商品信息
          this.GoodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

          //3.获取商品商家
          this.GoodsShop = new GoodsShop(data.shopInfo)

          //4.获取商品详细信息
          this.detailInfo = data.detailInfo

          //5.获取商品参数信息
          this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          //6.获取商品评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = new GoodsCommentInfo(data.rate.list[0])
          }
          //1。第一次获取，值不对
          //值不对的原因：this.$refs.params.$el还没有开始渲染
          // this.themeTopYs =[]
          // this.themeTopYs.push(0)
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTopYs)
          //渲染完成后调用此函数
          // this.$nextTick(()=>{
          // 2。第二次获取，根据最新的数据，对应的DOM是已经被渲染出来
          // 但是图片依然是没有加载完
          //   this.themeTopYs =[]
          //   this.themeTopYs.push(0)
          //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          //   console.log(this.themeTopYs)
          // })

        }).catch(err => {
        console.log(err)
      })
      //请求推荐数据
      getRecommend().then(result => {
        // console.log(result)
        this.recommends = result.data.list
      })
      //给getThemeTopY赋值
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)
      },100)
    },
    mounted() {
      //已经使用混入的方式完成了mounted对图片加载完成的监控事件
    },
    destroyed() {
      // this.$bus.$off('itemImgLoad', this.itemImgListener)
    },

    methods: {
      detailImageLoad() {
        // this.$refs.scroll.refresh()
        this.newRefresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },

      contentScroll(position){
        console.log(position);
        //1.获取y值
        const posiY = -position.y
        //2.posiY与主题中的值进行对比
        //【0，7938，9120，9452】
        // posiY在0和7938之间，index=0
        // posiY在7938和9120之间，index=1
        // posiY在9120和9452之间，index=2
        // posiY超过9452之间，index=3
        let length = this.themeTopYs.length
        for(let i in this.themeTopYs){
          i = i*1
          if ((this.currentIndex !==i ) && ((i > length-1 && posiY >= this.themeTopYs[i] && posiY < this.themeTopYs[i+1]) || (i===length-1 && posiY >= this.themeTopYs[i]))){
            this.currentIndex =i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      }
    }
  }
</script>

<style scoped>

  /*.detail-nav {*/
  /*  position: relative;*/
  /*  z-index: 9;*/
  /*  background-color: #fff;*/
  /*}*/

  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    background-color: #fff;
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }

</style>
