<template>
  <div>
    <canvas width="500" height="300" canvas-id='myCanvasr'></canvas>
   <div id="canvas-container"></div>

    <h1 @click="mkhaibao">生成海报</h1>
    <div v-if="loading">
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

      <post-item :item="detail" pageName="detail"></post-item>
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

      <div class="add-box" :style="'padding-bottom:'+bottom+'rpx'">

        <div class="submit" @click="sendComment">发表</div>
        <input @focus="showForm" placeholder-class="phcolor" v-model="commentData.content" type="text" name="content" class="content" placeholder="我在等你的神评呢！" id="">

      </div>

    </div>

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
        share_img: ''
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
            this.detail['forwardCount'] = res.result.forwardCount || '分享'
            this.detail['commentCount'] = res.result.commentCount || '评论'
            this.detail['id'] = res.result.debateTopicId

            this.leftText = res.result.leftViewContent
            this.rightText = res.result.rightViewContent
            this.leftBi = res.result.leftViewProportion
            this.rightBi = res.result.rightViewProportion
            this.leftId = res.result.leftViewId
            this.rightId = res.result.rightViewId
            this.selectedType = res.result.selectedType
            this.loading = true
            this.get_share_img()

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
        fly.post(url, this.commentData).then(res => {
          if (res.retCode == 0) {
            console.log(res, '=====')
            wx.showToast({
              title: '评论成功！',
              icon: 'right'
            })
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
        if (id.likeState == 1) {
          url = '/api/app/comment/cancel-like'
        }

        let data = {
          commentId: id.id
        }
        this.callback = () => {
          this.doLike(id)
        }
        fly.post(url, data).then(res => {
          if (res.retCode == 0) {
            console.log(res, '=====')

            if (id.likeState == 1) {
              wx.showToast({
                title: '取消成功！',
                icon: 'right'
              })
              id.likeState = 0
              id.likeCount -= 1

            } else {

              wx.showToast({
                title: '点赞成功！',
                icon: 'right'
              })
              this.get_detail(this.$root.$mp.query.id)
              id.likeState = 1
              id.likeCount += 1
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
      get_share_img() {
        const self = this
        let ctx = wx.createCanvasContext('customCanvas')
        ctx.setFillStyle('#5F6FEE') //文字颜色：默认黑色
        ctx.setFontSize(60) //设置字体大小，默认10
        ctx.fillText("LXT", 60, 60) //绘制文本
        //调用draw()开始绘制
        let imgPath = '../../../static/img/反方实@2x.png'
        // ctx.drawImage(imgPath,0,0,width,height)    
        ctx.draw(false, () => {
          
        })

        wx.canvasToTempFilePath({
            canvasId: 'customCanvas',
            success: function (res) {
              // console.log(res.tempFilePath)
              let temp_path = res.tempFilePath
              // 小程序读取文件管理器 api
              let fileSystemManager = wx.getFileSystemManager()
              fileSystemManager.readFile({
                filePath: temp_path,
                encoding: 'base64',
                success: (data) => {
                  // console.log(data)
                  let base64 = 'data:image/png;base64,' + data.data
                  console.log(data)
                  self.share_img = temp_path
                }
              })
            }
          })

      

      },
      mkhaibao() {
        let cardInfo = {
          CardInfo: {
            Name:'小强',
            Avater:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ereW8O65g1NL7ib2716iadicoiaTI21zDTbuexBJPyEG4Nsvf6pSHzrA2ibcOcbMaiaVia3se5nQqhMAGBaQ/132',

          },
          TagList:[{TagName:'有意思'}],
          
        }
        mkimg.getAvaterInfo(cardInfo)
      }
    },

    onShow() {

      this.nowPage = 1
      this.loading = false
      this.checkLogin = false
      this.showLogin = false
      this.closeForm()
      console.log(this.$root.$mp.query.id)
      this.commentData.debateTopicId = this.$root.$mp.query.id
      this.id = this.$root.$mp.query.id
      this.get_detail(this.$root.$mp.query.id)
      this.get_comment(this.$root.$mp.query.id)

    },
    onShareAppMessage: function (opts) {
      let shareData = opts.target.dataset.share
      console.log(this.share_img)
      return {

        title: shareData.debateTopic,

        path: '/pages/index/main?id=' + shareData.id,
        imageUrl: this.share_img,
        success: function (res) {
          let url = '/api/app/dabate-topic/forward'
          let data = {
            debateTopicId: shareData.id
          }
          fly.post(url, data).then(data => {
            console.log(data, res)
          }).catch(e => console.log(e))

        },
        fail: function (e) {
          console.log(e, 'erroe')
        }


      }

    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: '帖子详情'
      })

      // this.get_share_img()
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

    height: 50rpx;

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
  }
</style>