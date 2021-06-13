const configDb = wx.cloud.database().collection("config");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图图片链接
    carouselImgUrls: [],
    infoCheck: [],
    lifeService: [],
    oneCheck: []
  },
  // 信息查询内功能点击
  infoCheckClick(res) {
    var index = parseInt(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: this.data.infoCheck[index].page
    })
  },
  // 生活服务内功能点击
  lifeServiceClick(res) {
    var index = parseInt(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: this.data.lifeService[index].page
    })
  },
  // 其他功能内功能点击
  oneCheckClick(res) {
    var index = parseInt(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: this.data.oneCheck[index].page
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    configDb.doc('banner').get({
      success(res) {
        that.setData({
          carouselImgUrls: res.data.bannerCard
        })
      }
    })
    configDb.doc('application').get({
      success(res) {
        var appVersion = wx.getStorageSync('appVersion') //获取本地版本号
        if (appVersion == res.data.version) { //版本号相同
          that.setData({
            infoCheck: JSON.parse(wx.getStorageSync('infoCheck')),
            lifeService: JSON.parse(wx.getStorageSync('lifeService')),
            oneCheck: JSON.parse(wx.getStorageSync('oneCheck'))
          })
        } else { //版本号不同
          wx.setStorageSync('infoCheck', JSON.stringify(res.data.infoCheck))
          wx.setStorageSync('lifeService', JSON.stringify(res.data.lifeService))
          wx.setStorageSync('oneCheck', JSON.stringify(res.data.oneCheck))
          wx.setStorageSync('appVersion', res.data.version)
          that.setData({
            infoCheck: res.data.infoCheck,
            lifeService: res.data.lifeService,
            oneCheck: res.data.oneCheck
          })
        }
      },
      fail(err) { //手机无网络打开时
        that.setData({
          infoCheck: JSON.parse(wx.getStorageSync('infoCheck')),
          lifeService: JSON.parse(wx.getStorageSync('lifeService')),
          oneCheck: JSON.parse(wx.getStorageSync('oneCheck'))
        })
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