import {debounce} from "./utils";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null,
      newRefresh: null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh,600)
    this.itemImgListener = () =>{
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  },

}
