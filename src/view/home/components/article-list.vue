<template>
  <div class="article-list">
    <van-pull-refresh
        v-model="isPullDownLoading"
        @refresh="onRefresh"
        success-text="刷新成功"
    >
        <van-list
            class="article-list-item"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <article-item
            v-for="(article , index) in articles"
            :key="index"
            :article="article"
            />
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/articles'
import ArticleItem from '@/components/article-item'

export default {
    name:'ArticleList',
    data(){
        return{
            articles: [],
            loading: false,//
            finished: false,//加载数据结束，
            timestamp: null,//获取下一页文章的时间戳
            isPullDownLoading: false//控制下拉刷新
        }
    },
    components:{
        ArticleItem
    },
    props:{
        channel:{
            type: Object,
            required: true
        }
    },
    methods:{
      async onLoad () {
      // 1请求获取数据
       
        const { data } = await getArticles({
          channel_id:this.channel.id,//频道ID
          timestamp: this.timestamp || Date.now(),//时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1,//是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
      // 2把数据放入数组中
      const { results } = data.data
      this.articles.push(...results)
      // 3设置本次加载状态结束，他才可以继续判断是否还要再加载下一次，否则会一直停在这里
      this.loading = false
      // 4数据全部加载完成
      if(results.length){
          this.timestamp = data.data.pre_timestamp
      } else {
          this.finished = true
        }
      },
      async onRefresh () {
            const { data } = await getArticles({
                channel_id:this.channel.id,//频道ID
                timestamp: Date.now(),
                with_top: 1,
                })
            this.articles.unshift(...data.data.results)
            this.isPullDownLoading = false
        }
    }
}
</script>

<style scoped lang="less">
    .article-list-item{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 50px;
        top: 90px;
        overflow-y: auto;
    }
</style>