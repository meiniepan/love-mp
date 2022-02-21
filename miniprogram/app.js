//app.js
App({
    onLaunch: function () {

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                traceUser: true,
            })
        }

        // 展示本地存储能力
        wx.getSystemInfo({
            success: (res) => {
                this.globalData.systemInfo = res;
                if (res.model.search('iphone X') !== -1) {
                    this.globalData.isIpohoneX = true;
                }
                // if (res.screenHeight - res.windowHeight - res.statusBarHeight - 34 > 72) {
                //     this.globalData.isFullScreen = true;
                // }

                this.globalData.statusBarHeight = res.statusBarHeight;
                let capsuleBound = wx.getMenuButtonBoundingClientRect();
                this.globalData.navigationHeight = capsuleBound.top - res.statusBarHeight + capsuleBound.bottom;
            }
        });

    },
    checkUpdate() {
        const updateManager = wx.getUpdateManager()

        updateManager.onCheckForUpdate(res => {
            // 请求完新版本信息的回调
        })

        updateManager.onUpdateReady(function () {
            showModal(
                '新版本已经准备好，是否重启应用？',
                '更新提示',
                (res) => {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            )
        })

        updateManager.onUpdateFailed(function () {
            // 新版本下载失败
        })
    },

    onAdd: function (collectionName, data, func) {

        wx.showLoading({
            title: '加载中',
        })

        const db = wx.cloud.database()
        data.createTime = db.serverDate()
        db.collection(collectionName).add({
            data: data,
            success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                wx.hideLoading()

                func()
            },
            fail: err => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '新增数据失败'
                })
            }
        })
    },

    onQuery(collectionName) {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        wx.showLoading({
            title: '加载中',
        })
        db.collection(collectionName).where({
            _openid: wx.getStorageSync("openid")
        }).get({
            success: res => {
                wx.hideLoading()

                if (res.data.length > 0) {
                    return res.data
                } else {
                    return []
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

    onUp: function (id, dataArray) {

        const db = wx.cloud.database()
        wx.showLoading({
            title: '更新中',
        })
        db.collection('maps').doc(id).update({
            data: {
                dataArray: dataArray
            },

            success: res => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '更新数据成功'
                })
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

    onDelete: function (collection, id, func) {
        const db = wx.cloud.database()
        db.collection(collection).doc(id).remove({
            success: res => {
                wx.showToast({
                    title: '删除成功',
                })
                func()
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '删除失败',
                })
                console.error('[数据库] [删除记录] 失败：', err)
            }
        })
    },

    getUrl(array, func) {
        let num = 0
        let fileArray = wx.getStorageSync("file_array")
        if (fileArray instanceof Array) {

        } else {
            fileArray = []
        }
        console.log("array", array)
        array.forEach(it => {

            let has = false
            let index = 0
            for (let i = 0; i < fileArray.length; i++) {
                if (fileArray[i][0] == it.avatar.fileID) {
                    has = true
                    index = i
                    break
                }
            }

            if (has) {
                it.avatar.url = fileArray[index][1]
                num++
                if (num == array.length) {
                    func()
                }
            } else {
                wx.cloud.downloadFile({
                    fileID: it.avatar.fileID, // 文件 ID
                    success: res => {
                        // 返回临时文件路径
                        fileArray.push([it.avatar.fileID, res.tempFilePath])
                        wx.setStorageSync("file_array", fileArray)
                        it.avatar.url = res.tempFilePath
                        num++
                        if (num == array.length) {
                            func()
                        }
                    },
                    fail: console.error
                })
            }

        })
    },

    // 定义调用云函数获取openid
    getOpenid() {
        wx.cloud.callFunction({
            name: 'get',
            complete: res => {
                var openid = res.result.openid
                console.log("openid", openid)
                wx.setStorageSync("openid", openid)
                return openid
            }
        })
    },

    globalData: {
        statusBarHeight: 0,
        navigationHeight: 0,
    }
})
