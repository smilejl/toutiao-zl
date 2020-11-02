<template>
  <div class="result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
      v-for="(article, index) in list"
      :key="index"
      :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getResults } from '@/api/search'

export default {
    name:"SearchResult",
    data () {
        return {
          list: [],
          loading: false,
          finished: false,
          page: 1,
          per_page: 10
        }
    },
    props: {
      searchText:{
        type:String,
        required:true
      }
    },
    methods: {
         async onLoad () {
          // 异步更新数据
          const { data } = await getResults({
            page: this.page,//页码
            per_page: this.per_page,//每页大小
            q: this.searchText// 搜索字符
          })
          //console.log(data)
          //将数据放入列表中
          const { results } = data.data
          this.list.push(...results)
          
          //关闭本次loading状态
          this.loading = false
          //判断是否还有数据
          if(results.length){
            this.page++
          } else {
            this.finished = true
          }
          //如果有，请求下一页数据，如果没有，将finshed设置为true,关闭加载更多

        }
    },
}
</script>

<style scoped lang="less">
  .result{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y:auto;
  }
</style>