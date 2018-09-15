<template>
  <div class="page-main" @click="clickHandle('test click', $event)">
    <post-item></post-item>
    <post-item></post-item>
    <post-item></post-item>
    <post-item></post-item>
    <post-item></post-item>
    <post-item></post-item>
    <post-item></post-item>
    <post-item></post-item>
    <post-item></post-item>
    <post-item></post-item>
    <post-item></post-item>

    <nav-bar :pageName="pageName"></nav-bar>
  </div>
</template>

<script>
  import card from '@/components/card'
  import navBar from '@/components/nav-bar'
  import postItem from '@/components/post-item'
  export default {
    data() {
      return {
        motto: 'Hello World',
        userInfo: {},
        nihao: 'haha',
        pageName: 'home'
      }
    },

    components: {
      card,
      navBar,
      postItem
    },

    methods: {
      bindViewTap() {
        const url = '../logs/main'
        wx.navigateTo({
          url
        })
      },
      onGotUserInfo(e) {
        // 调用登录接口
        console.log(1)
        console.log(e.mp.detail.rawData)
        this.userInfo = JSON.parse(e.mp.detail.rawData)
        this.nihao = e.mp.detail.rawData['nikcName']
        console.log(this.userInfo)
      },
      clickHandle(msg, ev) {
        console.log('clickHandle:', msg, ev)
      }
    },

    created() {

      console.log(this.$mp)

    }
  }
</script>

<style scoped>
  .page-main {
    background: rgb(245, 246, 248);
    margin-bottom: 150rpx;
  }
</style>