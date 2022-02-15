//index.js
const app = getApp()

Page({
    data: {
        avatarUrl: './user-unlogin.png',
        userInfo: {},
        listData: [],
        loadMore: true,
        sex: "女",
    },

    onLoad: function () {
        app.checkUpdate()
        let openid = wx.getStorageSync("openid")
        if (openid.length == 0) {
            openid = app.getOpenid()
        }
        let sex = ""

        this.setData({
            openid: openid,
            sex: sex
        })

        let that = this
        that.dbName = 'db_person'
        that.pageNum = 0
        wx.startPullDownRefresh()
    },

    onPullDownRefresh() {
        this.pageNum = 0
        this.setData({
            loadMore: true,
        })
        wx.showLoading({
            title: '加载中...',
        })
        const db = wx.cloud.database()
        const _ = db.command
        let condition = {}
        if (wx.getStorageSync("user_type") == "boy") {
            condition = {
                sex: "女"
            }
        } else if (wx.getStorageSync("user_type") == "girl") {
            condition = {
                sex: "男"
            }
        } else {
            condition = {}
        }
        db.collection(this.dbName)
            .orderBy('order', 'desc')
            .where(condition).skip(20 * this.pageNum)
            .limit(20).get()
            .then(res => {
                console.log("res", res)
                if (res.data.length > 0) {
                    this.getUrl(res.data, () => {
                        this.setData({
                            listData: res.data
                        })
                        wx.stopPullDownRefresh()
                        wx.hideLoading()
                        this.pageNum++
                    })
                } else {
                    wx.stopPullDownRefresh()
                    wx.hideLoading()
                }

            }).catch(e => {
            wx.stopPullDownRefresh()
        })

    },

    onReachBottom() {
        if (this.data.loadMore == false) {
            return
        }
        const db = wx.cloud.database()
        const _ = db.command
        wx.showLoading({
            title: '加载中...',
        })
        let condition = {}
        if (wx.getStorageSync("user_type") == "boy") {
            condition = {
                sex: "女"
            }
        } else if (wx.getStorageSync("user_type") == "girl") {
            condition = {
                sex: "男"
            }
        } else {
            condition = {}
        }
        db.collection(this.dbName)
            .orderBy('order', 'desc')
            .where(condition).skip(20 * this.pageNum)
            .limit(20).get()
            .then(res => {
                console.log("res", res)
                if (res.data.length == 0) {
                    this.setData({
                        loadMore: false,
                    })
                    wx.hideLoading()
                    this.pageNum++
                } else {
                    this.getUrl(res.data, () => {
                        this.setData({
                            listData: this.data.listData.concat(res.data)
                        })
                        wx.hideLoading()
                        this.pageNum++
                    })

                }


            })

    },

    getUrl(array, func) {
        let num = 0
        array.forEach(it => {
            let place = it.workPlace.split(",")
            if (place.length == 3) {
                if (place[1] == "运城市") {
                    it.workPlace = place[2]
                } else if (place[0] == "山西省") {
                    it.workPlace = place[1]
                } else {
                    it.workPlace = place[0]
                }
            }
            wx.cloud.downloadFile({
                fileID: it.avatar.fileID, // 文件 ID
                success: res => {
                    // 返回临时文件路径
                    it.avatar.url = res.tempFilePath
                    num++
                    if (num == array.length) {
                        func()
                    }
                },
                fail: console.error
            })
        })
    },
    jumpToDetail(e) {
        let data = e.currentTarget.dataset.data;
        wx.navigateTo({
            url: '../userDetail/index?data=' + JSON.stringify(data),
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
    doUpload: function () {
        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {

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