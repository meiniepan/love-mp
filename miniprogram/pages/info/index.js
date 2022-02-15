const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mData: {
            avatar: {url: "../../images/user-unlogin.png", fileID: ""},
            photoAlbum: [],
            baseInfoTags: [{key: "earning"}, {key: "job"}, {key: "school"},
                {key: "marriage"}, {key: "hasBaby"}, {key: "needBaby"},
                {key: "house"}, {key: "car"}, {key: "town"},
                {key: "weight"}, {key: "bodily"}, {key: "nationality"},
                {key: "whatTimeMarry"}, {key: "smoke"},
            ],
            matchInfoTags: [{key: "age2"}, {key: "height2"}, {key: "earning2"},
                {key: "school2"}, {key: "marriage2"}, {key: "bodily2"},
                {key: "town2"}, {key: "hasBaby2"}, {key: "needBaby2"},
                {key: "smoke2"},],
            maker_phone: "",
            sex: "",
            birthday: '1995-01-01',
            age: '1995-01-01',
            order:"0",
        },
        region: ['山西省', '运城市', '临猗县'],
        sexArray: ["女", "男"],
        birthday: '1995-01-01',

        heightForPerson: [],
        weightForPerson: [],
        tabItemViewFix: false,
        tabItemAt: 0,
        type: "",
    },
    changeItemData(e) {
        this.setData({
            tabItemAt: e.currentTarget.dataset.id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.type == "new") {
            this.data.mData.maker_phone = options.id
            this.setData({
                mData: this.data.mData
            })
        } else if (options.type == "view") {
            if (options.id == "me") {
                let json = wx.getStorageSync("my_userinfo")
                if (json.length == 0) {
                    this.query()
                } else {
                    let mData = JSON.parse(json)
                    console.log("data", mData)
                    this.setData({
                        mData
                    })
                }

            } else {
            }

        }
        this.data.mData.sex = wx.getStorageSync("user_type") == "boy" ? "男" : "女"
        let birth = this.data.mData.birthday.substring(0,4)
        let aa = new Date().getFullYear()
        let age = aa - birth
        this.data.mData.age = age +"岁"
        this.setData({
            type: options.type,
            mData: this.data.mData,
        })
        let userInfoDefaultModel = wx.getStorageSync('userInfoDefaultModel')
        for (let index = 140; index < 190; index++) {
            this.data.heightForPerson.push(index + 'cm')
        }
        for (let index = 40; index < 131; index++) {
            let str = index
            if (index == 40) {
                str = 40 + 'kg以下'
                this.data.weightForPerson.push(str)
            } else if (index == 130) {
                str = 130 + 'kg以上'
                this.data.weightForPerson.push(str)
            } else {
                this.data.weightForPerson.push(str + 'kg')
            }
        }

        this.setData({
            heightForPerson: this.data.heightForPerson,
            weightForPerson: this.data.weightForPerson
        })


        this.getTopHeight()
    },

    doFinish() {
        wx.navigateBack({
            delta: 1,
        })
    },


    doUpdate() {

        if (this.data.type == "new") {
            this.dbAdd("new")
        } else if (this.data.type == "view") {
            let json = wx.getStorageSync("my_userinfo")
            if (json.length == 0) {
                this.dbAdd("view")
            } else {
                this.update("view")
            }
        }
        wx.setStorageSync("my_userinfo", JSON.stringify(this.data.mData))

    },
    query() {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        wx.showLoading({
            title: '加载中',
        })
        db.collection("db_person").where({
            _openid: wx.getStorageSync("openid")
        }).get({
            success: res => {
                wx.hideLoading()
                console.log("res", res)
                if (res.data.length > 0) {
                    wx.setStorageSync("my_userinfo", res)
                    this.setData({
                        mData: res.data
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
    update(type) {
        const db = wx.cloud.database()
        wx.showLoading({
            title: '更新中',
        })
        db.collection('db_person').doc(wx.getStorageSync("openid")).update({
            data: this.data.mData,

            success: res => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '更新数据成功'
                })
                this.doFinish()
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
    dbAdd(type) {
        app.onAdd("db_person", this.data.mData, () => {
            if (type == "view") {
                wx.setStorageSync("my_userinfo", JSON.stringify(this.data.mData))
            }
            this.doFinish()
            wx.showToast({
                icon: "none",
                title: '发布成功！',
            })
        })
    },
    addPic() {
        if (this.data.mData.photoAlbum.length > 4) {
            return
        }
        wx.chooseImage({
            sizeType: ['compressed'],
            success: res0 => {
                wx.showLoading({
                    title: '加载中',
                })

                wx.cloud.uploadFile({
                    cloudPath: (new Date()).valueOf() + ".png", // 上传至云端的路径
                    filePath: res0.tempFilePaths[0], // 小程序临时文件路径
                    success: res => {
                        // 返回文件 ID
                        wx.hideLoading()
                        this.data.mData.photoAlbum.push({url: res0.tempFilePaths[0], fileID: res.fileID})
                        console.log("photoAlbum", this.data.mData.photoAlbum)
                        this.setData({
                            mData: this.data.mData
                        })
                    },
                    fail: console.error
                })


            }
        })
    },
    addAvatar() {
        wx.chooseImage({
            sizeType: ['compressed'],
            success: res0 => {
                wx.showLoading({
                    title: '加载中',
                })
                if (this.data.mData.avatar.fileID.length > 0) {
                    this.removeCloudFile(this.data.mData.avatar.fileID)
                }
                wx.cloud.uploadFile({
                    cloudPath: (new Date()).valueOf() + ".png", // 上传至云端的路径
                    filePath: res0.tempFilePaths[0], // 小程序临时文件路径
                    success: res => {
                        // 返回文件 ID
                        wx.hideLoading()
                        this.data.mData.avatar.fileID = res.fileID
                        this.data.mData.avatar.url = res0.tempFilePaths[0]
                        this.setData({
                            mData: this.data.mData
                        })
                        console.log(res)
                    },
                    fail: console.error
                })

            }
        })
    },
    delPic(e) {
        let p = e.currentTarget.dataset.position
        console.log("p", p)
        this.removeCloudFile(this.data.mData.photoAlbum[p].fileID, () => {
            this.data.mData.photoAlbum.splice(p, 1)
            this.setData({
                mData: this.data.mData
            })
        })

    },
    removeCloudFile(fileID, func) {
        let fileList = []
        fileList.push(fileID)
        wx.cloud.deleteFile({
            fileList: fileList,
            success: res => {
                // handle success
                func()
                console.log(res.fileList)
            },
            fail: console.error
        })
    },
    getTopHeight() {
        let that = this
        const query = wx.createSelectorQuery()
        query.select('#tabItemView').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res) {
            that.tabItemViewTop = res[0].top
        })
    },
    onPageScroll(e) {
        let top = e.scrollTop;
        let that = this
        let status = top >= this.tabItemViewTop
        if (status != this.data.tabItemViewFix) {
            that.setData({
                tabItemViewFix: status
            })
        }

    },

    bindRegionChange(e) {
        let type = e.currentTarget.dataset.type;
        this.data.mData.[type] = e.detail.value.toString()
        console.log("data", this.data.mData)
        this.setData({
            mData: this.data.mData,
        })
    },

    bindDateChange(e) {
        let type = e.currentTarget.dataset.type;
        this.data.mData.[type] = e.detail.value.toString()
        console.log("data", this.data.mData)
        this.setData({
            mData: this.data.mData,
        })
    },

    changeData(e) {
        let type = ""
        type = e.detail.type
        let v = e.detail.value
        if (type == "0") {
            this.data.mData.baseInfoTags = v
        } else if (type == "1") {
            this.data.mData.matchInfoTags = v
        }

        this.setData({
            mData: this.data.mData,
        })
    },

    doInput: function (e) {
        let type = e.currentTarget.dataset.type;
        let v = e.detail.value
        this.data.mData.[type] = v
        this.setData({
            mData: this.data.mData,
        });
    },

    bindHeightChange(e) {
        let type = e.currentTarget.dataset.type;
        let data = e.currentTarget.dataset.data;
        let p = e.detail.value
        if (type == "birthday"){
            let birth = data[p].substring(0,4)
            let aa = new Date().getFullYear()
            let age = aa - birth
            this.data.mData.age = age+"岁"
        }
        this.data.mData.[type] = data[p]
        this.setData({
            mData: this.data.mData,
        })
    },

})