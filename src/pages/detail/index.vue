<template>
  <div v-if="loading">
    <login-btn  :cb="callback" :showLogin="showLogin" :checkLogin="checkLogin" @setLogin="setLogin"> </login-btn>
    <div class="layer" v-if="adding"></div>

    <post-item :item="detail" pageName="detail"></post-item>
    <div class="status">

      <div class="zheng-fan-vs">
        <div class="zheng" @click="support(id,leftId)">{{leftText}}</div>
        <div class="fan" @click="support(id,rightId)">{{rightText}}</div>
        <div class="vs">VS</div>
      </div>
      <div class="bili">
        <div :class="selectedType == 1 ? 'selected' : ''" class="zhengbi" :style="'width:'+leftBi+'%'">{{leftBi}}%</div>
        <div :class="selectedType == 2 ? 'selected' : ''" class="fanbi" :style="'width:'+rightBi+'%'">{{rightBi}}%</div>
        <div class="mid-bar" :style="'left:'+(leftBi-2)+'%'"></div>
      </div>

    </div>

    <div class="comment-box">
      <zheng-item></zheng-item>
      <fan-item></fan-item>
      <zheng-item></zheng-item>
      <fan-item></fan-item>
    </div>

    <div class="add-box">

      <div class="submit">发表</div>
      <input type="text" name="content" class="content" placeholder="我在得你的神评论" id="">

    </div>

  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import card from '@/components/card'
  import postItem from '@/components/post-item'
  import zhengItem from '@/components/zheng-item'
  import fanItem from '@/components/fan-item'
  import utils from '../../utils'
  import '../../utils/Login'
  import LoginBtn from '@/components/login'
  import { isLogin, login } from '../../utils/Login';
  import { setTimeout } from 'timers';
  export default {
    data() {
      return {
        pageName: 'detail',
        adding: false,
        detail: {},
        id: 0,
        leftText: null,
        rightText: null,
        leftBi: 50,
        rightBi: 50,
        leftId: 0,
        rightId: 0,
        selectedType: 0,
        checkLogin: false,
        showLogin: false,
        callback: function () {},
        loading:false
      }
    },

    components: {
      card,
      postItem,
      zhengItem,
      fanItem,
      LoginBtn
    },

    methods: {
      get_detail(id) {
        let data = {
          debateTopicId: id
        }
        let url = '/api/app/debate-view/info'
        fly.post(url, data).then(res => {
          if (res.retCode == 0) {
            this.detail['headImgUrl'] = res.result.sponsorHeadImgUrl
            this.detail['nickname'] = res.result.sponsorNickname
            this.detail['debateTopic'] = res.result.debateTopic
            this.detail['createTime'] = utils.formatTime(new Date(res.result.createTime))
            this.detail['forwardCount'] = res.result.forwardCount || '转发'
            this.detail['commentCount'] = res.result.commentCount || '评论'

            this.leftText = res.result.leftViewContent
            this.rightText = res.result.rightViewContent
            this.leftBi = res.result.leftViewProportion
            this.rightBi = res.result.rightViewProportion
            this.leftId = res.result.leftViewId
            this.rightId = res.result.rightViewId
            this.selectedType = res.result.selectedType
            this.loading = true

          } else {
            wx.showToast({
              title: '数据异常',
              icon: 'none'
            })
          }
        }).catch(e => {
          console.log(e)
        })
      },
      get_comment(id) {
        let url = '/api/app/comment/list'
        let data = {
          debateTopicId: id,
          page: 1,
          pageSize: 13
        }
        fly.post(url, data).then(res => {
          if (res.retCode == 0) {

          }
          console.log(res)
        }).catch(e => {
          console.log(e)
        })
      },
      support(did, sid) {
        this.callback = () => {
          this.support(did, sid)
        }

        let data = {
          debateTopicId: did,
          debateViewId: sid,
        }

        let url = '/api/app/debate-view/support-view'
        fly.post(url, data).then(res => {
          if (res.retCode == 0) {
            console.log(res, '=====')
            wx.showToast({
              title: '支持成功！',
              icon: 'right'
            })
            this.showLogin = false
            this.checkLogin = false
          } else {
            wx.setStorageSync('token', null)
            wx.setStorageSync('isLogin', false)
            // this.showLogin = true
            this.checkLogin = true
           

            console.log(res)
          }

        }).catch(e => {
          console.log(e)
        })

      },
      setLogin(status) {
        this.showLogin = status
      }
    },

    created() {

      console.log(this.$mp)

    },
    onShow() {
      this.loading = false
      this.checkLogin = false
      this.showLogin = false
      console.log(this.$root.$mp.query.id)
      this.id = this.$root.$mp.query.id
      this.get_detail(this.$root.$mp.query.id)
      // this.get_comment(this.$root.$mp.query.id)

    },
    onShareAppMessage: function () {
     
      return {

        title: '弹出分享时显示的分享标题',

        desc: '分享页面的内容',

        path: '/page/user?id=123' // 路径，传递参数到指定页面。

      }

    }
  }
</script>

<style scoped>
  .page-main {
    background: rgb(245, 246, 248);
    margin-bottom: 150rpx;
  }

  .vs {
    font-size: 34rpx;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #000;
    width: 44rpx;
    height: 26rpx;
    margin: 0 auto;
    line-height: 120rpx;
  }

  .bili {

    height: 50rpx;

  }

  .zheng-fan-vs {
    height: 100rpx;
    position: relative;
    margin: 32rpx;
  }

  div.zheng {
    width: 280rpx;
    height: 100rpx;
    position: absolute;
    line-height: 120rpx;
    left: 0rpx;
    top: 0rpx;
    font-size: 30rpx;
    background: url(../../../static/img/正方空@2x.png) 0rpx 0rpx no-repeat;
    background-size: auto 100%;
    text-align: center;
    color: rgb(255, 55, 56);

  }

  div.zheng.selected {
    background: url(../../../static/img/正方实.png) 0rpx 0rpx no-repeat;
  }

  div.fan.selected {
    background: url(../../../static/img/反方实@2x.png) 0rpx 0rpx no-repeat;
  }

  div.fan {
    width: 280rpx;
    height: 100rpx;
    position: absolute;
    right: 0rpx;
    top: 0rpx;
    font-size: 30rpx;
    color: rgb(67, 112, 239);
    font-size: 30rpx;
    background: url(../../../static/img/反方空@2x.png) 0rpx 0rpx no-repeat;
    background-size: auto 100%;
    text-align: center;
    line-height: 120rpx;
  }


  .bili {
    position: relative;
    margin: 32rpx;
  }

  .zhengbi {
    position: absolute;

    height: 30rpx;
    background: red;
    color: #FFF;
    font-size: 26rpx;
    line-height: 30rpx;
    border-top-left-radius: 15rpx;
    border-bottom-left-radius: 15rpx;
    left: 0;
    top: 5rpx;
    padding-left: 1%;
  }

  .fanbi {
    position: absolute;

    height: 30rpx;
    background: blue;
    color: #FFF;
    font-size: 26rpx;
    right: 0;
    text-align: right;
    line-height: 30rpx;
    border-top-right-radius: 15rpx;
    border-bottom-right-radius: 15rpx;
    top: 5rpx;
    padding-right: 1%;
  }

  .mid-bar {
    height: 44rpx;
    background: rgb(68, 68, 69);
    width: 4rpx;
    position: absolute;
    border-radius: 4rpx;
    top: -8rpx;
    border: 6rpx solid #fff;

  }

  .comment-box {
    background: #FFF;
    padding-bottom: 80rpx;
  }

  .layer {
    background: #666;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
  }

  .add-box {
    height: 98rpx;
    background: rgb(247, 247, 250);
    border-top: 1rpx solid #eee;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .add-box .content {
    width: 590rpx;
    padding-left: 25rpx;
    height: 72rpx;
    border-radius: 35rpx;
    background: #FFF;
    line-height: 72rpx;
    font-size: 28rpx;
    margin: 10rpx 100rpx 10rpx 30rpx;

  }

  ::-webkit-input-placeholder {
    color: #EEE;
  }

  .add-box .submit {
    float: right;
    height: 72rpx;
    line-height: 72rpx;
    font-size: 28rpx;
    color: rgb(26, 26, 28);
    margin: 10rpx 27rpx 10rpx 27rpx;
  }
</style>