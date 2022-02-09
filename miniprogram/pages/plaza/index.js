//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    systemInfoObj:null,
    menuRect:null,
    listData:[
      1,
      2,
    ],
  },
  jumpToDetail(item){
    wx.navigateTo({
      url: '../plazaDetail/index?id=' + 1,
    })
  },
  previewImage() {

  },

  onLoad: function() {
    let that = this
    that.pageNum = 1
    wx.getSystemInfo({
      success: function(res) {
        let menuRect = wx.getMenuButtonBoundingClientRect()
        that.setData({
          systemInfoObj:res,
          menuRect: menuRect
        })
      },
    })
  //  wx.startPullDownRefresh({
     
  //  })


  },



  onShareAppMessage: function () {
    this.onShareAppMessage = 1
    return {
      title: '临猗鸳鸯网 waiting for you 😝',
      path: '/pages/plaza/index',
      success: function (res) {

      },
      fail: function (res) {
      }
    }
  },



})
