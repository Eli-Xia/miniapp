<template>
  <div>
    <div class="counter-warp" style="padding-bottom:120rpx" v-if="!loading">

      <login-btn :cb="callback" pageName="com-detail" :showLogin="showLogin" :checkLogin="checkLogin" @setLogin="setLogin"> </login-btn>
      <div class="item-box" style="margin-bottom:20rpx;padding-top:27rpx">
        <div class="item-top">
          <div class="click-box" @click="get_replay_user(comment)"></div>
          <div class="face" @click="gota(comment.userId)"><img :src="comment.headImgUrl" /></div>

          <div class="name-date" @click="gota(comment.userId)">
            <div class="nickname">{{comment.nickname}}</div>
            <div class="add-date">{{comment.createTime}}</div>
          </div>
        </div>
        <div class="item-mid" @click="get_replay_user(comment)">
          <p>{{comment.content}}</p>
        </div>
      </div>

      <div style="background:rgb(245, 246, 248)" class="item-box" v-for="(item,index) in lists" :key="index">
        <div class="item-top">
          <div class="click-box" @click="get_replay_user(item)"></div>
          <div class="face" @click="gota(item.userId)"><img :src="item.userHeadImgUrl" /></div>

          <div class="name-date" @click="gota(item.userId)">
            <div class="nickname">{{item.userNickname}}</div>
            <div class="add-date">{{item.createTime}}</div>
          </div>
        </div>
        <div class="item-mid">
          <p v-if="item.replyNickname"> <span class="reply-name" v-if="item.replyNickname">回复<span class="r-name" @click="gota(item.replyUserId)">{{item.replyNickname}}</span>：</span> <span @click="get_replay_user(item)">  <span class="reply-name" v-if="item.content == '该评论已删除'">  {{item.content}} </span>  <span  v-if="item.content != '该评论已删除'">  {{item.content}} </span></span></p>
          <p v-if="!item.replyNickname" @click="get_replay_user(item)"><span class="reply-name" v-if="item.content == '该评论已删除'"> {{item.content}} </span>   <span v-if="item.content != '该评论已删除'"> {{item.content}} </span></p>

        </div>
        <div class="line"></div>
      </div>


      <div class="no-data" v-if="lists.length < 1">
        暂时没有回复
      </div>

      <div class="add-box" :style="'padding-bottom:'+bottom+'rpx'">
        <div v-if="!sending" class="submit" @click="sendComment">发表</div>

        <div v-if="sending" class="submit">发表</div>
        <!-- <textarea @blur="set_def" name="" @click="set_height" :style="'height:'+text_height+'rpx'" :placeholder="reply_text" v-model="commentData.content" id="" class="content-text"></textarea> -->
        <input v-if="!adding" @click="showForm"  placeholder-class="phcolor" :placeholder="reply_text" v-model="commentData.content" type="text" name="content" class="content-c" id="">
      </div>
    </div>
    <div class="layer" v-if="focus" @click="close()"></div>
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import utils from '../../utils'
  import LoginBtn from '@/components/login'
  import navBar from '@/components/nav-bar'
  import myCommentItem from '@/components/my-comment-item'
  export default {
    data() {
      return {
        pageName: 'my-comment',
        lists: [],
        nowPage: 1,
        comment_id: 0,
        comment: {},
        adding: false,
        sending: false,
        commentData: {
          content: '',
          replyCommentId: 0
        },
        bottom: 0,
        reply_text: '',
        reply_user_id: '',
        text_height: 72,
        checkLogin: false,
        showLogin: false,
        callback: function () {},
        focus: false,
        loading: true


      }
    },

    components: {
      navBar,
      myCommentItem,
      LoginBtn
    },
    methods: {
      set_height() {
        this.text_height = 152
      },
      setLogin(status) {
        this.showLogin = status
      },
      set_def() {
        if (this.commentData.content == '') {
          this.text_height = 72
        }
      },
      get_list() {
        fly.post('/api/app/comment/list/cmment-reply', {
          "commentId": this.comment_id,
          "page": this.nowPage,
          "pageSize": 10
        }).then(res => {
          if (res.retCode == 0) {
            res.result.map(item => {
              item.createTime = utils.formatTime(new Date(item.createTime))

              console.log(item)
              if (this.nowPage > 1) {
                this.lists.push(item)
              }
            })
            if (this.nowPage == 1) {
              this.lists = res.result
            }

          } else if (res.retCode == 2) {

          } else {
            console.log(res)
          }
        })
      },
      get_detail() {
        let data = {
          "id": this.comment_id
        }

        fly.post('/api/app/comment/get-detail', {
          id: this.comment_id,

        }).then(res => {
          if (res.retCode == 0) {
            this.comment = res.result
            this.reply_text = "回复" + this.comment.nickname + "："
            this.comment.createTime = utils.formatTime(new Date(this.comment.createTime))
            this.loading = false

          }
          if (res.retCode == 2) {
            this.comment = res.result
            this.reply_text = "回复" + this.comment.nickname + "："
            this.comment.createTime = utils.formatTime(new Date(this.comment.createTime))

          }
        })
      },
      sendComment() {

        this.callback = () => {
          this.sendComment()
        }
        if (this.commentData.content == '') {
          wx.showToast({
            title: '请填写内容',
            icon: 'none'
          })
          return false
        }
        this.sending = true
        fly.post('/api/app/comment/add/cmment-reply', this.commentData).then(res => {
          if (res.retCode == 0) {
            this.get_list()
            this.adding = false
            this.text_height = 52
            this.commentData.content = ""
            this.commentData.replyCommentId = 0
            this.sending = false
            this.showLogin = false
            this.checkLogin = false
            this.focus = false
          }
          if (res.retCode == 2) {
            wx.setStorageSync('token', null)
            wx.setStorageSync('isLogin', false)
            // this.showLogin = true
            this.checkLogin = true
          }
        })
      },
      showForm() {
        // this.adding = true


      },
      close() {
        this.focus = false
      },
      gota(id) {
        let url = "/pages/ta/main?id=" + id
        wx.navigateTo({ url })
      },
      get_replay_user(item) {
        console.log(item)
        this.adding = false
        this.commentData.content = ""
        this.text_height = 52
        this.reply_user_id = item.id || this.comment_id
        let uname = ''
        if (item.userNickname) {
          uname = item.userNickname
        } else {
          uname = item.nickname
        }
        this.reply_text = "回复" + uname + "："

        this.commentData.replyCommentId = this.reply_user_id

        // this.focus = true
      }
    },
    onShow() {
      this.loading = true
      this.adding = false
      this.focus = false
      this.nowPage = 1
      this.comment_id = this.$root.$mp.query.id
      this.commentData.replyCommentId = this.comment_id
      this.commentData.content = ''
      this.get_list()
      this.get_detail()
      if (wx.getSystemInfoSync().windowHeight > 720) {
        this.bottom = 50
      }
      this.text_height = 72

    },
    created() {

    },
    onLoad() {
       this.loading = true
      wx.setNavigationBarTitle({
        title: '评论详情'
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


  .item-box {
    margin: 10rpx 0;
    border-radius: 0rpx;
    background: #FFF;
    margin-top: 0rpx;
    padding-bottom: 8rpx;
  }

  .item-box .item-top {
    padding: 24rpx;
    position: relative;
    padding-top: 17rpx;
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
    color: #b0b2c4;
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
    max-height: 130srpx;
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

  .line {
    border-bottom: 1px solid rgb(225, 227, 230);
    margin: 0 30rpx;
    margin-top: 6rpx;
  }

  .reply-name {
    color: rgb(158, 160, 181);
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

  .add-box .content-c {
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

  .content-text {
    height: 200rpx;

  }

  .content-text {
    width: 582rpx;
    padding-left: 25rpx;
    height: 92rpx;
    border-radius: 46rpx;
    background: #FFF;
    font-size: 28rpx;
    /* color: #999; */
    margin: 12rpx 120rpx 10rpx 50rpx;
    padding-top: 0rpx;

  }

  .no-data {
    text-align: center;
    padding: 30rpx;
    color: #ccc;
    font-size: 28rpx;
  }

  .click-box {
    position: absolute;
    border: 0px solid #ddd;
    height: 80rpx;
    width: 70%;
    right: 0;
  }

  .layer {
    position: fixed;
    height: 80rpx;
    width: 70%;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6)
  }

  .r-name {
    color: rgb(41, 182, 246);
  }
</style>