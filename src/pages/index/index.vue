<template>
  <div class="page-main" @click="clickHandle('test click', $event)">
    <div v-for="(item,index) in lists" :key="index">
      <post-item :item="item"></post-item>
    </div>
    <nav-bar :pageName="pageName"></nav-bar>
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import utils from '../../utils'
  import navBar from '@/components/nav-bar'
  import postItem from '@/components/post-item'
  export default {

    data() {
      return {
        pageName: 'home',
        lists:null
      }
    },

    components: {
      navBar,
      postItem
    },

    methods: {
    
      clickHandle(msg, ev) {
        console.log('clickHandle:', msg, ev)
      },
      get_index_list() {
        const self = this
        fly.post('/api/app/dabate-topic/list', {
            page: 1,
            pageSize: 30
          })
          .then(function (response) {
            if (response.retCode === 0) {
              //渲染列表
              self.lists = response.result
              self.lists.map(item => {
                if (!item.forwardCount) {
                  item.forwardCount = '转发'
                }
                if (!item.commentCount) {
                  item.commentCount = '评论'
                }
                item.createTime = utils.formatTime(new Date(item.createTime))
                return item
              })
              console.log(self.lists)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    onShow() {
      this.get_index_list()
    }
  }
</script>

<style scoped>
  .page-main {
    background: rgb(245, 246, 248);
    margin-bottom: 150rpx;
  }
</style>