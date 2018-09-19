<template>
  <div>
    <button type="primary" v-if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">微信登录</button>
  </div>
</template>
<script>
  import { isLogin,login} from '../../utils/Login';
  export default {
    data() {
      return {
        canIUse: true
      }
    },
    methods: {
      bindGetUserInfo(e) {
        const self = this
        // console.log(e.mp.detail.rawData)
        if (e.mp.detail.rawData) {
          //用户按了允许授权按钮

          console.log('用户按了允许授权按钮', e.mp.detail.rawData, '去登陆')
          login(function () {
            wx.navigateBack()
          })
        } else {
          //用户按了拒绝按钮
          console.log('用户按了拒绝按钮')
        }
      },
    }
  }
</script>