var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '', //账号
    password: '', //密码
    error: { //这个是头顶的反馈
      type: '',
      text: ''
    },
    cardInform: [] //用户数据
  },
  refresh(res) { //点击刷新按钮
    wx.navigateTo({
      url: "/pages/loginCard/loginCard",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({ //获取本地账号数据
      key: 'cardAccount',
      success(res) {
        console.log(res)
        that.setData({
          account: res.data
        })
      },
      fail(res) {
        console.log(res)
        wx.navigateTo({
          url: "/pages/loginCard/loginCard",
        })
      }
    })

    wx.getStorage({ //获取本地密码数据
      key: 'cardPassword',
      success(res) {
        console.log(res)
        that.setData({
          password: res.data
        })
      },
      fail(res) {
        console.log(res)
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
    var that = this
    wx.getStorage({
      key: 'cardInform',
      success(res) {
        app.globalData.cardInform = [].concat(JSON.parse(res.data))
        that.setData({
          cardInform: [].concat(JSON.parse(res.data))
        })
        console.log(that.data.cardInform)
      }
    })

    wx.getStorage({ //获取本地账号数据
      key: 'cardAccount',
      success(res) {
        console.log(res)
        that.setData({
          account: res.data
        })
      },
      fail(res) {
        console.log(res)
      }
    })

    wx.getStorage({ //获取本地密码数据
      key: 'cardPassword',
      success(res) {
        console.log(res)
        that.setData({
          password: res.data
        })
      },
      fail(res) {
        console.log(res)
      }
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