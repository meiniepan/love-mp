const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userModel: null,
    menuRect: {},
    systemInfoObj: {},
    pagesNum: 0,
    videoAdClockisEnded: false,
    uid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.dbName = 'db_user_list'
    this.setData({
      userModel: JSON.parse(options.data)
    })

    let that = this
    wx.getSystemInfo({
      success: function(res) {
        let menuRect = wx.getMenuButtonBoundingClientRect()
        that.setData({
          systemInfoObj: res,
          menuRect: menuRect
        })
      },
    })
  },


  backClick() {
    wx.navigateBack({

    })
  },
  previewImage(url){
    let array = []
    this.data.userModel.photoAlbum.forEach(element => {
        array.push(element.url)
    });
    wx.previewImage({
      current: url.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: array // 需要预览的图片http链接列表
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // const db = wx.cloud.database()
    // const _ = db.command
    // db.collection(this.dbName).doc(this.data.uid).get().then(res => {
    //   this.setData({
    //     userModel: res.data
    //   })
    //   wx.hideLoading()
    //   wx.showToast({
    //     title: '缘分已开启,感兴趣就抓紧联系吧',
    //     icon: 'none',
    //     duration:2000
    //   })
    //   wx.stopPullDownRefresh()
    // }).catch(e => {
    //   if (e.errCode == -1){
    //     this.dbName = 'db_user_list_boys'
    //     this.onPullDownRefresh()
    //   }else{
    //     wx.stopPullDownRefresh()
    //   }
    // })
    // this.setData({
    //   pagesNum: getCurrentPages().length
    // })
  },
  copyIdNum(){
    wx.setClipboardData({
      data: this.data.userModel._id,
      success: function (res) {
        
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  
  reportClick(){
    // this.onShareAppMessage = 1
    // wx.navigateTo({
    //   url: '../report/index?uid=' + this.data.userModel._id,
    // })
  },
  userNeedKnow(){
    this.onShareAppMessage = 1
    wx.navigateTo({
      url: '../userNeedKnow/index',
    })
  },
  
  /**
       * 生命周期函数--监听页面显示
       */
  onShow: function () {
    if (this.onShareAppMessage == 2) {
      // 在页面中定义插屏广告
      let interstitialAd = null

      // 在页面onLoad回调事件中创建插屏广告实例
      if (wx.createInterstitialAd) {
        interstitialAd = wx.createInterstitialAd({
          adUnitId: 'adunit-d14ce629abad2244'
        })
        interstitialAd.onLoad(() => { })
        interstitialAd.onError((err) => { })
        interstitialAd.onClose(() => { })
      }

      // 在适合的场景显示插屏广告
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error(err)
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.onShareAppMessage == 1) {
      this.onShareAppMessage = 2
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    this.onShareAppMessage = 1
    return {
      title: this.data.userModel.introduce,
      path: '/pages/userDetail/index?uid=' + this.data.userModel._id, 
      success: function (res) {
        
      },
      fail: function (res) {
      }
    }
  }
})
