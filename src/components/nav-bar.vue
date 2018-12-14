<template>
  <div class="nav" :style="'padding-bottom:'+bottom">

    <div class="nav-li home" @click="goto('/pages/index/main')" :class="pageName == 'home' ? 'active': ''">
      <div class="icon"></div>
      <div class="text">首页 </div>
    </div>

    <div class="nav-li add" @click="goto('/pages/add/main')">
      <div class="add-btn"></div>
    </div>

    <div class="nav-li my" @click="goto('/pages/my/main')" :class="pageName == 'my' ? 'active': ''">
      <div class="icon"></div>
      <div class="text">我的 </div>
      <div class="msg-dot" v-if=" msg_count > 0"></div>
    </div>

  </div>
</template>

<script>
import fly from '../utils/fly'
  export default {
    props: ['pageName'],
    data() {
        return {
            bottom:'0rpx',
            msg_count:0
        }
    },
    methods: {
      goto(url) {
        if (url =='/pages/add/main') {
            console.log(this.pageName)
          wx.navigateTo({ url })

        } else {
          wx.redirectTo({ url })
        }

      },
      get_msg_count() {
        fly.post('/api/app/msg/count/total').then(res => {
          if (res.retCode == 0) {
            this.msg_count = res.result


          } else if (retCode == 2) {

          } else {
            console.log(res)
          }
        })


      }
    },
    onShow(){
       this.get_msg_count()
    },
    onLoad() {
     
       if(wx.getSystemInfoSync().windowHeight > 720) {
           this.bottom = '50rpx'
       } 
    }
  }
</script>

<style>
  .nav {


    position: fixed;
    bottom: 0;
    width: 100%;
    height: 98rpx;
    background: rgb(247, 247, 250);
    border-top: 1rpx solid rgba(0, 0, 0, .1);
    text-align: center;
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

  .nav-li {

    height: 78rpx;

    -webkit-box-flex: 1.0;

    -moz-box-flex: 1.0;

    box-flex: 1.0;


  }

  .nav-li.home,
  .nav-li.my {
    margin-top: 14rpx;
    position: relative;
  }

  .nav-li.home .icon {
    width: 46rpx;
    height: 46rpx;
    margin: 0 auto;
    background-image: url(../../static/img/首页.png);
    background-size: 100% 100%;
  }

  .nav-li.my .icon {
    width: 46rpx;
    height: 46rpx;
    margin: 0 auto;
    background-image: url(../../static/img/我的.png);
    background-size: 100% 100%;
  }

  .nav-li.active.home .icon {
    width: 46rpx;
    height: 46rpx;
    margin: 0 auto;
    background-image: url(../../static/img/首页-选中.png);
    background-size: 100% 100%;
  }

  .nav-li.active.my .icon {
    width: 46rpx;
    height: 46rpx;
    margin: 0 auto;
    background-image: url(../../static/img/我的－选中.png);
    background-size: 100% 100%;
  }

  .nav-li .text {
    margin: 0 auto;
    font-size: 20rpx;
    color: rgb(176, 178, 196)
  }

  .nav-li.active .text {
    margin: 0 auto;
    font-size: 20rpx;
    color: rgb(26, 26, 28);
  }

  .nav-li.add .add-btn {
    height: 78rpx;
    width: 78rpx;
    margin: 0 auto;
    margin-top: 10rpx;
  }

  .nav-li.add .add-btn {
    height: 78rpx;
    width: 78rpx;
    margin: 0 auto;
    margin-top: 10rpx;
    background-image: url(../../static/img/fatie.png);
    background-size: 100% 100%;
  }

  .msg-dot {
    width: 14rpx;
    height: 14rpx;
    background: rgb(241, 44, 32);
    border-radius: 50%;
    position: absolute;
    left: 135rpx;
    top: 1rpx;
  }
</style>