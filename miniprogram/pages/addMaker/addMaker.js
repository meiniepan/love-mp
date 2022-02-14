// pages/addMaker/addMaker.js
import {formatCode} from "../../utils/util";

let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mData: {code: "", name: "", phone: "",pwd:"88888888"}
    },

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

    },

    doInput: function (e) {
        let type = e.currentTarget.dataset.type;
        let v = e.detail.value
        this.data.mData.[type] = v
        this.setData({
            mData: this.data.mData,
        });
    },

    doConfirm() {
        if (this.data.mData.name.length == 0 || this.data.mData.phone.length == 0) {
            wx.showToast({
                icon: 'none',
                title: '请完善数据'
            })
            return
        }

        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        wx.showLoading({
            title: '加载中',
        })
        db.collection("match_makers").get({
            success: res => {
                wx.hideLoading()

                if (res.data.length > 0) {
                    let code = res.data[res.data.length - 1].code
                    code = parseInt(code) + 1
                    code = formatCode(code+"")
                    this.data.mData.code = code
                } else {
                    this.data.mData.code = "0001"
                }
                app.onAdd("match_makers", this.data.mData)
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