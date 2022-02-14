Page({

    /**
     * 页面的初始数据
     */
    data: {
        mData: {avatar:"../../images/user-unlogin.png",photoAlbum:[],
            baseInfoTags: [{key:"earning"}, {key:"job"}, {key:"school"},
                {key:"marriage"}, {key:"hasBaby"}, {key:"needBaby"},
                {key:"house"}, {key:"car"}, {key:"town"},
                {key:"weight"}, {key:"bodily"}, {key:"nationality"},
                {key:"whatTimeMarry"}, {key:"smoke"},
            ],
            matchInfoTags: [{key:"age2"},{key:"height2"},{key:"earning2"},
                {key:"school2"},{key:"marriage2"},{key:"bodily2"},
                {key:"town2"},{key:"hasBaby2"},{key:"needBaby2"},
                {key:"smoke2"},],},
        region: ['山西省', '运城市', '临猗县'],
        sex: wx.getStorageSync("sex"),
        birthday: '1995-01-01',
        heightForPerson: [],
        weightForPerson: [],
        tabItemViewFix: false,
        height: 50,
        weight: 10,
        tabItemAt: 0,
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

        } else if (options.type == "view") {
            if (options.id == "me") {
                let json = wx.getStorageSync("my_userinfo")
                if (json.length == 0) {
                    return
                }
                let mData = JSON.parse(json)
                this.setData({
                    mData
                })
            } else {
            }

        }
        let userInfoDefaultModel = wx.getStorageSync('userInfoDefaultModel')
        for (let index = 120; index < 212; index++) {
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

    doUpdate(){
        wx.setStorageSync("my_userinfo",JSON.stringify(this.data.mData))
        wx.showToast({
            icon:"none",
            title: '发布成功！',
        })
    },

    addPic(){
        if (this.data.mData.photoAlbum.length>4){
            return
        }
        wx.chooseImage({
            success: res => {
                this.data.mData.photoAlbum.push({url:res.tempFilePaths })
                this.setData({
                    mData: this.data.mData
                })
            }
        })
    },
    addAvatar(){
        wx.chooseImage({
            success: res => {
                this.data.mData.avatar=res.tempFilePaths
                this.setData({
                    mData: this.data.mData
                })
            }
        })
    },
    delPic(e){
        let p = e.currentTarget.dataset.position
        this.data.mData.photoAlbum.splice(p,1)
        this.setData({
            mData: this.data.mData
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
        if (type=="0"){
            this.data.mData.baseInfoTags = v
        }else if (type=="1"){
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
        this.data.mData.[type] = data[p]
        this.setData({
            mData: this.data.mData,
        })
    },

})