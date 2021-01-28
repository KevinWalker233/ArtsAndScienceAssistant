const app = getApp()
const db = wx.cloud.database().collection("account");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: '', //账号
    password: '', //密码
    inform: [], //从服务端get返回来的数据
    error: { //这个是头顶的反馈
      type: '',
      text: ''
    },
    loginB: false //这个是登陆按钮loding动画的设置
  },
  //用户名输入
  accountInput(res) {
    this.setData({
      account: res.detail.value
    })
  },
  //密码输入
  passwordInput(res) {
    this.setData({
      password: res.detail.value
    })
  },
  //登陆按钮
  login(res) {
    var that = this
    that.setData({ //点击登陆设置按钮loding
      loginB: true
    })
    wx.cloud.callFunction({ //调用云函数登陆
      name: 'getCardInform',
      data: {
        account: that.data.account,
        password: that.data.password
      },
      success(res) {
        console.log(res.result)
        that.setData({ //登陆成功返回内容
          loginB: false, //关闭登陆按钮loading
          error: res.result[0] //弹出提醒
        })

        var cardInformString = JSON.stringify(res.result[1])
        cardInformString = cardInformString.replace('元（卡余额）', '').replace('元（当前过渡余额）', '').replace('元（上次过渡余额）', '')

        console.log(cardInformString)
        if (res.result[0].type === "success") {
          wx.setStorage({ //储存卡务数据到本地
            key: 'cardInform',
            data: cardInformString
          })
          wx.setStorage({ //储存账号数据到本地
            key: 'cardAccount',
            data: that.data.account
          })
          wx.setStorage({ //储存密码数据到本地
            key: 'cardPassword',
            data: that.data.password
          })
          setTimeout(function () { //延时返回首页
            wx.navigateBack({}) //返回首页
          }, 1500)
        }
      },
      fail(res) {
        that.setData({
          error: {
            type: 'error',
            text: '出错了！'
          }
        })
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this

    wx.getStorage({ //获取本地账号数据
      key: 'cardAccount',
      success(res) {
        console.log(res)
        that.setData({
          account: res.data
        })
      },
      fail(res) {
        console.log(res)
      }
    })

    wx.getStorage({ //获取本地密码数据
      key: 'cardPassword',
      success(res) {
        console.log(res)
        that.setData({
          password: res.data
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