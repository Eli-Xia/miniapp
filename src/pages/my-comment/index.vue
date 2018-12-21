<template>
  <div class="counter-warp" style="padding-bottom:120rpx">
    <my-comment-item @dels="del" :pageName="pageName" :item="item" v-for="(item,index) in lists" :key="index"></my-comment-item>
     <div class="nothing" v-if="lists.length < 1"></div>
    <!-- <nav-bar :pageName="pageName"></nav-bar> -->
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import utils from '../../utils'
  import navBar from '@/components/nav-bar'
  import myCommentItem from '@/components/my-comment-item'
  export default {
    data() {
      return {
        pageName: 'my-comment',
        lists: [],
        nowPage: 1
      }
    },

    components: {
      navBar,
      myCommentItem
    },
    methods: {
      get_list() {
        fly.post('/api/app/comment/list-my', {
          page: this.nowPage,
          pageSize: 30
        }).then(res => {
          if (res.retCode == 0) {
            res.result.map(item => {
              item.createTime = utils.formatTime(new Date(item.createTime))
              if(item.content.length > 78) {
                item.content = item.content.substr(0,78)+'...'
              }

              if(item.debateTopic.length > 78) {
                item.debateTopic = item.debateTopic.substr(0,78)+'...'
              }
              if (this.nowPage < 1) {
                self.lists.push(item)
              }
            })
            if (this.nowPage == 1) {
              this.lists = res.result
            }

          } else if (retCode == 2) {

          } else {
            console.log(res)
          }
        })
      },
      del(id) {
        const self = this
        wx.showModal({
          title: '提示',
          content: '确定要删除评论？',
          confirmText: '确定',
          cancelText: '取消',
          success(res) {
            // 点击一键登录，去授权页面
            if (res.confirm) {

              fly.post('/api/app/comment/delete-my', {
                id: id
              }).then(data => {
                if (data.retCode == 0) {
                  wx.showToast({
                    title: '删除成功！',
                    icon: 'right'
                  })
                  setTimeout(() => {
                    self.get_list()
                  })

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
      this.get_list()
    },
    created() {

    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: '我的评论'
      })
    },
    onReachBottom: function () {
      this.nowPage += 1
      this.get_list()
    },
    onPullDownRefresh() {
      console.log(1)
      this.nowPage = 1
      this.get_list()
      wx.stopPullDownRefresh();
    },


  }
</script>

<style scoped>
  .my-card {
    height: 245rpx;
    background: #FFF;
    border-radius: 10rpx;
    margin: 30rpx;
  }

  .my-card .face-name {
    padding-top: 34rpx;
    margin-left: 32rpx;
    width: 180rpx;
  }

  .my-card .face {
    width: 100rpx;
    height: 100rpx;
    padding-bottom: 26rpx;
  }

  .my-card .name {
    width: 190rpx;
    height: 190rpx;
    font-size: 29rpx;
    color: rgb(26, 26, 28)
  }

  .my-card .face img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .my-card .like {
    float: right;
    padding-right: 40rpx;
    padding-top: 70rpx;
  }

  .my-card .like .like-count {
    font-size: 60rpx;
    color: rgb(117, 122, 151);
    font-family: Arial, Helvetica, sans-serif;
    text-align: right;
    font-weight: bold;

  }

  .my-card .like .like-icon {
    height: 32rpx;
    color: rgb(176, 178, 196);
    font-size: 28rpx;
    width: 78rpx;
    padding-left: 32rpx;
    text-align: right;
    padding-top: 12rpx;
    background: url(../../../static/img/灰赞@2x.png) 10rpx 13rpx no-repeat;
    background-size: auto 80%;
  }

  .my-post {
    background: #FFF;
    border-radius: 10rpx;
    margin: 30rpx;
    padding: 36rpx 25rpx;
  }

  .my-post-title {
    height: 38rpx;
    width: 200rpx;
    background: url(../../../static/img/辩题@2x.png) 10rpx 4rpx no-repeat;
    background-size: auto 90%;
    font-size: 28rpx;
    line-height: 40rpx;
    padding-left: 66rpx;
    color: rgb(26, 26, 28);
  }

  .my-post-icon {
    float: right;
    height: 25rpx;
    width: 14rpx;
    margin-top: 10rpx;
    background: url(../../../static/img/箭头@2x.png) right 0rpx no-repeat;
    background-size: 100% 100%;
  }

  .my-comment-title {
    height: 38rpx;
    width: 200rpx;
    background: url(../../../static/img/评论@2x.png) 10rpx 4rpx no-repeat;
    background-size: auto 90%;
    font-size: 28rpx;
    line-height: 40rpx;
    padding-left: 66rpx;
    color: rgb(26, 26, 28);
  }
</style>