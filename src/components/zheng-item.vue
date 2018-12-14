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
            <div class="nickname">{{item.nickname}}</div>
            <div class="add-date">{{item.createTime}}</div>
          </div>
        </div>
        <div class="item-bottom" :class="(item.content ==  '该评论已删除' || item.state == 0) ? 'is_deleted' : ''">
          <p>{{(item.content ==  '该评论已删除' || item.state == 0) ? '该评论已被删除' : item.content}}</p>
        </div>
        <div class="line"></div>
      </div>
</template>

<script>
import { setTimeout } from 'timers';
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

        setTimeout(()=>{
          this.clicked = false
        },1000)
      },
      goTa(id) {
        if (id) {
          let url = '/pages/ta/main?id=' + id
          wx.navigateTo({ url })
        }
      }
    }
  }
</script>

<style scoped>
  .item-box {
    margin: 10rpx 0rpx;
    border-radius: 0rpx;
    background: none;
    margin-top: -6rpx;
    padding-bottom: 0rpx;

    /* border: 1rpx solid #000; */
  }

  .item-box .item-top {
    padding: 24rpx;
    padding-right: 0rpx;
    height: 42rpx;
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
    border: 1rpx solid #9ea0b5;
  }

.is_deleted {
    background: #F7F7F7!important;
    color: rgb(176, 178, 196)!important;
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
    font-size: 24rpx;
    color: rgb(158, 160, 181);

  }

  .add-date {
    font-size: 22rpx;
    color: rgb(158, 160, 181);
  }

  .item-bottom {
    padding: 22rpx;
    border-radius: 10rpx;
    margin-left: 100rpx;
    margin-right: 81rpx;
    margin-top: 18rpx;
    font-size: 26rpx;
    line-height: 38rpx;
    background: rgb(255, 221, 221);
    color: rgb(26, 26, 28);
  }

  .like-btn {

    float: right;
    text-align: right;
    padding-left: 40rpx;
    font-size: 24rpx;
    margin-right: 81rpx;
    margin-top: 30rpx;
    background: url(../../static/img/空心赞@2x.png) no-repeat;
    background-size: auto 100%;
    color: rgb(176, 178, 196);
  }

  .like-btn.liked {

    background: url(../../static/img/正赞@2x.png) no-repeat;
    background-size: auto 100%;
    color: rgb(255, 55, 56);
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
    left: -8rpx;
    top: -8rpx;
    background: url(../../static/img/小正.png) no-repeat;
    background-size: 100% 100%;
  }
</style>