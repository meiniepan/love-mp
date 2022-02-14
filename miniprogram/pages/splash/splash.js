// pages/splash/splash.js
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
        this.login()
    },

    login() {
        setTimeout(() => {

                // wx.redirectTo({
                //     url: '/packageA/pages/notice/notice',
                // })
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