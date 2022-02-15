Page({

    /**
     * 页面的初始数据
     */
    data: {

        isMaker: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.getStorageSync("user_type") == "maker"||wx.getStorageSync("user_type") == "manager") {
            this.setData({
                isMaker: true
            })
        }

    },

    jumpToDetail(e) {
        if (e.currentTarget.dataset.item == "我的资料") {
            wx.navigateTo({
                url: '../info/index?type=view&id=me',
            })
        } else if (e.currentTarget.dataset.item == "交友须知") {
            wx.navigateTo({
                url: '../userNeedKnow/index',
            })
        } else if (e.currentTarget.dataset.item == "红娘资源") {
            wx.navigateTo({
                url: '../makerRes/makerRes?type=me',
            })
        }else if (e.currentTarget.dataset.item == "切换身份") {
            wx.setStorageSync("user_type","")
            wx.redirectTo({
                url: '/pages/switch_role/switch_role',
            })
        }
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