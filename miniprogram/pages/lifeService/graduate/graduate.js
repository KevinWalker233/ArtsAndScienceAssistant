const app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    text: ""
    // text: "时间是这个世界上最好的跨度\n让惨痛变得苍白，让执着的人选择离开\n然后历经沧桑人来人往，你会明白\n万般皆是命，半点不由人。✨\n寄出一封写给毕业时"
  },
  input(res) {
    this.setData({
      text: res.detail.value
    })
  },
  send(res) {
    wx.showLoading({
      title: '正在寄出',
    })
    var time = util.formatTime(new Date());
    var text = this.data.text
    var user = app.globalData.user
    var account = wx.getStorageSync('account')
    var graduateYear = this.data.graduateYear
    this.account = account
    if (graduateYear != null && account != "" && text != "") {
      wx.cloud.callFunction({
        name: 'sendGraduate',
        data: {
          account: account,
          text: text,
          user: user,
          time: time,
          graduateYear: graduateYear
        },
        success: function (res) {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '寄出成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '寄出失败',
            icon: 'error',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '信息不全',
        icon: 'error',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#E7E7E7',
      animation: {
        duration: 500,
        timingFunc: 'easeInOut'
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
    this.setData({
      name: app.globalData.user[6],
      graduateYear: parseInt(app.globalData.user[2]) + 4
    })
    // wx.cloud.database()
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