const app = getApp()
const db = wx.cloud.database().collection("account");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: '', //账号
    password: '', //密码
    codeInput: '', //验证码
    code: '', //验证码的base64
    inform: [], //从服务端get返回来的数据
    error: { //这个是头顶的反馈
      type: '',
      text: ''
    },
    loginB: false, //这个是登陆按钮loding动画的设置
    welcome: '请登录' //这个目前只是负责显示数据，后面会删掉
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
  //验证码输入
  codeInput(res) {
    this.setData({
      codeInput: res.detail.value
    })
  },
  //登陆按钮
  login(res) {
    var that = this
    that.setData({ //点击登陆设置按钮loding
      loginB: true
    })
    wx.cloud.callFunction({ //调用云函数登陆
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
        that.setData({ //登陆成功返回内容
          loginB: false, //关闭登陆按钮loading
          welcome: JSON.stringify(res.result[1]), //设置下面textarea内容
          error: res.result[0] //弹出提醒
        })
        if (res.result[0].type === "success") {
          // if(res.result[0].text)
          app.globalData.wlist = [].concat(res.result[1]); //设置全局课表数据

          var wlistString = JSON.stringify(res.result[1])
          var userString = JSON.stringify(res.result[2])
          console.log(wlistString)
          wx.setStorage({ //储存课表数据到本地
            key: 'wlist',
            data: wlistString
          })
          wx.setStorage({ //储存账号数据到本地
            key: 'account',
            data: that.data.account
          })
          wx.setStorage({ //储存密码数据到本地
            key: 'password',
            data: that.data.password
          })
          wx.setStorage({ //储存用户数据到本地
            key: 'user',
            data: userString
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
          },
          welcome: '出错了！\n\n' + res
        })
        console.log(res)
      }
    })
  },
  //点击验证码刷新
  loginClick(res) {
    var that = this
    wx.cloud.callFunction({
      name: 'gettest',
      data: {},
      success(res) {
        that.setData({
          welcome: '__VIEWSTATE:' + res.result[0] + '\n\ncookie:' + res.result[1],
          inform: res.result,
          code: res.result[2]
        })
        console.log(res.result)
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
  onLoad: function (options) {
    var that = this
    wx.cloud.callFunction({
      name: 'gettest',
      data: {},
      success(res) {
        that.setData({
          welcome: '__VIEWSTATE:' + res.result[0] + '\n\ncookie:' + res.result[1],
          inform: res.result,
          code: res.result[2]
        })
        console.log(res.result)
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

    if (options.id === 'index') { //打开这个页面传过来的值

    }
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
    wx.getStorage({ //获取本地账号数据
      key: 'account',
      success(res){
        console.log(res)
        that.setData({
          account:res.data
        })
      },
      fail(res){
        console.log(res)
      }
    })
    wx.getStorage({ //获取本地密码数据
      key: 'password',
      success(res){
        console.log(res)
        that.setData({
          password:res.data
        })
      },
      fail(res){
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