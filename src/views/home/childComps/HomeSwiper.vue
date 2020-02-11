<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="SwiperImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "@components/common/swiper"

  export default {
    name: "HomeSwiper",
    components:{
      Swiper,
      SwiperItem
      },
    props:{
      banners:{
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoad: true
      }
    },
    methods:{
      SwiperImageLoad(){
        if (this.isLoad){
          this.$emit('SwiperImageLoad')
          this.isLoad = false
        }

      }
    }
  }
</script>

<style scoped>

</style>
