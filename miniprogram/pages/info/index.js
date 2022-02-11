Page({

  /**
   * 页面的初始数据
   */
  data: {
    mData:{},
    region: ['山西省', '运城市', '临猗县'],
    sex:wx.getStorageSync("sex"),
    birthday: '1995-01-01',
    heightForPerson: [],
    weightForPerson: [],
    tabItemViewFix: false,
    height: 50,
    weight: 10,
    tabItemAt:0,
  },
  changeItemData(e) {
    this.setData({
      tabItemAt: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  getTopHeight(){
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

  bindRegionChange(e){
    let type = e.currentTarget.dataset.type;
    this.data.mData.[type] = e.detail.value.toString()
    console.log("data",this.data.mData)
    this.setData({
      mData:this.data.mData,
    })
  },

  bindDateChange(e){
    let type = e.currentTarget.dataset.type;
    this.data.mData.[type] = e.detail.value.toString()
    console.log("data",this.data.mData)
    this.setData({
      mData:this.data.mData,
    })
  },

  changeData(e){
    let type = ""
     type = e.detail.type
    let v = e.detail.value
    this.data.mData.[type] = v
    this.setData({
      mData:this.data.mData,
    })
  },

  doInput: function (e) {
    let type = e.currentTarget.dataset.type;
    let v = e.detail.value
    this.data.mData.[type] = v
    this.setData({
      mData:this.data.mData,
    });
  },

  bindHeightChange(e) {
    let type = e.currentTarget.dataset.type;
    let data = e.currentTarget.dataset.data;
    let p = e.detail.value
    this.data.mData.[type] = data[p]
    this.setData({
      mData:this.data.mData,
    })
  },

})