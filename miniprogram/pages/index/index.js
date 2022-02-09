//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    systemInfoObj: null,
    menuRect: null,
    listData: [],
  },

  onLoad: function() {
    let that = this
    that.loadGirl = true
    that.dbName = 'db_user_list'
    that.pageNum = 0

    wx.getSystemInfo({
      success: function(res) {
        let menuRect = wx.getMenuButtonBoundingClientRect()
        that.setData({
          systemInfoObj: res,
          menuRect: menuRect
        })
      },
    })
   let listData = []
    let demo = {avatar:"../../images/girl_0.jpg",nickname:"小美",realnameAuthStatus:"pass",
      city:"临猗",
      _id:"232",
      gender:"2",
      baseInfoTags: {one:["有房","有车","5000",],two:["大学本科","性格好","会做饭",]},
      matchInfoTags: ["有房","有车","8000",],
      realname: {authStatus:"pass"},
      workPlace:"临猗",age:"25岁",introduce:"阳光开朗",photoAlbum:[{url:"../../images/girl_0.jpg"},{url:"../../images/girl_0.jpg"},{url:"../../images/girl_0.jpg"}]}
    for (let i = 0; i < 20; i++) {

    listData.push(demo)
    }

    that.setData({
      listData
    })


  },

  // onPullDownRefresh() {
  //
  //   wx.showLoading({
  //     title: '加载中...',
  //   })
  //   const db = wx.cloud.database()
  //   const _ = db.command
  //   db.collection(this.dbName).where({
  //     age: _.eq('20')
  //       .or(_.eq('21'))
  //
  //   }).skip(20 * this.pageNum).get().then(res => {
  //     this.setData({
  //       listData: res.data
  //     })
  //     wx.stopPullDownRefresh()
  //     wx.hideLoading()
  //     this.pageNum ++
  //   }).catch(e=>{
  //     wx.stopPullDownRefresh()
  //   })
  //
  // },

  // onReachBottom() {
  //   const db = wx.cloud.database()
  //   const _ = db.command
  //   wx.showLoading({
  //     title: '加载中...',
  //   })
  //   db.collection(this.dbName).where({
  //     age: _.eq('20')
  //       .or(_.eq('21'))
  //
  //   }).skip(20 * this.pageNum).get().then(res => {
  //     this.setData({
  //       listData: this.data.listData.concat(res.data)
  //     })
  //     wx.hideLoading()
  //     this.pageNum++
  //   })
  //
  // },
  jumpToDetail(e) {
    let data = e.currentTarget.dataset.data;
    wx.navigateTo({
      url: '../userDetail/index?data='  + JSON.stringify(data),
    })
  },


  onShareAppMessage: function () {
    this.onShareAppMessage = 1
    return {
      title: '临猗鸳鸯网 waiting for you 😝',
      path: '/pages/index/index',
      success: function (res) {

      },
      fail: function (res) {
      }
    }
  },
  // 上传图片
  doUpload: function() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})