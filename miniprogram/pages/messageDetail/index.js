//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},

  },


  onLoad: function(options) {
    this.setData({
      message:options.message
    })

  },
  onShow() {

  }

})
