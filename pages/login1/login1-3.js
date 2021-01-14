// pages/login1/login1-3.js
const db = wx.cloud.database().collection("account");
Page({
  _userInfo(res){
    console.log(res.currentTarget.id)
    this.setData({
      grade:res.currentTarget.id
    })
    db.add({
      data:{
        grade:this.data.grade,
        major:this.data.major,
        classes:this.data.classes,
      }
    })
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
       major:0,
       classes:0,
       grade:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        console.log(options)
        this.setData({
          major:options.major,
          classes:options.classes
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