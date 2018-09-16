<template>
  <div class="nav">

    <div class="nav-li home" @click="goto('/pages/index/main')" :class="pageName == 'home' ? 'active': ''">
      <div class="icon"></div>
      <div class="text">首页 </div>
    </div>

    <div class="nav-li add"  @click="goto('/pages/add/main')"><div class="add-btn"></div></div>

     <div class="nav-li my" @click="goto('/pages/my/main')" :class="pageName == 'my' ? 'active': ''">
      <div class="icon"></div>
      <div class="text">我的 </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['pageName'],
    methods:{
        goto(url) {
            wx.navigateTo({url})
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
   .nav-li.home,.nav-li.my {
       margin-top: 14rpx;
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
       color: rgb(176,178,196)
   }
   .nav-li.active .text {
       margin: 0 auto;
       font-size: 20rpx;
       color:rgb( 26, 26, 28);
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
   
</style>