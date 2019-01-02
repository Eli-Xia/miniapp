<template>
  <div>
    <div class="noPage" v-if="noPage">
      <div class="delete_icon">

      </div>
    </div>
    <div v-if="loading">
      <canvas canvas-id='card-canvas' style="width:750rpx;height:600rpx; position: absolute; top:-1800rpx; z-index:-10000;"></canvas>
      <login-btn :cb="callback" :showLogin="showLogin" :checkLogin="checkLogin" @setLogin="setLogin"> </login-btn>
      <div class="layer" @click="closeForm" v-if="adding">

      </div>
      <div class="form-post" v-if="adding" :style="'bottom:'+(bottom+99)+'rpx'">
        <div class="f-title">
          请选择支持的一方: <span v-if="tips" style="color:red;font-size:25rpx">(观点必选哦)</span>
          <div class="status">

            <div class="zheng-fan-vs" style="margin:0; margin-top: 25rpx;">
              <div :class="commentData.debatViewType == 1 ? 'zheng-selected' : 'zheng'" @click="seyDebat(1)">{{leftText}}</div>
              <div :class="commentData.debatViewType == 2 ? 'fan-selected' : 'fan'" @click="seyDebat(2)">{{rightText}}</div>
              <div class="vs">VS</div>
            </div>
          </div>

        </div>
      </div>

      <!-- 滚动浮窗 -->

      <div :style="display? 'display:block':'display:none'" class="float-view " :class="showFloat? 'show':'hide'">
        <div class="content-1">
          {{detail.float_text}}
        </div>
        <div class="guandian">

          <div class="left">{{leftText}}</div>
          <div class="right">{{rightText}}</div>
        </div>
      </div>

      <div class="form-post" v-if="saying" :style="'bottom:'+(bottom+517)+'rpx;z-index:99999;border-bottom:6rpx solid #ddd'">
        <div class="f-title">
          请选择支持的一方: <span v-if="tips" style="color:red;font-size:25rpx">(观点必选哦)</span>
          <div class="status">

            <div class="zheng-fan-vs" style="margin:0; margin-top: 25rpx;">
              <div :class="commentData.debatViewType == 1 ? 'zheng-selected' : 'zheng'" @click="seyDebat(1)">{{leftText}}</div>
              <div :class="commentData.debatViewType == 2 ? 'fan-selected' : 'fan'" @click="seyDebat(2)">{{rightText}}</div>
              <div class="vs">VS</div>


            </div>
          </div>

        </div>
      </div>
      <post-item :item="detail" @onShare="onShare" pageName="detail"></post-item>
      <div class="status">

        <div class="zheng-fan-vs">
          <div :class="selectedType == 1 ? 'zheng-selected' : 'zheng'" @click="support(id,leftId)">{{leftText}}</div>
          <div class="fan" :class="selectedType == 2 ? 'fan-selected' : 'fan'" @click="support(id,rightId)">{{rightText}}</div>
          <div class="vs">VS</div>
        </div>
        <div class="bili">
          <div class="zhengbi" :style="'width:'+leftBi+'%'">{{leftBi}}%</div>
          <div class="fanbi" :style="'width:'+(rightBi)+'%'">{{rightBi}}%</div>
          <div class="mid-bar" :style="'left:'+(leftBi)+'%'"></div>

          <div class="piao-left">({{piao_left}}票)</div>
          <div class="piao-right">({{piao_right}}票)</div>
        </div>

      </div>

      <div class="comment-box">
        <div class="no-comment" v-if="commentList.length < 1">
          <h2>暂时还没有人评论</h2>
        </div>
        <div v-for="(item,index) in commentList" :key="index">
          <zheng-item @doLike="doLike" :item="item" v-if="item.debateViewType == 1"></zheng-item>
          <fan-item @doLike="doLike" :item="item" v-if="item.debateViewType == 2"></fan-item>
        </div>
      </div>
      <div id="say-add" v-if="saying">
        <div class="say_content">{{say_content}}</div>
        <div class="start_text">{{say_text}}</div>
        <div class="say-bottom">
          <div class="button-1">清空</div>
          <div class="start_saying" v-if="start_saying"></div>
          <div @touchend="end_say" @touchstart="start_say" class="button-2"></div>
          <div class="button-3">发表</div>
        </div>
      </div>
      <div class="say-layer" @click="closeSay" v-if="saying"></div>
      <div class="add-box" :style="'padding-bottom:'+bottom+'rpx'">
        <!-- <div id="say-btn" @click="show_say"></div> -->
        <div id="fen-btn" v-if="!adding" @click="onShare(detail)"></div>
        <div v-if="adding && !sending" class="submit" @click="sendComment">发表</div>

        <div v-if="adding && sending" class="submit">发...</div>
        <input @focus="showForm" placeholder-class="phcolor" placeholder="我在等你的神评呢！" v-model="commentData.content" type="text" name="content" class="content" id="">

      </div>

    </div>
    <share-page v-if="showShare" :shareData="shareData" @closeShare="closeShare"></share-page>
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import mkimg from '../../utils/mkimg'
  import card from '@/components/card'
  import postItem from '@/components/post-item'
  import zhengItem from '@/components/zheng-item'
  import fanItem from '@/components/fan-item'
  import utils from '../../utils'
  import '../../utils/Login'
  import LoginBtn from '@/components/login'
  import { isLogin, login } from '../../utils/Login';
  import { setTimeout } from 'timers';
  import sharePage from '@/components/share'
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
        loading: false,
        commentData: {
          debateTopicId: 0,
          debatViewType: 0,
          content: null
        },
        tips: false,
        commentList: [],
        bottom: 0,
        nowPage: 1,
        share_img: '',
        showShare: false,
        shareData: {},
        saying: false,
        say_text: '长按说话',
        start_saying: false,
        say_content: '',
        noPage: false,
        sending: false,
        defaultText: '我在等你的神评呢！',
        showFloat: false,
        display: false,
        piao_left: 0,
        piao_right: 0
      }
    },

    components: {
      card,
      postItem,
      zhengItem,
      fanItem,
      LoginBtn,
      sharePage
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
            this.detail['float_text'] = res.result.debateTopic.length > 22 ? res.result.debateTopic.substr(0, 22) + '...' : res.result.debateTopic
            this.detail['createTime'] = utils.formatTime(new Date(res.result.createTime))
            this.detail['forwardCount'] = res.result.forwardCount || '分享'
            this.detail['commentCount'] = res.result.commentCount || '评论'
            this.detail['id'] = res.result.debateTopicId
            this.detail['qrCodeUrl'] = res.result.qrCodeUrl
            this.detail['userId'] = res.result.userId
            this.detail['debateTag'] = res.result.debateTag


            this.leftText = res.result.leftViewContent
            this.rightText = res.result.rightViewContent
            this.leftBi = res.result.leftViewProportion
            this.piao_left = res.result.leftViewSupportNum
            this.piao_right = res.result.rightViewSupportNum
            this.rightBi = res.result.rightViewProportion
            this.leftId = res.result.leftViewId
            this.rightId = res.result.rightViewId
            this.selectedType = res.result.selectedType

            if (res.result.display == 0) {
              this.loading = true
              this.noPage = false
            } else {
              this.noPage = true
              this.loading = false
            }



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
          page: this.nowPage,
          pageSize: 30
        }
        fly.post(url, data).then(res => {
          if (res.retCode == 0) {
            res.result.map(item => {
              item.createTime = utils.formatTime(new Date(item.createTime))
              item.headImgUrl = item.userHeadImgUrl
              item.nickname = item.userNickname
              if (this.nowPage > 1) {
                this.commentList.push(item)
              }
            })
            if (this.nowPage == 1) {
              this.commentList = res.result
            }
          } else if (ret.retCode == 2) {

          }

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
            this.get_detail(this.$root.$mp.query.id)
          }
          if (res.retCode == 2) {
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
      seyDebat(id) {
        this.commentData.debatViewType = id
      },
      sendComment() {

        this.callback = () => {
          this.sendComment()
        }
        if (!this.commentData.debateTopicId || !this.commentData.debatViewType || !this.commentData.content) {
          this.tips = true
          return false
        }
        this.tips = false
        console.log(111)
        let url = '/api/app/comment/add'
        this.sending = true
        fly.post(url, this.commentData).then(res => {

          if (res.retCode == 0) {
            console.log(res, '=====')
            wx.showToast({
              title: '评论成功！',
              icon: 'right'
            })
            this.sending = false
            this.nowPage = 1
            this.get_comment(this.$root.$mp.query.id)
            this.get_detail(this.$root.$mp.query.id)
            this.closeForm()
            this.showLogin = false
            this.checkLogin = false
          } else if (res.retCode == 2) {
            wx.setStorageSync('token', null)
            wx.setStorageSync('isLogin', false)
            // this.showLogin = true
            this.checkLogin = true


            console.log(res)
          } else {
            wx.showToast({
              title: retMsg,
              icon: 'none'
            })
          }

        }).catch(e => {
          console.log(e)
        })

      },
      doLike(id) {
        let url = '/api/app/comment/like'
        let action = 'doLike'
        if (id.likeState == 1) {
          id.likeState = 0
          id.likeCount -= 1
          action = 'cancelLike'
          url = '/api/app/comment/cancel-like'

        } else {
          action = 'doLike'
          id.likeState = 1
          id.likeCount += 1
        }

        let data = {
          commentId: id.id
        }
        this.callback = () => {
          this.doLike(id)
        }

        // return false
        fly.post(url, data).then(res => {
          if (res.retCode == 0) {
            console.log(res, '=====')

            if (action == 'cancelLike') {
              wx.showToast({
                title: '取消成功！',
                icon: 'right'
              })



            } else {

              wx.showToast({
                title: '点赞成功！',
                icon: 'right'
              })
              this.get_detail(this.$root.$mp.query.id)

            }

            this.closeForm()
            this.showLogin = false
            this.checkLogin = false
            this.nowPage += 1
            this.get_detail(this.$root.$mp.query.id)
            this.get_comment(this.$root.$mp.query.id)
          }
          if (res.retCode == 2) {
            wx.setStorageSync('token', null)
            wx.setStorageSync('isLogin', false)
            // this.showLogin = true
            this.checkLogin = true
            console.log(res)
          }

          console.log(res)


        }).catch(e => {
          console.log(e)
        })

      },
      showForm() {
        // this.closeSay()
        this.defaultText = ''
        this.adding = true
      },
      setLogin(status) {
        this.showLogin = status
      },
      closeForm() {
        this.adding = false
        this.tips = false
        this.commentData.debatViewType = 0
        this.commentData.content = null
      },

      closeSay() {

        this.saying = false
        this.tips = false
        this.commentData.debatViewType = 0
        this.commentData.content = null
      },
      get_share_img() {


      },
      oneline(str) {
        if (str.length > 30) {
          return str.substr(0, 28) + '...'
        } else {
          return str
        }
      },
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
      show_say() {
        this.saying = true
        this.closeForm()
      },
      start_say() {
        this.say_text = '请说话...'
        this.start_saying = true
        const self = this
        wx.startRecord({
          success: function (res) {
            console.log('录音成功' + JSON.stringify(res));
            self.say_text = '识别中...'

            //上传语音文件至服务器
            wx.uploadFile({
              url: 'https://test.keendo.com.cn/api/app/voice-recognition/recognition',
              filePath: res.tempFilePath,
              name: 'multipartFile',
              header: { token: wx.getStorageSync('token') }, // 设置请求的 header
              formData: {
                'msg': 'voice'
              }, // HTTP 请求中其他额外的 form data
              success: function (res) {
                // success
                console.log(res)
                let result = JSON.parse(res.data)
                result = result.result
                self.say_content = result
                self.say_text = '按住说话'


              },
              fail: function (err) {
                // fail
                console.log(err);
              },
              complete: function () {
                // complete
              }
            })
          },
          fail: function (res) {
            //录音失败
            that.setData({
              voiceButtonName: '语音识别'
            })
            console.log('录音失败' + JSON.stringify(res));
          }
        })
        setTimeout(function () {
          //结束录音  
          wx.stopRecord()
        }, 60000)

      },
      end_say() {
        this.say_text = '长按说话'
        this.start_saying = false
        wx.stopRecord()
      },
      checkLog() {
        let url = '/api/app/user/check-login'
        fly.post(url, {

          })
          .then((res) => {
            if (res.result.login == 0) {

              wx.setStorageSync('token', null)
              wx.setStorageSync('isLogin', false)
              // this.showLogin = true
              this.checkLogin = true

            }
          })

      },
    },
    onHide() {
      this.nowPage = false
      this.display = false
      this.showFloat = false
    },
    onShow() {

      this.display = false
    },
    onShareAppMessage: function (opts) {

      const self = this
      console.log('999')
      return {
        title: '你怎么看？',
        path: '/pages/index/main?id=' + self.id,
        imageUrl: self.share_img,
        success: function (res) {
          self.closeShare()
          let url = '/api/app/dabate-topic/forward'
          let data = {
            debateTopicId: self.id
          }
          fly.post(url, data)
          self.closeShare()

        },
        fail: function (e) {
          console.log(e)
        }
      }

    },

    onLoad() {
      this.checkLog()
      wx.setNavigationBarTitle({
        title: '帖子详情'
      })
      this.closeShare()
      const self = this

      this.nowPage = 1
      this.loading = false
      this.checkLogin = false
      this.showLogin = false
      this.closeForm()

      this.commentData.debateTopicId = this.$root.$mp.query.id
      this.id = this.$root.$mp.query.id
      this.get_detail(this.$root.$mp.query.id)
      this.get_comment(this.$root.$mp.query.id)
      setTimeout(() => {

        mkimg.shareCard(self.detail, function (url) {
          self.share_img = url
        })


      }, 1000)

    },

    created() {

      if (wx.getSystemInfoSync().windowHeight > 720) {
        this.bottom = 50
      }
    },

    onPullDownRefresh() {

      this.loading = false
      this.checkLogin = false
      this.showLogin = false
      this.closeForm()
      console.log(this.$root.$mp.query.id)
      this.commentData.debateTopicId = this.$root.$mp.query.id
      this.id = this.$root.$mp.query.id
      this.get_detail(this.$root.$mp.query.id)
      this.get_comment(this.$root.$mp.query.id)
      wx.stopPullDownRefresh();
    },

    onReachBottom: function () {
      this.nowPage += 1
      this.get_comment(this.$root.$mp.query.id)
    },
    onPageScroll: function (e) {

      if (e.scrollTop > 220) {
        this.showFloat = true
        this.display = true

      } else {
        this.showFloat = false
        // this.display = false
      }
      console.log(e)

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
    font-weight: 400;
    color: #000;
    width: 44rpx;
    height: 26rpx;
    margin: 0 auto;
    line-height: 120rpx;
  }

  .bili {

    height: 80rpx;

  }

  .zheng-fan-vs {
    height: 100rpx;
    position: relative;
    margin: 32rpx;
  }

  div.zheng {
    width: 282rpx;
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

  div.zheng-selected {
    width: 282rpx;
    height: 100rpx;
    position: absolute;
    line-height: 120rpx;
    left: 0rpx;
    top: 0rpx;
    font-size: 30rpx;
    background: url(../../../static/img/11@2x.png) no-repeat;
    background-size: auto 100%;
    text-align: center;
    color: #FFF;
  }



  div.fan {
    width: 282rpx;
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

  div.fan-selected {
    width: 282rpx;
    height: 100rpx;
    position: absolute;
    line-height: 120rpx;
    right: 0rpx;
    top: 0rpx;
    font-size: 30rpx;
    background: url(../../../static/img/反方实@2x.png) no-repeat;
    background-size: auto 100%;
    text-align: center;
    color: #FFF;
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
    background: linear-gradient(rgb(60, 126, 214), rgb(67, 112, 239));
    /* 标准的语法 */
    color: #FFF;
    font-size: 26rpx;
    right: 0;
    text-align: right;
    line-height: 30rpx;
    border-top-right-radius: 15rpx;
    border-bottom-right-radius: 15rpx;
    top: 5rpx;
    overflow: hidden;
    padding-right: 0%;
  }

  .mid-bar {
    height: 44rpx;
    /* background: rgb(39, 39, 43); */
    width: 10rpx;
    position: absolute;
    border-radius: 4rpx;
    top: -3rpx;
    overflow: hidden;
    background: url(../../../static/img/mid-bar.png);
    background-size: 100% 100%;
    /* border: 4rpx solid #fff; */

  }

  .comment-box {
    background: #FFF;
    padding-bottom: 160rpx;
    min-height: 800rpx;
    clear: both;
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
    min-height: 98rpx;
    background: rgb(247, 247, 250);
    border-top: 1rpx solid #eee;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .add-box .content {
    width: 582rpx;
    padding-left: 25rpx;
    height: 72rpx;
    border-radius: 35rpx;
    background: #FFF;
    line-height: 72rpx;
    font-size: 28rpx;
    /* color: #999; */
    margin: 12rpx 120rpx 10rpx 50rpx;

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

  .layer {
    background: rgba(0, 0, 0, .6);
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
  }

  .form-post {
    padding: 20rpx 30rpx;
    background: #FFF;
    position: fixed;
    bottom: 10rpx;
    left: 0;
    right: 0;
    z-index: 1500;
    background: #FFF;

  }

  .f-title {
    font-size: 32rpx;
    color: #333;
    margin-top: 25rpx;
  }

  .no-comment {
    padding-top: 50rpx;
  }

  .no-comment h2 {
    clear: both;
    border-radius: 10rpx;
    padding: 10rpx;
    background: none;
    margin: 40rpx;
    height: 90rpx;
    line-height: 90rpx;
    color: #ccc;
    /* margin-top: 90rpx!important; */

    text-align: center;

  }

  .phcolor {
    /* color: rgb(176, 178, 196) */
    color: red;
  }

  ::input-placeholder {
    color: red;
  }

  .text-box {
    width: 100%;
    position: relative;
    min-height: 80rpx;
    margin-top: 17rpx;
  }

  .text-box .text {
    display: block;
    visibility: hidden;
    word-break: break-all;
    word-wrap: break-word;
  }

  .text-box .weui-textarea {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow-y: hidden;
    word-break: break-all;
    word-wrap: break-word;
  }

  #canvas-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -100;
  }

  .add-box #say-btn {
    position: absolute;
    width: 60rpx;
    height: 60rpx;
    left: 16rpx;
    top: 19rpx;
    background: url(../../../static/img/say@2x.png);
    background-size: 100% 100%;
  }

  .add-box #fen-btn {
    position: absolute;
    width: 60rpx;
    height: 60rpx;
    right: 16rpx;
    top: 19rpx;
    background: url(../../../static/img/sharebtn@2x.png);
    background-size: 100% 100%;
  }

  #say-add {
    background: #FFF;
    height: 518rpx;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
  }

  .say-layer {
    background: rgba(0, 0, 0, .6);
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    position: fixed;
    z-index: 9999;
  }

  .say-bottom {
    height: 140rpx;
    bottom: 0rpx;
  }

  .say-bottom .button-1 {
    width: 70rpx;
    height: 34rpx;
    position: absolute;
    font-size: 36rpx;
    text-align: center;
    bottom: 63rpx;
    left: 92rpx;
    color: rgb(111, 111, 113);
  }


  .say-bottom .button-3 {
    width: 70rpx;
    height: 34rpx;
    position: absolute;
    font-size: 36rpx;
    text-align: center;
    bottom: 63rpx;
    color: rgb(76, 160, 72);
    right: 92rpx;
    color: rgb(111, 111, 113);
  }

  .say-bottom .button-2 {
    width: 110rpx;
    height: 110rpx;
    position: absolute;
    font-size: 36rpx;
    text-align: center;
    bottom: 30rpx;
    left: 50%;
    margin-left: -55rpx;

    color: rgb(111, 111, 113);
    background: url(../../../static/img/sayButton.png);
    background-size: 100% 100%;
  }

  .start_saying {
    width: 140rpx;
    height: 140rpx;
    position: absolute;
    font-size: 36rpx;
    text-align: center;
    bottom: 15rpx;
    left: 50%;
    margin-left: -70rpx;
    border-radius: 50%;
    color: rgb(111, 111, 113);
    background: rgba(0, 0, 0, .1)
  }

  .start_text {
    position: absolute;
    left: 0;
    bottom: 170rpx;
    width: 190rpx;
    left: 50%;
    margin-left: -90rpx;
    text-align: center;
    font-size: 20rpx;
    color: #555;
  }

  .say_content {
    position: absolute;
    top: 20rpx;
    left: 20rpx;
    right: 20rpx;
  }

  .noPage {
    background: rgba(245, 246, 248);
    position: absolute;
    top: 0rpx;
    left: 0rpx;
    right: 0rpx;
    bottom: 0rpx;
  }

  .delete_icon {
    width: 244rpx;
    height: 194rpx;
    position: absolute;
    left: 50%;
    margin-left: -122rpx;
    top: 50%;
    margin-top: -120rpx;
    background: url(../../../static/img/delete.png);
    background-size: 100% 100%;
  }

  .adding {
    color: #222;
  }

  .float-view {
    position: fixed;
    background: #FFF;
    left: 0;
    right: 0;
    z-index: 999999;
    display: none;
    height: 110rpx;
    padding: 10rpx 45rpx;
    animation-iteration-count: infinite;
    border-bottom: 10rpx solid rgb(245, 246, 248);
  }

  .float-view.hide {

    animation: slideup 1s;
    top: -300rpx;
  }

  .float-view.show {

    animation: slidedown 1s;
    top: 0;

  }

  @keyframes slideup {
    0% {
      top: 0rpx;
    }

    50% {
      top: -200rpx;
    }

    100% {
      top: -200rpx;
    }
  }


  @keyframes slidedown {
    0% {
      top: -200rpx;
    }

    50% {
      top: 0;
    }

    100% {
      top: 0;
    }
  }

  .content-1 {
    height: 130rpx;

    font-size: 28rpx;
    color: rgb(176, 178, 196);
  }

  .guandian {
    /* border: 1rpx solid #ddd; */
    position: absolute;
    top: 0rpx;
    right: 0rpx;
    left: 0rpx;
  }

  .guandian .left {
    height: 42rpx;
    width: 45%;
    position: absolute;
    left: 42rpx;
    top: 64rpx;
    padding-left: 52rpx;
    background: url(../../../static/img/小正@3x.png) no-repeat;
    background-size: auto 100%;
    font-size: 28rpx;
    color: rgb(255, 55, 56);
  }


  .guandian .right {
    height: 42rpx;
    width: 45%;
    position: absolute;
    right: 42rpx;
    top: 64rpx;
    padding-right: 52rpx;
    background: url(../../../static/img/小反@3x.png) top right no-repeat;
    background-size: auto 100%;
    font-size: 28rpx;
    text-align: right;
    color: rgb(67, 112, 239);
  }

  .piao-left {
    position: absolute;
    left: 0;
    top: 48rpx;
    font-size: 22rpx;
    color: rgb(117, 122, 151);
  }

  .piao-right {
    position: absolute;
    right: 0;
    top: 48rpx;
    font-size: 22rpx;
    color: rgb(117, 122, 151);
  }
</style>