import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL:'http://127.0.0.1:8888',
    timeout: 5000,
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
