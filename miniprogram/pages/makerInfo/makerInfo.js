// pages/makerInfo/makerInfo.js
import {formatCode, isEmpty} from "../../utils/util";
import consts from "../../utils/consts";

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        mData: {},
        pwd1: "",
        pwd2: "",
        showModal: false,
        isManager: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.getStorageSync("user_type") == "manager"){
            this.setData({
                isManager: true,
            })
        }
        this.setData({
            mData: wx.getStorageSync("maker_info")
        })
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
        this.setData({
            [type]: v,
        });
    },

    doConfirm() {
        this.setData({
            showModal: true,
        })
    },

    doChange() {
        if (this.data.pwd1.length == 0 || this.data.pwd2.length == 0) {
            wx.showToast({
                icon: 'none',
                title: '密码不能为空！'
            })
            return
        }
        if (this.data.pwd1 != this.data.pwd2) {
            wx.showToast({
                icon: 'none',
                title: '两次密码不一致！'
            })
            return
        }
        if (isEmpty(this.data.mData._id)){
            return;
        }
        let condition = {_id: this.data.mData._id}
        let _id = this.data.mData._id
        let _openid = this.data.mData._openid
        delete (this.data.mData["_id"])
        delete (this.data.mData["_openid"])
        this.data.mData.pwd = this.data.pwd1
        const db = wx.cloud.database()
        wx.showLoading({
            title: '更新中',
        })
        console.log("condition", condition)
        console.log("data", this.data.mData)
        db.collection(consts.db_makers).where(condition).update({
            data: this.data.mData,

            success: res => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '更新密码成功'
                })
                this.data.mData._id = _id
                this.data.mData._openid = _openid
                this.setData({
                    showModal: false,
                })
                console.error('[数据库] [更新记录] 成功：', res)
            },
            fail: err => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '更新数据失败'
                })
                console.error('[数据库] [更新记录] 失败：', err)
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