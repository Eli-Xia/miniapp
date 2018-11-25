<template>
  <div class="counter-warp" style="padding-bottom:120rpx;padding-top:10rpx">

    <div class="item-box" v-for="(item,index) in lists" :key="index">
      <div class="item-top">

        <div class="face"><img :src="item.headImgUrl" /></div>

        <div class="name-date">
          <div class="nickname">{{item.nickname}}</div>
          <div class="add-date">赞了你的评论</div>
        </div>
      </div>


      <div v-if="item.debateTopic" class="item-bottom" @click="goto(item.debateTopicId)" :style="item.debateTopic.length > 60 ? 'margin-bottom:20rpx': ''">
        <p>{{item.debateTopic }}</p>
      </div>

      <div v-if="!item.debateTopic" class="item-bottom">
        <p>该辩题已被删除</p>
      </div>
    </div>



    <div class="nothing" v-if="lists.length < 1"></div>
    <!-- <nav-bar :pageName="pageName"></nav-bar> -->
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import utils,{ sub } from '../../utils'
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
        fly.post('/api/app/comment/list-my', {
          page: this.nowPage,
          pageSize: 30
        }).then(res => {
          if (res.retCode == 0) {
            res.result.map(item => {
              item.createTime = utils.formatTime(new Date(item.createTime))
              item.debateTopic = utils.sub(item.debateTopic)
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

      },
      filters: {
        sub(str) {
          console.log(str)
          if (str.lenght > 15) {
            return str.substr(0, 15) + '...'
          } else {
            return str
          }
        }
      }
    },
    onShow() {
      this.get_list()
    },
    created() {

    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: '赞我的'
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
    margin: 0rpx 0;
    border-radius: 0rpx;
    background: #FFF;
    height: 161rpx;
    position: relative;
    border-bottom: 1rpx solid rgb(245, 246, 248);
  }

  .item-box .item-top {
    padding: 42rpx;
    position: relative;
  }

  .item-top .face {
    width: 72rpx;
    height: 72rpx;
    float: left;
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
    font-size: 32rpx;
    color: rgb(26, 26, 28);
    padding: 24rpx 58rpx;
    line-height: 37rpx;
  }



  .nickname {
    font-size: 28rpx;
    color: rgb(117, 122, 151);

  }

  .add-date {
    font-size: 22rpx;
    color: rgb(196, 198, 211);
    
  }

  .item-bottom {
    padding: 18rpx 15rpx;
    border-radius: 20rpx;
    font-size: 22rpx;
    position: absolute;
    right: 20rpx;
    top: 20rpx;
    line-height: 24rpx;
    background: rgb(245, 246, 248);
    color: rgb(176, 178, 196);
    width: 90rpx;
    height: 85rpx;
    overflow: hidden;
    line-height: 28rpx;
    overflow-y: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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
</style>