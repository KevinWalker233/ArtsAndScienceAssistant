const app = getApp()
const db = wx.cloud.database().collection("freeClassRoom")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [], // 课表色块数组
    leftClass: [] //左侧课表时间
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var wlist = JSON.parse(options.wlist)
    wlist.splice(0, 1)
    this.setData({
      wlist: wlist
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
      key: 'times',
      success(res) {
        that.setData({
          leftClass: res.data
        })
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

  },
  classClick(e) { //课表按钮被点击
    wx.vibrateShort({
      type: 'light'
    })
    wx.showModal({
      title: '详细信息',
      content: this.data.wlist[e.currentTarget.dataset.index]['courseName'] + '\r\n' +
        this.data.wlist[e.currentTarget.dataset.index]['weeks'] + '\r\n' +
        this.data.wlist[e.currentTarget.dataset.index]['teacher'] + '\r\n' +
        this.data.wlist[e.currentTarget.dataset.index]['address'].replaceAll(",","\r\n"),
      confirmText: '我知道了',
      showCancel: false
    })
  }
})