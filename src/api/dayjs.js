//配置日期相关模块
import Vue from 'vue'
import dayjs from 'dayjs'
//导入中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

//全局使用





//配置使用相对时间
dayjs.extend(relativeTime)


dayjs.locale('zh-cn')
//把处理相对时间的代码包装成一个全局过滤器函数
//可以再任何地方调用的函数
//在模板中使用过滤器： {{ xxx | relativetime }}
//管道符前面的内容会作为参数传递给过滤器函数
//过滤器的返回值会渲染到使用过滤器的模板中
Vue.filter('relativeTime', value =>{
    return dayjs(value).from(dayjs())
})


