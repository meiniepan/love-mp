//index.js
const consts = require("../../utils/consts");
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
        let db_name = consts.db_test
        if (wx.getStorageSync("online")) {
            db_name = consts.db_person
        }
        let that = this
        that.pageNum = 0
        this.setData({
            openid: openid,
            sex: sex,
            db_name,
        },()=>{
            wx.startPullDownRefresh()
        })

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
                sex: "女",
            }
        } else if (wx.getStorageSync("user_type") == "girl") {
            condition = {
                sex: "男",
            }
        } else {
            condition = {}
        }
        db.collection(this.data.db_name)
            .orderBy('order', 'desc')
            .where(condition)
            .skip(20 * this.pageNum)
            .limit(20).get()
            .then(res => {
                if (res.data.length > 0) {
                    res.data.forEach(it => {
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
                    })
                    app.getUrl(res.data, () => {
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
            console.log("e", e)
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
        db.collection(this.data.db_name)
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
                    res.data.forEach(it => {
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
                    })
                    app.getUrl(res.data, () => {
                        this.setData({
                            listData: this.data.listData.concat(res.data)
                        })
                        wx.hideLoading()
                        this.pageNum++
                    })

                }


            })

    },


    jumpToDetail(e) {
        let data = e.currentTarget.dataset.data;
        if (data.click != false) {
            wx.navigateTo({
                url: '../userDetail/index?data=' + JSON.stringify(data),
            })

        }
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

})