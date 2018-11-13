<template>
  <div class="page-main">

    <canvas canvas-id='card-canvas' style="width:750rpx;height:600rpx; position: absolute; top:-1900rpx; z-index:100;"></canvas>

    <div v-for="(item,index) in lists" :key="index">
      <post-item :item="item" pageName="home" @onShare="onShare"></post-item>
    </div>
    <share-page v-if="showShare" :shareData="shareData" @closeShare="closeShare"></share-page>
    <nav-bar :pageName="pageName"></nav-bar>
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import utils from '../../utils'
  import navBar from '@/components/nav-bar'
  import postItem from '@/components/post-item'
  import sharePage from '@/components/share'
  import { setTimeout } from 'timers';
  import mkimg from '../../utils/mkimg';
  export default {

    data() {
      return {
        pageName: 'home',
        lists: [],
        nowPage: 1,
        share_img: '',
        shareData: {},
        showShare: false

      }
    },

    components: {
      navBar,
      postItem,
      sharePage,
    },

    methods: {
      onShare(data) {
        this.showShare = true
        this.shareData = data
        //生成分享图片链接s
        const self = this
        mkimg.shareCard(data, function (url) {
          self.share_img = url
        })
      },
      closeShare() {
        this.showShare = false
        this.shareData = {}
      },
      clickHandle(msg, ev) {
        console.log('clickHandle:', msg, ev)
      },
      doShare() {

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



    },
    onLoad(query) {

      if (query.id) {
        //跳走
        let url = '/pages/detail/main?id=' + query.id
        wx.navigateTo({ url })
      }


      if (query.scene) {
        const scene = decodeURIComponent(query.scene)
        let id = scene.split("=")
        id = id[1]
        let url = '/pages/detail/main?id=' + id
        wx.navigateTo({ url })
      }
    },

    created() {
      this.lists = []
      this.nowPage = 1
      this.get_index_list()
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
      let self = this
      console.log(self.share_img)
      return {
        title: '你怎么看？',
        path: '/pages/index/main?id=' + shareData.id,
        imageUrl: self.share_img,
        success: function (res) {
         
          let url = '/api/app/dabate-topic/forward'
          let data = {
            debateTopicId: shareData.id
          }
          fly.post(url, data).then(data => {
            console.log(data)
          })
           self.closeShare()

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
    padding-bottom: 200rpx;
    opacity: 1;
  }
</style>