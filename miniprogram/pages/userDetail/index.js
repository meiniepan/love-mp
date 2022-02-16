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
        uid: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.dbName = 'db_user_list'
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
                    contactMaker:true,
                    contactMessage:true,
                })
            }else {
            this.setData({
                contactMaker:true,
            })
            }
        }else {
            this.setData({
                contactMessage:true,
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


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        // const db = wx.cloud.database()
        // const _ = db.command
        // db.collection(this.dbName).doc(this.data.uid).get().then(res => {
        //   this.setData({
        //     userModel: res.data
        //   })
        //   wx.hideLoading()
        //   wx.showToast({
        //     title: '缘分已开启,感兴趣就抓紧联系吧',
        //     icon: 'none',
        //     duration:2000
        //   })
        //   wx.stopPullDownRefresh()
        // }).catch(e => {
        //   if (e.errCode == -1){
        //     this.dbName = 'db_user_list_boys'
        //     this.onPullDownRefresh()
        //   }else{
        //     wx.stopPullDownRefresh()
        //   }
        // })
        // this.setData({
        //   pagesNum: getCurrentPages().length
        // })
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

    },

    doContactMaker() {
        showModal(
            "打电话给红娘 "+this.data.userModel.maker_phone,
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
