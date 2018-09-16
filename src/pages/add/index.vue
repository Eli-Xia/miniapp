<template>
  <div class="page-warp">
    <div class="add">
      <h1>发起辩题</h1>

      <textarea name="content" auto-focus placeholder="例：该不该看情侣手机" v-model.lazy="content" id="content" />

      </div>
    <div class="add" style="height:220rpx;">
      <div class="fan">
        <div class="title">反方观点</div>
        <input type="text" placeholder="例：不该">
      </div>
      <div class="zheng">
        <div class="title">正方观点</div>
        <input type="text" placeholder="例：该">
      </div>
      <div class="submit">发表</div>
    </div>
  </div>
</template>

<script>
  import navBar from '@/components/nav-bar'
  export default {
    data() {
      return {
        pageName: 'add'
      }
    },

    components: {
      navBar
    },
    created() {
      // document.getElementById("content").focus()
    },


  }
</script>


<style scoped>
  .add {
    padding: 30rpx;
    margin-bottom:10rpx; 
    background: #FFF;
    height: 190rpx;
   
  }
  .add h1 {
    font-size: 34rpx;
    color: rgb(26 26 28);
    margin: 0rpx;
  }
  #content{
    margin-top:29rpx;
    font-size: 30rpx;
     width: 100%;
     height: 132rpx;
    /* border: 1rpx solid #ddd; */
    color:#444;
  }
  #content:focus{
    color: #444;
  }
  input {
    font-size: 30rpx;
    margin-left: 50rpx;
    margin-top: 8rpx;
  }
  .title {
    height: 42rpx;
    line-height: 44rpx;
    font-size: 34rpx;
    padding-left:50rpx;
    color: rgb(26, 26, 28);
  }
  div.fan{
    width: 280rpx;
    float: right;
    text-align: left;
    height: 130rpx;
  }
  .zheng .title {
     background: url(../../../static/img/小正.png) 0rpx 0rpx no-repeat;
     background-size: auto 100%;
  }

  .fan .title {
     background: url(../../../static/img/小反.png) 0rpx 0rpx no-repeat;
     background-size: auto 100%;
  }
  div.zheng{
    width: 280rpx;
    float: left;
    height: 130rpx;
  }
  div.submit {
    height: 80rpx;
    border-radius: 40rpx;
    background: rgb(176, 178, 196);
    line-height: 80rpx;
    font-size: 34rpx;
    color: #FFF;
    clear: both;
    text-align: center;
    margin-top: 80rpx;
  }
</style>