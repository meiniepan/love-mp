// pages/makerRes/makerRes.js
const consts = require("../../utils/consts");
const {showModal} = require("../../utils/util");
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData:[],
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
            phone: phone,
            canAdd,
        },()=>{
        this.getData()
        })
    },

    getData() {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        wx.showLoading({
            title: '加载中',
        })
        let condition = {}
        if (wx.getStorageSync("user_type") == "boy") {
            condition = {
                sex: "女",
            }
        } else if (wx.getStorageSync("user_type") == "girl") {
            condition = {
                sex: "男",
            }
        } else {
            condition = {
            }
        }
        db.collection(consts.db_person)
            .where(condition)
            .where({ maker_phone: this.data.phone})
            .get({
            success: res => {
                wx.hideLoading()
                console.log("res", res)
                if (res.data.length > 0) {
                    res.data.forEach(it=>{
                            let place = it.workPlace.split(",")
                            if (place.length == 3) {
                                if (place[1] == "运城市") {
                                    it.workPlace = place[2]
                                } else if (place[0] == "山西省") {
                                    it.workPlace = place[1]
                                } else {
                                    it.workPlace = place[0]
                                }
                            }
                    })
                    app.getUrl(res.data, () => {
                        console.log("deal")
                        this.setData({
                            listData: res.data
                        })
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

    del(e) {
        if (wx.getStorageSync("user_type") == "manager"||wx.getStorageSync("user_type") == "maker") {
            let item = e.currentTarget.dataset.item
            showModal(
                "删除这条数据？",
                "温馨提示",
                (res) => {
                    if (res.confirm) {
                        app.onDelete(consts.db_person, item._id, () => {
                            this.getData()
                        })
                    }
                }
            )
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

    jumpToDetail(e) {
        let data = e.currentTarget.dataset.data;
        if (this.data.canAdd){
            if (data.photoAlbum.length > 0) {
                app.getUrl(data.photoAlbum, () => {
                    wx.setStorageSync("my_userinfo", data)
                    wx.navigateTo({
                        url: '../info/index?type=view&id='+this.data.phone,
                    })
                })
            } else {
                wx.setStorageSync("my_userinfo", data)
                wx.navigateTo({
                    url: '../info/index?type=view&id='+this.data.phone,
                })
            }

        }else {
            wx.navigateTo({
                url: '../userDetail/index?data=' + JSON.stringify(data),
            })
        }

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