<template>
  <div class="page-main" @click="clickHandle('test click', $event)">
    <div v-for="(item,index) in lists" :key="index">
      <post-item @dels="del" :item="item" pageName="my-post"></post-item>
    </div>
    <!-- <nav-bar :pageName="pageName"></nav-bar> -->
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import utils from '../../utils'
  import navBar from '@/components/nav-bar'
  import postItem from '@/components/post-item'
import { setTimeout } from 'timers';
  export default {

    data() {
      return {
        pageName: 'my-post',
        lists: null
      }
    },

    components: {
      navBar,
      postItem
    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: '我的辩题'
      })
    },

    methods: {

      clickHandle(msg, ev) {
        console.log('clickHandle:', msg, ev)
      },
      get_index_list() {
        const self = this
        fly.post('/api/app/dabate-topic/list-my', {
            page: 1,
            pageSize: 30
          })
          .then(function (response) {
            if (response.retCode === 0) {
              //渲染列表
              self.lists = response.result
              self.lists.map(item => {
                if (!item.forwardCount) {
                  item.forwardCount = '分享'
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
      },
      del(id) {
        const self = this
        wx.showModal({
          title: '提示',
          content: '确定删除辩题吗？',
          confirmText: '确定',
          cancelText: '取消',
          success(res) {
            // 点击一键登录，去授权页面
            if (res.confirm) {

              fly.post('/api/app/dabate-topic/delete-my', {
                id: id
              }).then(data => {
                if (data.retCode == 0) {

                  wx.showToast({
                    title: '删除成功！',
                    icon: 'right'
                  })
                  setTimeout(()=>{
                    self.get_index_list()
                  },1000)
                  
                } else {
                  wx.showToast({
                    title: data.retMsg,
                    icon: 'error'
                  })
                }
              })

            }
          }
        })

      }
    },
    onShow() {
      this.get_index_list()
    },
    created() {
      // this.get_index_list()
    },
    onPullDownRefresh() {

      this.get_index_list()
      wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
      this.nowPage += 1
      this.get_index_list()
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
  }
</script>

<style scoped>
  .page-main {
    background: rgb(245, 246, 248);
    margin-bottom: 150rpx
  }
</style>