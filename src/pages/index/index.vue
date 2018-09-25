<template>
  <div class="page-main" @click="clickHandle('test click', $event)">
    <div v-for="(item,index) in lists" :key="index">
      <post-item :item="item" pageName="index"></post-item>
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
        lists: [],
        nowPage: 1
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
            page: this.nowPage,
            pageSize: 30
          })
          .then((response) => {
            if (response.retCode === 0) {
              //渲染列表

              response.result.map((item, index) => {
                if (!item.forwardCount) {
                  item.forwardCount = '分享'
                }
                if (!item.commentCount) {
                  item.commentCount = '评论'
                }
                item.createTime = utils.formatTime(new Date(item.createTime))
                if (this.nowPage > 1) {
                  self.lists.push(item)
                }
              })
              if (this.nowPage == 1) {
                self.lists = response.result
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    onShow() {
      this.lists = []
      this.nowPage = 1
      this.get_index_list()

    },
    created() {
      // this.get_index_list()
    },
    onPullDownRefresh() {
      console.log(1)
      this.nowPage = 1
      this.get_index_list()
      wx.stopPullDownRefresh();
    },
    onShareAppMessage: function (opts) {
      let shareData = opts.target.dataset.share
      console.log(shareData)
      return {

        title: shareData.debateTopic,

        path: '/pages/detail/main?id=' + shareData.id,
        imageUrl: shareData.headImgUrl,
        success: function (res) {
          let url = '/api/app/dabate-topic/forward'
          let data = {
            debateTopicId: shareData.id
          }
          fly.post(url, data)

        },
        fail: function (e) {
          console.log(e)
        }


      }

    },
    onReachBottom: function () {
      this.nowPage += 1
      this.get_index_list()
    }
  }
</script>

<style scoped>
  .page-main {
    background: rgb(245, 246, 248);
    margin-bottom: 250rpx;
  }
</style>