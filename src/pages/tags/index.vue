<template>
  <div class="page-main">

    <canvas canvas-id='card-canvas' style="width:750rpx;height:600rpx; position: absolute; top:-700rpx; z-index:100;"></canvas>

    <div v-for="(item,index) in lists" :key="index">
      <post-item :item="item" pageName="tags" @onShare="onShare"></post-item>
    </div>
     <div class="nothing" v-if="lists.length < 1"></div>
    <share-page v-if="showShare" :shareData="shareData" @closeShare="closeShare"></share-page>
    <!-- <nav-bar :pageName="pageName"></nav-bar> -->
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
        pageName: 'tags',
        lists: [],
        nowPage: 1,
        share_img: '',
        shareData: {},
        showShare: false,
        tagId: 0

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
        fly.post('/api/app/dabate-topic/list/by-tag', {
            page: this.nowPage,
            pageSize: 30,
            debateTagId: this.tagId
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
    onLoad() {
      this.lists = []
      this.nowPage = 1
      this.tagId = this.$root.$mp.query.id
      this.get_index_list()
      wx.setNavigationBarTitle({
        title: this.$root.$mp.query.title
      })
    },

    created() {

    },
    onPullDownRefresh() {
      console.log(1)
      this.nowPage = 1
      this.get_index_list()
      wx.stopPullDownRefresh();
    },
    onShareAppMessage: function (opts) {
      let shareData = opts.target.dataset.share
      let self = this
      console.log(self.share_img)
      return {
        title: '你怎么看？',
        path: '/pages/index/main?id=' + shareData.id,
        imageUrl: self.share_img,
        success: function (res) {
          self.closeShare()
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
    padding-bottom: 200rpx;
    opacity: 1;
  }
</style>