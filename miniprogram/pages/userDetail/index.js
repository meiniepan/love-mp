const consts = require("../../utils/consts");
const {isEmpty} = require("../../utils/util");
const {showModal} = require("../../utils/util");
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
        uid: '',
        message: "",
        showContent:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            showContent:wx.getStorageSync("online")
        })

        let data = JSON.parse(options.data)
        console.log("data", data)
        if (data.photoAlbum.length > 0) {
            app.getUrl(data.photoAlbum, () => {
                this.setData({
                    userModel: data
                })
            })
        } else {
            this.setData({
                userModel: data
            })
        }
        let contactArray = ["给ta留言"]
        if (data.maker_phone.length > 0) {
            if (data.authMaker) {
                this.setData({
                    contactMaker: true,
                    contactMessage: true,
                })
            } else {
                this.setData({
                    contactMaker: true,
                })
            }
        } else {
            this.setData({
                contactMessage: true,
            })
        }
        let that = this
        wx.getSystemInfo({
            success: function (res) {
                let menuRect = wx.getMenuButtonBoundingClientRect()
                that.setData({
                    systemInfoObj: res,
                    menuRect: menuRect
                })
            },
        })
    },


    backClick() {
        wx.navigateBack({})
    },
    previewImage(url) {
        let array = []
        this.data.userModel.photoAlbum.forEach(element => {
            array.push(element.avatar.url)
        });
        wx.previewImage({
            current: url.currentTarget.dataset.url, // 当前显示图片的http链接
            urls: array // 需要预览的图片http链接列表
        })
    },


    copyIdNum() {
        wx.setClipboardData({
            data: this.data.userModel._id,
            success: function (res) {

            }
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },


    reportClick() {
        // this.onShareAppMessage = 1
        // wx.navigateTo({
        //   url: '../report/index?uid=' + this.data.userModel._id,
        // })
    },
    userNeedKnow() {
        this.onShareAppMessage = 1
        wx.navigateTo({
            url: '../userNeedKnow/index',
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },
    /**
     * 用户点击右上角分享
     */

    doContact() {
        this.setData({
            showModal: true,
        })
    },
    onContact() {
        if (this.data.message.length == 0) {
            wx.showToast({
                icon: "none",
                title: '内容不能为空！',
            })
            return
        }
        let json = wx.getStorageSync("my_userinfo")
        if (json instanceof Object) {
            if(isEmpty(json.nickName)){
                wx.showToast({
                    icon: "none",
                    title: '请先发布你的个人信息后再留言！',
                })
                return
            }else {

            }
        }else {
            wx.showToast({
                icon: "none",
                title: '请先发布你的个人信息后再留言！',
            })
            return
        }
        let data = {

            from: wx.getStorageSync("openid"), to: this.data.userModel._openid,
            userInfo: json,
            nickName: json.nickName,
            message: this.data.message,
        }
        app.onAdd(consts.db_message, data, () => {
            wx.showToast({
                icon: "none",
                title: '留言成功！',
            })
            this.setData({
                showModal: false,
            })
        })
    },

    doInput: function (e) {
        let type = e.currentTarget.dataset.type;
        let v = e.detail.value
        this.setData({
            [type]: v,
        });
    },

    doContactMaker() {
        showModal(
            "打电话给红娘 " + this.data.userModel.maker_phone,
            "温馨提示",
            (res) => {
                if (res.confirm) {
                    wx.makePhoneCall({
                        phoneNumber: this.data.userModel.maker_phone,
                    })
                }
            }
        )
    }

})
