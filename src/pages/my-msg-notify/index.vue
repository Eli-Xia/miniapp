<template>
  <div class="counter-warp" style="padding-bottom:120rpx">

    <div class="item-box" v-for="(item,index) in lists" :key="index">
      <div class="item-top">

        <div class="face" @click="goTa(item.userId)">
          <div class="msg-dot" v-if="item.hasRead == 0"></div>
          <img src="../../../static/img/touxiang.png" />
        </div>

        <div class="name-date">
          <div class="nickname">来辩论</div>
          <div class="add-date">{{item.createTime}}</div>
        </div>
      </div>
      <div class="item-mid" @click="goTo(item.debateTopicId)">
        您发表的辩题“我是辩题啊脏话一大堆”未通过审核，
        请遵守来辩论管理规则，共同维护社区秩序。

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
        pageName: 'my-msg-notify',
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


    },
    onShow() {
      this.get_list()
    },
    created() {

    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: '通知'
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
    padding-bottom: 10rpx;
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
    padding: 24rpx 58rpx;
    line-height: 37rpx;
  }



  .nickname {
    font-size: 24rpx;
    color: rgb(158, 160, 181);

  }

  .add-date {
    font-size: 22rpx;
    color: rgb(158, 160, 181);
  }

  .item-bottom {
    padding: 25rpx;
    border-radius: 10rpx;
    margin: 0 30rpx;
    font-size: 30rpx;
    line-height: 37rpx;
    background: rgb(245, 246, 248);
    color: rgb(176, 178, 196);
    overflow-y: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    max-height: 128rpx;
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
</style>