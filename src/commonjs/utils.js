//防抖函数处理
export function debounce(func,delay){
  let timer = null;
  return function (...args) {
    // console.log(timer)
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
