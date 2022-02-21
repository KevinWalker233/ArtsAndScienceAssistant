// pages/checkMoney/bill/bill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    prop: [],
    cost: 0
  },
  boxClick(res) {
    var index = res.currentTarget.dataset.index
    var prop = this.data.prop
    if (prop[index] == 0) {
      prop[index] = 150
    } else {
      prop[index] = 0
    }
    this.setData({
      prop: prop
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var bill = JSON.parse(options.bill)
    var prop = []
    var cost = 0
    for (var i = 0; i < bill.length; i++) {
      prop[i] = 0
      cost = cost + parseFloat(bill[i].sum) 
    }
    this.setData({
      list: bill,
      prop: prop,
      cost: cost.toFixed(2)
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