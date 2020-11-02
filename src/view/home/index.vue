<template>
  <div class="home-container">
     <van-nav-bar class="navbar">
       <van-button
       class="search-btn"
       slot="title"
       icon="search"
       type="info"
       round
       size="small"
       to="/search"
       >搜索</van-button>
      </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab
      v-for="channel in channels"
      :key="channel.id"
      :title="channel.name"
      >
      <article-list :channel= "channel" />
      </van-tab>
      <div class="wap-nav-right" slot="nav-right"></div>
      <van-popup
      v-model="isShowPop"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      >
        <channel-edit
        :active="active"
        :user-channels = 'channels'
        @close="isShowPop = false"
        @update-active="onUpdateActive"
        >
        <!-- @update-active="onUpdateActive" 
        在这个函数中的参数可以写成 @update-active="active = $event"
        $event为事件参数，表示传过来的index，就可以不在methods中写函数，优化代码
         -->
        </channel-edit>
      </van-popup>
      <div
      class="nav-right"
      slot="nav-right"
      @click="isShowPop = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getLoadChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name:"home",
  components:{
    ArticleList,
    ChannelEdit
  },
  data(){
    return{
      active: 0,//控制被激活的标签
      channels:[],
      isShowPop:false
    }
  },
  created(){
    this.loadChannels()
  },
  methods:{
    async loadChannels(){
      let channels = []
      if (this.user) {
        //已登录，获取线上频道列表数据
        const { data } = await getLoadChannels()
        channels = data.data.channels
      } else {
        //未登录，判断本地是否有频道数据
        const localChannels = getItem('user-channels')

        //如果有本地数据，则使用
        if (localChannels) {
          channels = localChannels
        } else {
          //用户未登录，本地也没有数据，则请求默认的推荐频道列表
          const { data } = await getLoadChannels()
          channels = data.data.channels
        }
      }
      // 把处理 好的数据放到data中使用
      this.channels = channels
    },
    onUpdateActive (index) {
      this.active = index
    }
  },
 
  computed:{
    ...mapState(['user'])
  },

}
</script>

<style scoped lang="less">
  .home-container{
    .navbar{
      background-color: aqua;
    }
    /deep/.van-nav-bar__title{
      max-width: none;
    }
    .search-btn{
    width: 277px;
    height: 32px;
    }
    .nav-right{
      position: flxed;
      right: 0;
      width: 33px;
      height: 44px;
      display: flex;
      opacity: .9;
      align-items: center;
      background-color: #fff;
      .van-icon{
        font-size: 30px;
        //padding-top:5px ;
        
      }
      .wap-nav-right{
        width: 33px;
        flex-shrink: 0;
      }
    }
  }
  
</style>