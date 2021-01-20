// pages/loginL/loginL.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '', //账号
    password: '', //密码
    codeInput: '', //验证码
    code: '', //验证码的base64
    inform: [] //从服务端get返回来的数据
  },
  accountInput(res) {
    this.setData({
      account: res.detail.value
    })
  },
  passwordInput(res) {
    this.setData({
      password: res.detail.value
    })
  },
  codeInput(res) {
    this.setData({
      codeInput: res.detail.value
    })
  },
  //登陆按钮
  login(res) {
    var that = this
    wx.cloud.callFunction({
      name: 'loginStudy',
      data: {
        account: that.data.account,
        password: that.data.password,
        code: that.data.codeInput,
        cookie: that.data.inform[1],
        __VIEWSTATE: that.data.inform[0]
      },
      success(res) {
        console.log(res.result)
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  //刷新按钮
  loginClick(res) {
    var that = this
    wx.cloud.callFunction({
      name: 'gettest',
      data: {},
      success(res) {
        that.setData({
          inform: res.result,
          code: res.result[2]
        })
        console.log(res.result)
      },
      fail(res) {
        console.log(res)
      }
    })
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