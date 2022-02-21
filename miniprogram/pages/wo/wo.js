var app = getApp()
const accountDb = wx.cloud.database().collection("account")
const configDb = wx.cloud.database().collection("config");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //用户个人信息
    userInfo: {
      user: [], //用户信息
      openid: '',
      classTip: false, //上课提醒
      clockTip: false, //签到提醒
      text: [], //从云端获取到美文的数组
      welcome: '', //顶部的美文美句
      welcomeAnimation: {}, //顶部美文动画效果
      cardShow: {} //卡片展示动画
    },
    color: "#3878C2",
    headImage: "" //头像地址
  },
  //点击头像获取用户信息
  getUser(res) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '授权后仅使用您的头像信息',
      confirmText: '我知道了',
      showCancel: false,
      success(res) {
        wx.getUserProfile({
          desc: '用户头像展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            that.setData({
              headImage: res.userInfo.avatarUrl
            })
            wx.setStorageSync('headImage', res.userInfo.avatarUrl)
          }
        })
      }
    })
  },
  loginL(res) { //授权教务系统
    wx.navigateTo({
      url: "/pages/loginL/loginL?home=index",
    })
  },
  loginCard(res) { //授权卡务系统
    wx.navigateTo({
      url: "/pages/loginCard/loginCard",
    })
  },
  addTip(res) { //授权上课提醒
    var that = this
    wx.requestSubscribeMessage({
      tmplIds: ['4FXI5vyjxiQo3JY2rTT6hIXuMKxd5085cZnieP7PSq8'],
      success(res) {
        // console.log('添加了一次提醒')
      }
    })
  },
  addClockTip(res) { //授权打卡提醒
    var that = this
    wx.requestSubscribeMessage({
      tmplIds: ['fh162iT9nuIpjP3IcQpJhitaY0Nl9hqlY809ul8FYE0'],
      success(res) {
        // console.log('添加了一次提醒')
      }
    })
  },
  changeClassTip(res) { //上课开关提醒
    var that = this
    that.setData({
      classTip: res.detail.value
    })

    var that = this
    accountDb.doc(that.data.openid).update({
      data: {
        tip: that.data.classTip
      }
    })
  },
  changeClockTip(res) { //打开开关提醒
    var that = this
    that.setData({
      clockTip: res.detail.value
    })

    var that = this
    accountDb.doc(that.data.openid).update({
      data: {
        clockTip: that.data.clockTip
      }
    })
  },
  welcomeClick(res) { //切换顶部美文
    var that = this

    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    var animation = animation
    animation.opacity(0).step()
    that.setData({
      welcomeAnimation: animation.export()
    })

    setTimeout(function () {
      animation.opacity(1).step()
      var index = Math.floor((Math.random() * (that.data.text).length))
      that.setData({
        welcome: (that.data.text)[index],
        welcomeAnimation: animation.export()
      })
    }, 500)
  },
  about(res) { //关于我们按钮点击
    wx.navigateTo({
      url: "/pages/about/about",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    configDb.doc('navigationBar').get({
      success(res) {
        wx.setNavigationBarColor({
          frontColor: res.data.frontColor,
          backgroundColor: res.data.backgroundColor
        })
        that.setData({
          color: res.data.backgroundColor
        })
      }
    })
    wx.getStorage({
      key: 'headImage',
      success(res) {
        that.setData({
          headImage: res.data
        })
      }
    })
    wx.cloud.callFunction({
      name: "getopenid",
      complete: res => {
        accountDb.where({
          _openid: res.result.openid //进行筛选
        }).get({
          success(e) {
            that.setData({
              classTip: e.data[0].tip,
              clockTip: e.data[0].clockTip,
              openid: res.result.openid
            })
          }
        })
      }
    })
    configDb.doc('welcome').get({
      success(res) {
        var index = Math.floor((Math.random() * (res.data.text).length))
        that.setData({
          text: (res.data.text),
          welcome: (res.data.text)[index]
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
    var that = this

    // console.log(app.globalData)

    var animation = wx.createAnimation({
      duration: 500
    })
    var animation = animation

    animation.opacity(1).step()
    that.setData({
      cardShow: animation.export()
    })

    wx.getStorage({ //获取本地账号数据
      key: 'user',
      success(res) {
        // console.log(res)
        that.setData({
          user: [].concat(JSON.parse(res.data))
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
    var animation = wx.createAnimation({
      duration: 100
    })
    var animation = animation

    animation.opacity(0).step()
    that.setData({
      cardShow: animation.export()
    })
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