// pages/switch_role/switch_role.js
import {formatCode} from "../../utils/util";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: "",
        pwd: "",
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

    btn1() {
        wx.setStorageSync("user_type", "boy")
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    btn2() {
        wx.setStorageSync("user_type", "girl")
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    btn3() {
        this.setData({
            showModal: true,
            loginType: "maker"
        })

    },
    btn4() {
        this.setData({
            showModal: true,
            loginType: "manager"
        })

    },

    doInput: function (e) {
        let type = e.currentTarget.dataset.type;
        let v = e.detail.value
        this.setData({
            [type]: v,
        });
    },

    doLogin() {
        if (this.data.phone.length == 0 || this.data.pwd.length == 0) {
            wx.showToast({
                icon: 'none',
                title: '请完善数据'
            })
            return
        }
        if (this.data.loginType == "maker") {
            this.login("match_makers", "maker")
        } else if (this.data.loginType == "manager") {
            this.login("account_manager", "manager")
        }
    },
    login(collectionName, user_type) {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        wx.showLoading({
            title: '加载中',
        })
        db.collection(collectionName).where({
            phone: this.data.phone
        }).get({
            success: res => {
                wx.hideLoading()
                console.log("res", res)
                if (res.data.length > 0) {
                    let pwd = res.data[res.data.length - 1].pwd
                    console.log("pwd", pwd)
                    if (pwd == this.data.pwd) {
                        this.setData({
                            showModal: false
                        })
                        wx.setStorageSync("user_type", user_type)
                        wx.setStorageSync("phone",this.data.phone)
                        wx.setStorageSync("maker_info",this.data)
                        wx.switchTab({
                            url: '/pages/index/index',
                        })
                        wx.showToast({
                            icon: 'none',
                            title: '登录成功！'
                        })
                    } else {
                        wx.showToast({
                            icon: 'none',
                            title: '账号或密码错误'
                        })
                    }
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '账号或密码错误'
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