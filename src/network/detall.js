import {request} from './request'


export function getDetail(iid) {
  return request({
    url:'/detail',
    params: {
      iid,
    }
  })
}
export function getRecommend() {
  return request({
    url:'/recommend',
  })
}
//面向对象封装：商品详情页
export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}
//商品商家
export class GoodsShop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
//商品参数
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
//商品参数
export class GoodsCommentInfo {
  constructor(list) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
      this.canExplain = list.canExplain;
      this.content = list.content;
      this.created = list.created;
      this.user = list.user;
      this.style = list.style;
      this.images = list.images;
  }
}
