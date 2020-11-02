import axios from "axios"
//在非组件模块中获取 store 必须使用这种方法 ，先导入，后调用
//这里单独加载 store 和组件中使用$store是一样的效果
import store from '@/store/'
import JSONbig from 'json-bigint'


const request = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/", //基础路径
    transformResponse: [function (data) {
        try {
            return JSONbig.parse(data)
        } catch (err) {
            console.log('转换失败')
            return data
        }
    }]
})


//请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { user } = store.state
    //如果用户已经登录，统一设置 token 信息
    if(user){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    
    //处理完请求后，一定要把config返回出去，否则请求会一直停在这里
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
})


export default request

