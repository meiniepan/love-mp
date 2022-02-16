// pages/matchMaker/matchMaker.js
const consts = require("../../utils/consts");
const {showModal} = require("../../utils/util");
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mData: [],
        canAdd: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.getStorageSync("user_type") == "manager") {
            this.setData({
                canAdd: true,
            })
        }
        this.getData()

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
    getData() {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        wx.showLoading({
            title: '加载中',
        })
        db.collection(consts.db_makers).get({
            success: res => {
                wx.hideLoading()

                if (res.data.length > 0) {
                    this.setData({
                        mData: res.data
                    })
                }
            },
            fail: err => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '查询记录失败'
                })
                console.error('[数据库] [查询记录] 失败：', err)
            }
        })
    },
    doClick(e) {
        let phone = e.currentTarget.dataset.item.phone
        wx.navigateTo({
            url: '/pages/makerRes/makerRes?phone=' + phone
        })
    },
    del(e) {
        if (wx.getStorageSync("user_type") == "manager") {
            let item = e.currentTarget.dataset.item
            showModal(
                "删除此位红娘",
                "温馨提示",
                (res) => {
                    if (res.confirm) {
                        app.onDelete(consts.db_makers, item._id, () => {
                            this.getData()
                        })
                    }
                }
            )
        }
    },
    doAdd() {
        wx.navigateTo({
            url: '/pages/addMaker/addMaker'
        })
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


})