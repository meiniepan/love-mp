// pages/makerRes/makerRes.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mData:[],
        phone:"",
        canAdd:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let phone = ""
        let canAdd=false
        if (options.type == "me") {
            phone = wx.getStorageSync("phone")
            canAdd=true
        } else {
            phone = options.phone

        }
        this.setData({
            phone: options.phone,
            canAdd,
        })
        this.getData(phone)
    },

    getData(phone) {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        wx.showLoading({
            title: '加载中',
        })
        db.collection("db_person").where({
            maker_phone: phone
        }).get({
            success: res => {
                wx.hideLoading()
                console.log("res", res)
                if (res.data.length > 0) {
                    this.setData({
                        mData:res.data
                    })
                } else {

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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    doAdd() {
        wx.navigateTo({
            url: '../info/index?type=new&id='+this.data.phone,
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