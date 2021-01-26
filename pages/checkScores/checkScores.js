var app = getApp()
const configDb = wx.cloud.database().collection("config");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    xn: '', //学年
    xq: '', //学期
    jdNum: 0, //本学期所学课程数量
    xfJD: 0, //总绩点
    xfJDNum: 0, //平均绩点
    xfNum: 0 //目前已修学分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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

    configDb.doc('xqxx').get().then(res => {
      that.setData({
        xn: res.data.xn,
        xq: res.data.xq
      })
      var jd = 0 //总绩点
      var jdNum = 0 //课程数量
      var num = 0 //总学分
      for (var i = 0; i < app.globalData.results.length; i++) {
        num = num + parseFloat(app.globalData.results[i].xf)
        if (app.globalData.results[i].xn === that.data.xn && app.globalData.results[i].xq === that.data.xq) {
          jd = jd + parseFloat(app.globalData.results[i].jd)
          jdNum++
        }
      }
      that.setData({
        xfNum: num,
        jdNum: jdNum,
        xfJD: jd,
        xfJDNum: (jd / jdNum)
      })
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