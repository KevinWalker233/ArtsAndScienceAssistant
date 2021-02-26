var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    results: [], //成绩
    showResults: [], //展示的成绩
    xns: [], //学年
    xqs: [], //学期
    chooseXN: '', //所选学年
    chooseXQ: '' //所选学期
  },
  login(res) { //更新数据按钮
    wx.navigateTo({
      url: "/pages/loginL/loginL?home=result",
    })
  },
  changeXN(res) {
    this.setData({
      chooseXN: res.detail.value
    })
    var newResults = []
    var choose = this.data.xns[parseInt(this.data.chooseXN)]
    // console.log(choose)
    for (var i = 0; i < this.data.results.length; i++) {
      if (this.data.results[i].xn === choose) {
        newResults.push(this.data.results[i])
      }
    }
    this.setData({
      showResults: newResults
    })
    // console.log(this.data.results)
  },
  changeXQ(res) {
    this.setData({
      chooseXQ: res.detail.value
    })
    var newResults = []
    var choose = this.data.xqs[parseInt(this.data.chooseXQ)]
    // console.log(choose)
    for (var i = 0; i < this.data.results.length; i++) {
      if (this.data.results[i].xq === choose) {
        newResults.push(this.data.results[i])
      }
    }
    this.setData({
      showResults: newResults
    })
    // console.log(this.data.results)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({ //获取本地成绩数据
      key: 'results',
      success(res) {
        app.globalData.results = [].concat(JSON.parse(res.data))
        that.setData({
          results: [].concat(JSON.parse(res.data)),
          showResults: [].concat(JSON.parse(res.data))
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
    that.setData({
      results: app.globalData.results,
      showResults: app.globalData.results
    })

    const xnsSet = new Set(); //创建一个数组用来存学年
    for (var i = 0; i < that.data.results.length; i++) {
      xnsSet.add(that.data.results[i].xn)
    }

    const xqsSet = new Set(); //创建一个数组用来存学期
    for (var i = 0; i < that.data.results.length; i++) {
      xqsSet.add(that.data.results[i].xq)
    }

    that.setData({
      xns: Array.from(xnsSet),
      xqs: Array.from(xqsSet)
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