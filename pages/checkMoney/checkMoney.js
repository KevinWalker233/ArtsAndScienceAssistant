var app = getApp()

Page({
  data: {
    account: '', //账号
    password: '', //密码
    error: { //这个是头顶的反馈
      type: '',
      text: ''
    },
    guaShiBool: false, //挂失按钮loading
    jieGuaBool: false, //解挂按钮loading
    cardInform: [] //用户数据
  },
  focus(res) { //得到焦点，设置为明文密码
    this.setData({
      inputType: false
    })
  },
  blur(res) { //得到焦点，设置为暗文密码
    this.setData({
      inputType: true
    })
  },
  refresh(res) { //点击刷新按钮
    wx.navigateTo({
      url: "/pages/loginCard/loginCard",
    })
  },
  guaShi(res) { //点击挂失按钮
    var that = this
    that.setData({
      guaShiBool: true
    })
    wx.cloud.callFunction({
      name: 'doSomeCard',
      data: {
        account: that.data.account,
        password: that.data.password,
        type: "挂失"
      },
      success: function (res) {
        that.setData({
          guaShiBool: false,
          error: res.result[0]
        })
        that.updateCardInform()
      },
      fail(res) {
        that.setData({
          guaShiBool: false
        })
      }
    })
  },
  jieGua(res) { //点击解挂按钮
    var that = this
    that.setData({
      jieGuaBool: true
    })
    wx.cloud.callFunction({
      name: 'doSomeCard',
      data: {
        account: that.data.account,
        password: that.data.password,
        type: "解挂"
      },
      success: function (res) {
        that.setData({
          jieGuaBool: false,
          error: res.result[0]
        })
        that.updateCardInform()
      },
      fail(res) {
        that.setData({
          jieGuaBool: false
        })
      }
    })
  },
  updateCardInform() { //更新用户数据
    var that = this
    wx.cloud.callFunction({ //调用云函数登陆
      name: 'getCardInform',
      data: {
        account: that.data.account,
        password: that.data.password
      },
      success(res) {
        var cardInformString = JSON.stringify(res.result[1])
        cardInformString = cardInformString.replace('元（卡余额）', '').replace('元（当前过渡余额）', '').replace('元（上次过渡余额）', '')
        that.setData({ //登陆成功返回内容
          cardInform: [].concat(JSON.parse(cardInformString))
        })
        wx.setStorage({ //储存卡务数据到本地
          key: 'cardInform',
          data: cardInformString
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({ //获取本地账号数据
      key: 'cardAccount',
      success(res) {
        // console.log(res)
        that.setData({
          account: res.data
        })
      },
      fail(res) {
        console.log(res)
        wx.navigateTo({
          url: "/pages/loginCard/loginCard",
        })
      }
    })

    wx.getStorage({ //获取本地密码数据
      key: 'cardPassword',
      success(res) {
        // console.log(res)
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'cardInform',
      success(res) {
        app.globalData.cardInform = [].concat(JSON.parse(res.data))
        that.setData({
          cardInform: [].concat(JSON.parse(res.data))
        })
      }
    })

    wx.getStorage({ //获取本地账号数据
      key: 'cardAccount',
      success(res) {
        // console.log(res)
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
        // console.log(res)
        that.setData({
          password: res.data
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
})