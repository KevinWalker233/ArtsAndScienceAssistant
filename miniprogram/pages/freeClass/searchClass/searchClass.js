const db = wx.cloud.database().collection("freeClassRoom")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    userList: [],
    classList: [],
    showList: []
  },
  seeClass(res) {
    var name = res.currentTarget.dataset.name
    for (var i = 0; i < this.data.classList.length; i++) {
      if (this.data.classList[i][0] == name) {
        wx.navigateTo({
          url: '/pages/freeClass/freeClass?wlist=' + JSON.stringify(this.data.classList[i]),
        })
        break;
      }
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    var showList = []
    for (var i = 0; i < this.data.userList.length; i++) {
      if (this.data.userList[i].indexOf(e.detail.value) != -1) {
        showList.push(this.data.userList[i])
      }
    }
    this.setData({
      showList: showList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userList = []
    wx.showLoading({
      title: '获取中',
    })
    var a1 = false
    var a2 = false
    db.doc("0,多媒体教室").get({
      success(res1) {
        userList = userList.concat(res1.data.indexs)
        db.doc("0,一般教室").get({
          success(res2) {
            userList = userList.concat(res2.data.indexs)
            db.doc("1,多媒体教室").get({
              success(res3) {
                userList = userList.concat(res3.data.indexs)
                db.doc("1,一般教室").get({
                  success(res4) {
                    userList = userList.concat(res4.data.indexs)
                    that.setData({
                      userList: userList,
                      showList: userList
                    })
                    a1 = true
                    if (a1 && a2) {
                      wx.hideLoading()
                    }
                  }
                })
              }
            })
          }
        })
      }
    })

    var classList = []
    db.doc("多媒体教室,0").get({
      success(res1) {
        classList = classList.concat(res1.data.classList)
        db.doc("一般教室,0").get({
          success(res2) {
            classList = classList.concat(res2.data.classList)
            db.doc("多媒体教室,1").get({
              success(res3) {
                classList = classList.concat(res3.data.classList)
                db.doc("一般教室,1").get({
                  success(res4) {
                    classList = classList.concat(res4.data.classList)
                    that.setData({
                      classList: classList
                    })
                    a2 = true
                    if (a1 && a2) {
                      wx.hideLoading()
                    }
                  }
                })
              }
            })
          }
        })
      }
    })
    if (a1 && a2) {
      wx.hideLoading()
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