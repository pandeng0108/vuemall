import {request} from './request'

export function getHomeMultidata(){
  return request({
    url:'/home',
  })
}


export function getHomeGoods(type,page) {
  return request({
    url:'/home/goods',
    params: {
      type,
      page
    }
  })
}
