Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ["饭卡", "证件", "手机", "书籍", "钥匙", "其他"],
    index: -1,
    arrayContact: ["QQ", "手机", "微信"],
    indexContact: -1,
    user: {},
    latitude: -1,
    longitude: -1,
    markers: []
  },
  bindPickerChange(res) {
    var index = parseInt(res.detail.value)
    this.setData({
      index: index
    })
  },
  bindPickerChanges(res) {
    var index = parseInt(res.detail.value)
    this.setData({
      indexContact: indexContact
    })
  },
  updateLocal(res) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude,
          }]
        })
      }
    })
  },
  getUser(res) {
    var that = this
    wx.getUserProfile({
      desc: '用于完善物品丢失或拾取者信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        that.setData({
          user: res.userInfo
        })
        console.log(res.userInfo)
      },
      fail(err) {
        wx.showModal({
          title: '提示',
          content: '允许授权后才可以使用',
          confirmText: '我知道了',
          showCancel: false
        })
      }
    })
  },
  formSubmit(res) {
    console.log("表单提交！")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude,
          }]
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

  }
})