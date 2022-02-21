//index.js
const consts = require("../../utils/consts");
const {formatDate} = require("../../utils/util");
const {showModal} = require("../../utils/util");
const app = getApp()

Page({
    data: {
        userInfo: {},
        mData: [],
        userInfos: [],
        isEmpty: true,
    },


    onLoad: function () {
        if (wx.getStorageSync("online")) {
            this.getData()
        }

    },

    onShow() {

    },
    onPullDownRefresh() {
        if (wx.getStorageSync("online")) {
            this.getData()
        } else {
            wx.stopPullDownRefresh()
        }
    },
    getData() {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters

        let condition = {
            to: wx.getStorageSync("openid")
        }
        db.collection(consts.db_message)
            .orderBy('createTime', 'desc')
            .where(condition)
            .get({
                success: res => {

                    if (res.data.length > 0) {
                        let userInfos = []
                        res.data.forEach(it => {
                            it.userInfo._id = it._id
                            it.userInfo.hint = it.nickName + " 给你留言了！\n"+formatDate(it.createTime)
                            it.userInfo.message = it.message
                            userInfos.push(it.userInfo)
                        })
                        app.getUrl(userInfos, () => {
                            this.setData({
                                mData: res.data,
                                userInfos,
                                isEmpty: false,
                            })
                            wx.stopPullDownRefresh()
                        })

                    } else {
                        wx.stopPullDownRefresh()
                        this.setData({
                            isEmpty: true,
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

    del(e) {
            let item = e.currentTarget.dataset.item
            showModal(
                "删除此条留言？",
                "温馨提示",
                (res) => {
                    if (res.confirm) {
                        app.onDelete(consts.db_message, item._id, () => {
                            this.getData()
                        })
                    }
                }
            )
    },

    jumpToInfo(e) {
        if (wx.getStorageSync("open_vip")){
            showModal("开通VIP后才能查看消息,具体咨询客服哦")
            return
        }
        let item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: '../userDetail/index?data=' + JSON.stringify(item),
        })
    },

    jumpToDetail(e) {
        if (wx.getStorageSync("open_vip")){
            showModal("开通VIP后才能查看消息,具体咨询客服哦")
            return
        }
        let item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: '../messageDetail/index?message=' + item.message,
        })
    },


})
