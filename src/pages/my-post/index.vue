<template>
  <div class="page-main" @click="clickHandle('test click', $event)">
    <div v-for="(item,index) in lists" :key="index">
      <post-item :item="item" pageName="index"></post-item>
    </div>
    <!-- <nav-bar :pageName="pageName"></nav-bar> -->
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import utils from '../../utils'
  import navBar from '@/components/nav-bar'
  import postItem from '@/components/post-item'
  export default {

    data() {
      return {
        pageName: 'my-post',
        lists: null
      }
    },

    components: {
      navBar,
      postItem
    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: '我的辩题'
      })
    },

    methods: {

      clickHandle(msg, ev) {
        console.log('clickHandle:', msg, ev)
      },
      get_index_list() {
        const self = this
        fly.post('/api/app/dabate-topic/list-my', {
            page: 1,
            pageSize: 30
          })
          .then(function (response) {
            if (response.retCode === 0) {
              //渲染列表
              self.lists = response.result
              self.lists.map(item => {
                if (!item.forwardCount) {
                  item.forwardCount = '转发'
                }
                if (!item.commentCount) {
                  item.commentCount = '评论'
                }
                item.createTime = utils.formatTime(new Date(item.createTime))
                return item
              })
              console.log(self.lists)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    onShow() {
      this.get_index_list()
    },
    created() {
      // this.get_index_list()
    },
    onPullDownRefresh() {

      this.get_index_list()
      wx.stopPullDownRefresh();
    },
    onShareAppMessage(options) {
      var that = this;
      // 设置菜单中的转发按钮触发转发事件时的转发内容
      var shareObj = {
        title: "转发的标题", // 默认是小程序的名称(可以写slogan等)
        path: '/pages/share/share', // 默认是当前页面，必须是以‘/’开头的完整路径
        imgUrl: '../../static/img/转发@2x.png', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
        success: function (res) {
          // 转发成功之后的回调
          if (res.errMsg == 'shareAppMessage:ok') {
            console.log('转发成功')
          }
        },
        fail: function () {
          // 转发失败之后的回调
          if (res.errMsg == 'shareAppMessage:fail cancel') {
            // 用户取消转发
          } else if (res.errMsg == 'shareAppMessage:fail') {
            // 转发失败，其中 detail message 为详细失败信息
          }
        },
        complete: function () {
          // 转发结束之后的回调（转发成不成功都会执行）
        }
      }
      // 来自页面内的按钮的转发
      if (options.from == 'button') {
        var eData = options.target.dataset;
        console.log(eData.name); // shareBtn
        // 此处可以修改 shareObj 中的内容
        shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
      }
      // 返回shareObj
      return shareObj;
    }
  }
</script>

<style scoped>
  .page-main {
    background: rgb(245, 246, 248);
    margin-bottom: 150rpx;
  }
</style>