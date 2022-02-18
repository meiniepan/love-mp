// pages/splash/splash.js
const consts = require("../../utils/consts");
const {isEmpty} = require("../../utils/util");
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.checkOnline()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    checkOnline() {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters

        db.collection(consts.db_setting)
            .get({
                success: res => {
                    console.log("res", res)
                    if (res.data.length > 0) {
                        let online = res.data[0].online
                        let open_vip = res.data[0].open_vip
                        wx.setStorageSync("online", online)
                        wx.setStorageSync("open_vip", open_vip)
                        if (online) {
                            this.login()
                        } else {
                            wx.switchTab({
                                url: '/pages/index/index',
                            })
                        }

                    } else {

                    }
                },
                fail: err => {
                    wx.showToast({
                        icon: 'none',
                        title: '系统升级中~~'
                    })
                    console.error('[数据库] [查询记录] 失败：', err)
                }
            })
    },

    login() {
        setTimeout(() => {

                let type = wx.getStorageSync('user_type')
                if (isEmpty(type)) {
                    wx.redirectTo({
                        url: '/pages/switch_role/switch_role',
                    })
                } else {
                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                }

            }
            , 1000)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})