<template>
      <div id="home">
        <nav-bar class="home-nav" activeColor="pink"><div slot="center">购物街</div></nav-bar>
        <tab-control
          :titles="['流行','新款','精选']"
          @control-cilck="controlData"
          ref="tabControl1"
          class="tab-control"
          v-show="isTabFixed"
        >
        </tab-control>
        <!--包装一个scroll组件把需要用到滑动的组件包裹一下-->
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="LoadMore"
                >
          <home-swiper :banners="banners" @SwiperImageLoad="SwiperImageMore"></home-swiper>
          <home-recommend-view :recommends="recommends"></home-recommend-view>
          <feature-view></feature-view>
          <tab-control
            :titles="['流行','新款','精选']"
            @control-cilck="controlData"
          ref="tabControl2"
          >
          </tab-control>
          <goods-list :goods="getGoodList"></goods-list>
        </scroll>
        <!--监听组件的点击事件-->
        <back-top @click.native="backClick" v-show ="isShowBackTop"></back-top>
      </div>
</template>

<script>

//业务组件组件
import HomeSwiper from "@views/home/childComps/HomeSwiper";
import HomeRecommendView from "@views/home/childComps/HomeRecommendView";
import FeatureView from "@views/home/childComps/FeatureView";

//公共组件
import NavBar from "@components/common/navbar/NavBar";
import TabControl from "@components/content/tabControl/TabControl";
import GoodsList from "@components/content/goods/GoodsList";
import Scroll from "@components/common/scroll/Scroll";
import BackTop from "@components/content/backTop/BackTop";


//子组件
import {
  getHomeMultidata,
  getHomeGoods
} from "@network/home";
import {itemListenerMixin} from '@commonjs/mixin'


    export default {
      name: "Home",
      mixins:[itemListenerMixin],
      components: {
        NavBar,
        TabControl,
        HomeSwiper,
        HomeRecommendView,
        FeatureView,
        GoodsList,
        Scroll,
        BackTop

      },
      computed: {
        getGoodList(){
          return this.goods[this.currentType].list
        }
      },
      data(){
        return{
          banners:[],
          recommends:[],
          goods: {
            'pop':{page: 0, list:[]},
            'new':{page: 0, list:[]},
            'sell':{page: 0, list:[]},
          },
          currentType: 'pop',
          isShowBackTop: false,
          tabOffsetTop: 0,
          isTabFixed: false,
          saveHomeY: 0,
        }
      },
      //组件创建完毕后回调函数
      created() {
        //1.请求多个数据（banner和推荐）
        this.getHomeMultidata()

        //2.请求商品数据
        Object.keys(this.goods).forEach((key) =>{
          // console.log(key)
          this.getHomeGoods(key)
        })

      },
      mounted() {
      //已经使用混入的方式完成了mounted对图片加载完成的监控事件
      },
      //处于活跃时的状态
      activated(){
        this.$refs.scroll.scrollTo(0,this.saveHomeY,0)
        this.$refs.scroll.refresh()
      },
      //处于离开后的状态
      deactivated() {
        //1.保存我们的y值
        this.saveHomeY = this.$refs.scroll.getScrollY()

        //2.取消全局事件的监听
        this.$bus.$off('itemImgLoad',this.itemImgListener)
      },
      methods:{
        //网络请求相关方法
        getHomeMultidata(){
          getHomeMultidata()
            .then( result =>{
              this.banners = result.data.banner.list;
              this.recommends = result.data.recommend.list;
            }).catch(err =>{
            console.log(err)
          })
        },
        getHomeGoods(type){
          const page = this.goods[type].page +1;
          getHomeGoods(type,page)
            .then( result =>{
              // console.log(result)
              //通过...result.data.list可以把数组内部的元素通过解构的方式一个一个传进去
              this.goods[type].list.push(...result.data.list);
              this.goods[type].page += 1

              //每次上拉加载更多后，清空一下finishPullUp方法
              this.$refs.scroll.finishPullUp()
            })
            .catch( err =>{
              console.log(err)
            })
        },
        //事件监听相关方法
        controlData(index){
          // console.log(index)
          switch (index) {
            case 0:
              this.currentType = 'pop';
              break
            case 1:
              this.currentType = 'new';
              break
            case 2:
              this.currentType = 'sell';
              break
          }
          //让两个相同的组件点击事件保持一致
          if (this.$refs.tabControl1 !== undefined){
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
          }

        },
        backClick(){
          // console.log('组件点击事件监听到了')
          //通过refs对象拿到scroll并调用scrollTo方法回到顶部（0，0，延迟）
          //this.$refs.scroll拿到的是一个scroll组件对象，再.scroll拿到组件内部定义的scroll变量，再通过.scrollTo调用变量的方法
          // this.$refs.scroll.scroll.scrollTo(0,0,500)
          this.$refs.scroll.scrollTo(0,0,1000)
        },

        //监听banner图片加载完毕,获取offsetTop值
        SwiperImageMore(){
          // console.log(this.$refs.tabControl2.$el.offsetTop);
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },

        //监听到滚动到底部
        LoadMore(){
          this.getHomeGoods(this.currentType)
        },

        //scroll滚动事件监听Home组件滚动位置
        contentScroll(position){
          //1.判断backTop是否显示
          this.isShowBackTop = (-position.y) > 1000

          //2。决定tabControl是否吸顶（position: fixe）
          this.isTabFixed = (-position.y) > this.tabOffsetTop

        },
      }

    }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    /*相对定位*/
    position: relative;
  }
  .home-nav {
    background-color:  var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /*调整可滚动区域方案一*/
  .content{
    overflow: hidden;
    /*绝对定位*/
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*调整可滚动区域方案二*/
  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/

</style>
