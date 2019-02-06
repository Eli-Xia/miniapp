<template>
  <div class="counter-warp" style="padding-bottom:120rpx">

    <div class="item-box" v-for="(item,index) in lists" :key="index">
      <div class="item-top">

        <div class="face" @click="goTa(item.userId)">
          <div class="msg-dot" v-if="item.hasRead == 0"></div>
          <img :src="item.headImgUrl" />
        </div>

        <div class="name-date" @click="goTa(item.userId)">
          <div class="nickname">{{item.nickname}}</div>
          <div class="add-date">{{item.createTime}}</div>
        </div>
      </div>
      <div class="item-mid" @click="goTo(item.debateTopicId)">
        <p :style="item.commentContent == '该评论已删除'  ? 'color:rgb(176, 178, 196)' :''"> <span class="r-name" v-if="item.replyCommentContent">回复我的：</span>{{item.commentContent}}</p>
      </div>




      <div class="item-bottom" @click="goTo(item.debateTopicId)" :style="item.debateTopic.length > 60 ? 'margin-bottom:20rpx': ''">

        <p v-if="!item.replyCommentContent">{{item.debateTopic}}</p>
        <div v-if="item.replyCommentContent">
          <p class="rep-text">{{item.replyCommentContent}}</p>
          <div class="bianti-box">
            {{item.debateTopic}}
          </div>
        </div>
      </div>


    </div>



    <div class="nothing" v-if="lists.length < 1"></div>
    <!-- <nav-bar :pageName="pageName"></nav-bar> -->
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import utils from '../../utils'
  export default {
    data() {
      return {
        pageName: 'my-msg-ping',
        lists: [],
        nowPage: 1
      }
    },

    components: {

    },
    methods: {
      get_list() {
        fly.post('/api/app/msg/list/comment', {
          page: this.nowPage,
          pageSize: 30
        }).then(res => {
          if (res.retCode == 0) {
            res.result.map(item => {
              item.createTime = utils.formatTime(new Date(item.createTime))

              item.debateTopic = item.debateTopic.substr(0, 40)
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
      goTa(id) {
        if (id) {
          let url = '/pages/ta/main?id=' + id
          wx.navigateTo({ url })
        }
      },
      goTo(id) {
        if (id) {
          let url = '/pages/detail/main?id=' + id
          wx.navigateTo({ url })
        }
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
        title: '评论我的'
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
  .item-box {
    margin: 10rpx 0;
    border-radius: 0rpx;
    background: #FFF;
    padding-bottom: 30rpx;
  }

  .item-box .item-top {
    padding: 24rpx;
    position: relative;
  }

  .item-top .face {
    width: 72rpx;
    height: 72rpx;
    float: left;
    position: relative;
  }

  .item-top .face img {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
  }

  .item-top .name-date {
    float: left;
    margin-left: 11rpx;
    line-height: 30rpx;
    margin-top: 8rpx;
  }

  .item-mid {
    clear: both;
    font-size: 28rpx;
    color: rgb(26, 26, 28);
    padding: 24rpx 52rpx;
    line-height: 32rpx;
  }



  .nickname {
    font-size: 24rpx;
    color: rgb(158, 160, 181);

  }

  .add-date {
    font-size: 22rpx;
    color: #b0b2c4;
  }

  .item-bottom {
    padding: 22rpx;
    border-radius: 10rpx;
    margin: 0 30rpx;
    font-size: 28rpx;
    line-height: 32rpx;
    background: rgb(245, 246, 248);
    color: rgb(176, 178, 196);


  }

  .like-btn.close-btn {

    float: right;
    text-align: left;
    padding-left: 0rpx;
    font-size: 24rpx;
    height: 24rpx;
    margin-right: 6rpx;
    width: 24rpx;
    margin-top: 30rpx;
    background: url(../../../static/img/close1@2x.png) no-repeat;
    background-size: auto 100%;
    color: rgb(176, 178, 196);
  }

  .btn-group {
    width: 110rpx;
    margin: 0 auto;
  }

  .no-pass {
    position: absolute;
    width: 160rpx;
    height: 40rpx;
    background: rgb(244, 67, 54);
    color: #FFF;
    font-size: 20rpx;
    text-align: center;
    line-height: 40rpx;
    right: 72rpx;
    top: 44rpx;
    border-radius: 20rpx;
  }

  .msg-dot {
    width: 13rpx;
    height: 13rpx;
    background: rgb(241, 44, 32);
    border-radius: 50%;
    position: absolute;
    left: -18rpx;
    top: 32rpx;
  }

  .bianti-box {
    background: #FFF;
    border-radius: 10rpx;
    padding: 23rpx 12rpx;
    margin-top: 23rpx;
    font-size: 28rpx;
    margin-left: -8rpx;
    margin-right: -8rpx;
  }

  span.h-name {
    color: rgb(41, 182, 246);
  }

  span.r-name {
    color: rgb(158, 160, 181);
  }

  .rep-text {
    color: rgb(26, 26, 28);
  }
</style>