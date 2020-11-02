<template>
  <van-cell class="article-item" :to="{
    name:'article',
    params:{
      articleId:article.art_id
    }
  }">
    <div slot="title" class="tilte">{{article.title}}</div>
    <div slot="label">
      <div
      v-if="article.cover.type === 3"
      class="cover-wrap"
      >
        <div
          class="cover-item-wrap"
          v-for="(img , index) in article.cover.images"
          :key="index">
              <van-image
              class="cover-item"
              
              fit="cover"
              :src="img"
              />
        </div>
        
      </div>
      <div class="cover-wrap-item">
        <span class="cover-wrap-item-span">{{article.aut_name}}</span>
        <span class="cover-wrap-item-span">{{article.comm_count}}</span>
        <span class="cover-wrap-item-span">{{article.pubdate | relativeTime }}</span>
      </div>
      
    </div>
    <van-image
      class="right-cover"
      v-if="article.cover.type === 1"
      height="73"
      width="116"
      fit="cover"
      :src="article.cover.images[0]"/>
  </van-cell>
  <!-- <div class="articleitem">
      文章列表项
  </div> -->
</template>

<script>

export default {
    name:"ArticleItem",
    data () {
      return {

      }
    },
    props:{
      article:{
        type: Object,
        required:true
      }
    }
}
</script>

<style scoped lang="less">
  .article-item{
    .title{
      font-size: 16px;
      color: #3a3a3a;
    }
    /deep/.van-cell__value{
      flex: unset;
      height: 73px;
      width: 116px;
      margin-left: 12px;
    }
    .right-cover{
      height: 73px;
      width: 116px;
    }
    .cover-wrap{
      padding: 15px 0;
      display: flex;
      .cover-item-wrap{
        flex: 1;
        height: 73px;
        &:not(:last-child){
          padding-right: 4px;
        }
        .cover-item{
          width: 100%;
          height: 70px;
        }
      }
    }
    .cover-wrap-item{
      font-size: 13px;
      .cover-wrap-item-span {
        padding-right: 12px;
      }
    }
  }
</style>