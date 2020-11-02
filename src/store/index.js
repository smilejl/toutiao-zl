import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'user'

export default new Vuex.Store({
    state:{
      user: getItem(USER_KEY)
      // user:JSON.parse(Window.localStorage.getItem('user ')) //当前用户登录的状态（token等数据）

    },
    mutations:{
      setUser (state , data) {
        state.user = data
        //将token数据储存到本地，防止页面刷新数据丢失
        setItem(USER_KEY, state.user)
        // window.localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    actions:{
        
    },
    modules:{

    }
})