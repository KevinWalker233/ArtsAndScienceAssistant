const configDb = wx.cloud.database().collection("config");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图图片链接
    carouselImgUrls: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    configDb.doc('banner').get({
      success(res) {
        that.setData({
          carouselImgUrls:res.data.bannerCard
        })
        // console.log(res)
      }
    })
  },
  /**
   * 1、 infoCheck - 信息查询跳转
   * 跳转至 地图 功能
   */
  jumpSchoolMap: function () {
    wx.navigateTo({
      url: '../infoCheck/schoolMap/schoolMap',
    })
  },
  // 跳转至 考试安排 功能
  jumpExam: function () {
    // 提示框
    wx.showModal({
      title: '信息提示',
      content: '详细的考试安排要等到学期16周之后公布，敬请期待😊......',
      confirmText: '我知道了',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('我已阅读')
        } else {}
      }
    })
    // wx.navigateTo({
    //   url: '../infoCheck/exam/exam',
    // })
  },
  // 跳转至 校车 功能
  jumpCommutingBus: function () {
    wx.navigateTo({
      url: '../infoCheck/commutingBus/commutingBus',
    })
  },
  // 跳转至 放假安排 功能
  jumpHoliday: function () {
    wx.navigateTo({
      url: '../infoCheck/holiday/holiday',
    })
  },
  /**
   * 2、 lifeService - 生活服务跳转
   * 跳转至 ToDos备忘 功能
   */
  jumpToDos: function () {
    wx.navigateTo({
      url: '../lifeService/todos/todos',
    })
  },
  // 跳转至 记账本 功能
  jumpAccountMoney: function () {
    wx.navigateTo({
      url: '../lifeService/accountMoney/accountMoney',
    })
  },
  // 跳转至 社团 功能
  jumpMassOrganize: function () {
    wx.navigateTo({
      url: '../lifeService/massOrganize/massOrganize',
    })
  },
  // 跳转至 快递 功能
  jumpExpress: function () {
    wx.navigateTo({
      url: '../lifeService/express/express',
    })
  },

  /**
   * 3、 oneCheck - 一键查询跳转
   * 跳转至 空教室 功能
   */
  jumpEmptyClass: function () {
    // 提示框
    wx.showModal({
      title: '信息提示',
      content: '后续更新，敬请期待😊......',
      confirmText: '我知道了',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          // console.log('我已阅读')
        } else {}
      }
    })
    // wx.navigateTo({
    //   url: '../oneCheck/emptyClass/emptyClass',
    // })
  },
  // 跳转至 校内电话 功能
  jumpSchoolTel: function () {
    wx.navigateTo({
      url: '../oneCheck/schoolTel/schoolTel',
    })
  },

  /**
   * 4、 expFunction - 扩展功能跳转
   * 跳转至 专注 功能
   */
  jumpConcentrat: function () {
    wx.navigateTo({
      url: '../iexpFunction/concentrat/concentrat',
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