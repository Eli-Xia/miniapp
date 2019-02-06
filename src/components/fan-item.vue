<template>
  <div class="item-box">
    <div class="item-top">
      <div class="face">
        <div class="zheng-icon"></div>
        <img @click="goTa(item.userId)" :src="item.headImgUrl" />
      </div>
      <div v-if="!(item.content ==  '该评论已删除' || item.state == 0) && clicked == false" class="like-btn" :class="item.likeState == 1 ? 'liked': ''" @click="like(item)">
        {{ item.likeCount}}
      </div>

        <div v-if="!(item.content ==  '该评论已删除' || item.state == 0) && clicked == true" class="like-btn" :class="item.likeState == 1 ? 'liked': ''">
          {{ item.likeCount}}
      </div>

          <div v-if="(item.content ==  '该评论已删除' || item.state == 0)" class="like-btn" :class="item.likeState == 1 ? 'liked': ''">
            {{ item.likeCount}}
      </div>
            <div class="name-date">
              <div class="name-xun">
                <div class="nickname"> {{item.nickname}} </div>
                <div class="medal-box" v-if="item.has_medal">
                  <div :key="i" class="medal-item" :class="'medal-'+it.code" v-for="(it,i) in item.lightMedalCodeList "></div>
                </div>
              </div>
              <div class="add-date">{{item.createTime}}</div>
            </div>

          </div>
          <div @click="go_detail(item.id)" class="item-bottom" :class="(item.content ==  '该评论已删除' || item.state == 0) ? 'is_deleted' : ''">
            <p>{{(item.content ==  '该评论已删除' || item.state == 0) ? '该评论已删除' : item.content}}</p>
          </div>
          <div class="more-comment" v-if="item.replyCount > 0">{{ item.replyCount}}条回复</div>
            <div class="line"></div>
          </div>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {
        clicked: false
      }
    },
    methods: {
      like(id) {
        this.clicked = true
        this.$emit('doLike', id)

        setTimeout(() => {
          this.clicked = false
        }, 1000)
      },
      goTa(id) {
        if (id) {
          let url = '/pages/ta/main?id=' + id
          wx.navigateTo({ url })
        }
      },
      go_detail(id) {
        let url = '/pages/comment-detail/main?id=' + id
        wx.navigateTo({ url })
      }
    }
  }
</script>

<style scoped>
  .item-box {
    margin: 10rpx 0rpx;
    border-radius: 0rpx;
    background: none;

    padding-bottom: 0rpx;
    margin-top: 0rpx;
    margin-top: -6rpx;
    /* border: 1rpx solid #000;  */
  }

  .item-box .item-top {
    padding: 24rpx;
    padding-left: 0rpx;
    height: 42rpx;
  }

  .item-top .face {
    width: 72rpx;
    height: 72rpx;
    float: right;
    position: relative;
  }

  .item-top .face img {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
    border: 1rpx solid #9ea0b5;
  }

  .item-top .name-date {
    float: right;
    margin-right: 11rpx;
    line-height: 30rpx;
    margin-top: 8rpx;
    text-align: right;
  }

  .item-mid {
    clear: both;
    font-size: 32rpx;
    color: rgb(26, 26, 28);
    padding: 24rpx 58rpx;
    line-height: 37rpx;
  }


  .medal-box {
    float: right;
    margin-right: 8rpx;
    margin-top: 1xsrpx;
  }

  .medal-box .medal-item {
    height: 30rpx;
    width: 30rpx;
    float: right;
    margin-right: 5rpx;
  }

  .medal-box .medal-item.medal-1 {
    background: url(../../static/img/huozanlittle.png) no-repeat;
    background-size: auto 100%;
  }

  .medal-box .medal-item.medal-2 {
    background: url(../../static/img/fabianlittle.png) no-repeat;
    background-size: auto 100%;
  }

  .nickname {
    font-size: 24rpx;
    color: rgb(158, 160, 181);
    float: right;
  }

  .add-date {
    font-size: 22rpx;
    color: #b0b2c4;
  }

  .item-bottom {
    padding: 22rpx;
    border-radius: 10rpx;
    margin-left: 81rpx;
    margin-right: 100rpx;
    margin-top: 18rpx;
    font-size: 26rpx;
    line-height: 38rpx;
    background: rgb(227, 234, 255);
    color: rgb(26, 26, 28);
  }

  .is_deleted {
    background: #F7F7F7;
    color: rgb(176, 178, 196);
  }

  .like-btn {

    float: left;
    text-align: right;
    padding-left: 40rpx;
    font-size: 24rpx;
    margin-left: 81rpx;
    margin-top: 30rpx;
    background: url(../../static/img/空心赞@2x.png) no-repeat;
    background-size: auto 100%;
    color: rgb(176, 178, 196);
  }

  .like-btn.liked {
    background: url(../../static/img/反赞@2x.png) no-repeat;
    background-size: auto 100%;
    color: rgb(67, 112, 239);
  }

  .line {
    height: 1rpx;
    border-top: 1rpx solid rgb(239, 239, 244);
    margin: 23rpx 30rpx;
    margin-bottom: 0;
  }

  .zheng-icon {
    position: absolute;
    width: 30rpx;
    height: 30rpx;
    right: -8rpx;
    top: -8rpx;
    background: url(../../static/img/小反.png) no-repeat;
    background-size: 100% 100%;
  }

  .more-comment {
    font-size: 22rpx;
    color: rgb(176, 178, 196);
    margin: 9rpx auto 22rpx 100rpx;
  }
</style>