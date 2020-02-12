import axios from "axios";

export function request(config) {
  const instance = axios.create({
    //http://123.207.32.32:8000/api/hy/recommend
    // baseURL:"http://123.207.32.32:8000/api/hy",
    baseURL:"http://106.54.54.237:8000/api/hy",

    timeout: 10000,
  })
  instance.interceptors.request.use(
    config =>{
      // console.log(config)
      return config
  },
    error => {
      // console.log(error)
      return error
    })
  instance.interceptors.response.use(
    config => {
      // console.log(config)
      return config.data
    },
    error => {
        // console.log(error)
        return error
    })
  return instance(config)
}
