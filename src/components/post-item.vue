<template>
  <div class="item-box">
    <div class="item-top">
      <div class="click-box"  @click="goto(item.id)">我也可以点</div>
      <div class="face"><img :src="item.headImgUrl" /></div>
      <div class="name-date">
        <div class="nickname">{{item.nickname}}</div>
        <div class="add-date">{{item.createTime}}</div>
      </div>
    </div>
    <div class="item-mid" @click="goto(item.id)" :style="item.debateTopic.length > 60 ? 'margin-bottom:20rpx': ''">
      {{item.debateTopic}}

    </div>
    <div class="item-bottom">
      <div class="comment_count btn" @click="goto(item.id)">
        <div class="btn-group">
          <div class="icon"></div>
          <div class="count" >{{item.commentCount}}</div>
        </div>

      </div>
      <button  class="share-btn" open-type='share' :id="item.id" :data-share="item">分享</button>
      <div class="share_count btn">
        <div class="btn-group">
          <div class="icon"></div>
          <div class="count">{{item.forwardCount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        shareId:0
      }
    },
    props: ['item','pageName'],
    methods: {
      setID(id){
        this.shareId = id
        console.log('0000')
      },
      goto(id) {
       
        if (this.pageName !== 'detail') {
          let url = '/pages/detail/main?id=' + id
          wx.navigateTo({ url })
        }
      }
    },
    onShow() {
      // console.log(this.item)
      console.log(this.pageName,1111)
    },
    created() {
      // console.log(this.pageName,1111)
    },
    
  }
</script>

<style scoped>
  .item-box {
    margin: 30rpx;
    border-radius: 20rpx;
    background: #FFF;
  }

  .item-box .item-top {
    padding: 24rpx;
    height: 42rpx;
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
    padding: 24rpx;
    line-height: 37rpx;

    overflow-y: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    max-height:120rpx;
   
  }



  .nickname {
    font-size: 24rpx;
    color: rgb(158, 160, 181);

  }

  .add-date {
    font-size: 22rpx;
    color: rgb(215, 217,225);
  }

  .item-bottom {
    height: 32rpx;
    padding: 16rpx;
    border-top: 1rpx solid rgb(239, 239, 244);
    display: inline-block;

    /* Firefox */

    display: -moz-box;

    -moz-box-orient: horizontal;

    /* Safari, Opera, and Chrome */

    display: -webkit-box;

    -webkit-box-orient: horizontal;

    /* W3C */

    display: box;
    text-align: center;

    box-orient: horizontal;

  }

  .item-bottom .btn {
    -webkit-box-flex: 1.0;

    -moz-box-flex: 1.0;

    box-flex: 1.0;
    height: 32rpx;
    line-height: 32rpx;
  }

  .btn-group {
    text-align: center
  }

  .comment_count .icon {
    width: 37rpx;
    height: 35rpx;
    background-image: url(../../static/img/评论@2x.png);
    background-size: 100% 100%;
    float: left;
  }

  .share_count .icon {
    width: 37rpx;
    height: 32rpx;
    background: url(../../static/img/转发@2x.png) 0 3rpx no-repeat;
    background-size: 100% auto;
    float: left;
  }

  .item-bottom .count {
    font-size: 24rpx;
    color: rgb(176, 178, 196);
    float: left;
    margin-left: 10rpx;
  }

  .btn-group {
    width: 110rpx;
    margin: 0 auto;
  }
  .share-btn {
    width: 30%;
    position: absolute;
    right: 20%;
    height: 40rpx;
    opacity: 0;
  }
  .click-box {
    width: 60%;
    position: absolute;
    right: 0;
    height: 72rpx;
    opacity: 0;
  }
</style>