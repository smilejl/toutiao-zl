import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//引入全局样式
import './styles/index.less'

//引入vant组件库
import Vant from 'vant'
//加载vant样式
import 'vant/lib/index.css'
//引入 REM适配基准值
import 'amfe-flexible'

import './api/dayjs.js'


Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
