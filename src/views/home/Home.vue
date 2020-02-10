<template>
      <div id="home">
        <nav-bar class="home-nav" activeColor="pink"><div slot="center">购物街</div></nav-bar>
        <home-swiper :banners="banners"></home-swiper>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" @control-cilck="controlData" ></tab-control>
        <goods-list :goods="getGoodList"></goods-list>
        <ul>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
          <li>aaa</li>
        </ul>
      </div>
</template>

<script>

//公共组件
import HomeSwiper from "@views/home/childComps/HomeSwiper";
import HomeRecommendView from "@views/home/childComps/HomeRecommendView";
import FeatureView from "@views/home/childComps/FeatureView";

//业务组件
import NavBar from "@components/common/navbar/NavBar";
import TabControl from "@components/content/tabControl/TabControl";
import GoodsList from "@components/content/goods/GoodsList";

//子组件
import {
  getHomeMultidata,
  getHomeGoods
} from "@network/home";

    export default {
      name: "Home",
      components: {
        NavBar,
        TabControl,
        HomeSwiper,
        HomeRecommendView,
        FeatureView,
        GoodsList
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
          currentType: 'pop'
        }
      },
      //组件创建完毕后回调函数
      created() {
        //1.请求多个数据（banner和推荐）
        this.getHomeMultidata()

        // 2.请求商品数据
        Object.keys(this.goods).forEach((key) =>{
          // console.log(key)
          this.getHomeGoods(key)
        })
        // this.getHomeGoods('pop')

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
              this.goods[type].list.push(...result.data[type].list);
              this.goods[type].page += 1
            })
            .catch( err =>{
              console.log(err)
            })
        },
        //事件监听相关方法
        controlData(index){
          console.log(index)
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
        }
      }

    }
</script>

<style scoped>
  #home {
    padding-top: 44px;
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
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
