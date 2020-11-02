<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- form标签用于移动端显示键盘的搜索按钮 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      >
      </van-search>
    </form>
    
     <!-- 搜索结果栏 -->
    <search-result v-if="isResultShow" :search-text="searchText"></search-result>

    <!-- 联想建议栏 -->
    <search-suggestion
    v-else-if="searchText"
    :search-text="searchText"
    @search="onSearch"
    ></search-suggestion>

    <!-- 历史记录栏 -->
    <search-history
    v-else :searchHistories="searchHistories"
    @search='onSearch'
    @update-histories="searchHistories=$event"
    ></search-history>

   

  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'

import { setItem , getItem} from '@/utils/storage'
import { getHistories } from '@/api/search'


export default {
    name: 'searchIndex',
    components:{
      SearchSuggestion,
      SearchHistory,
      SearchResult
    },
    data () {
        return {
          searchText: '',//搜索框的内容，默认空
          isResultShow:false,//控制搜索历史，搜索联想，搜索结果的显示状态
          searchHistories:getItem('search-histories') || [] //搜索历史记录
        }
    },
    methods: {
      //search 事件在点击键盘上的搜索/回车按钮后触发
      onSearch (searchText) {
        this.searchText = searchText
        //记录搜索历史
        const index = this.searchHistories.indexOf(searchText)
        if(index !==-1){
          //index表示新记录的索引，和数组里的索引进行判断，如果不等于-1表示有重复
          //把重复项删除
          this.searchHistories.splice(index,1)
        }

        this.searchHistories.unshift(searchText)

        //如果没有登录，将历史记录存储到本地
        // ..
        //点击搜索、回车时触发搜索结果，展示
        this.isResultShow = true
      },
      //cancel 事件在点击搜索框右侧取消按钮时触发
      // onCancel () {

      // }
    },
    watch :{
      //监视搜索历史记录的变化，储存到本地
      searchHistories () {
        setItem('search-histories',this.searchHistories)
      }
    },
    async created () {
      const { data } = await getHistories ()
    }
}
</script>

<style scoped lang='less'>

</style>