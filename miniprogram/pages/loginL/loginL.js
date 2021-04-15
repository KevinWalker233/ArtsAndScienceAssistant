const app = getApp()
const db = wx.cloud.database().collection("schoolCalendar")

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
    type: '', //请求的内容，wlist为课表，result为成绩
    error: { //这个是头顶的反馈
      type: '',
      text: ''
    },
    buttonName: '未知错误', //登陆按钮的名承
    loginB: false, //这个是登陆按钮loding动画的设置
    inputType: true, //这个是用来判断明文暗文密码输入
    titleColor: '#F09609',
    chooseSize: false,
    animationData: '',
    serverPicker: ['校外服务器', '内网服务器1', '内网服务器2', '内网服务器3', '内网服务器4', '内网服务器5'],
    chooseServer: 0,
    hideNotice: true, //是否显示顶部公告栏
    notice: '' //顶部公告栏内容
  },
  eye(res) {
    this.setData({
      inputType: !this.data.inputType
    })
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
        __VIEWSTATE: that.data.inform[0],
        type: that.data.type,
        web: that.data.chooseServer
      },
      success(res) {
        // console.log(res.result)
        that.setData({ //登陆成功返回内容
          loginB: false, //关闭登陆按钮loading
          error: res.result[0] //弹出提醒
        })
        if (res.result[0].type === "success") {
          if (that.data.type === 'wlist') { //当请求的是更新课表时
            app.globalData.wlist = [].concat(res.result[1]); //设置全局课表数据
            app.globalData.user = [].concat(res.result[2]); //设置全局用户数据

            var wlistString = JSON.stringify(res.result[1])
            var userString = JSON.stringify(res.result[2])
            // console.log(wlistString)
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
          } else if (that.data.type === 'result') { //当请求的是更新成绩时
            app.globalData.results = [].concat(res.result[1]); //设置全局课表数据

            var resultsString = JSON.stringify(res.result[1])
            // console.log(resultsString)

            wx.setStorage({ //储存成绩数据到本地
              key: 'results',
              data: resultsString
            })
            wx.setStorage({ //储存账号数据到本地
              key: 'account',
              data: that.data.account
            })
            wx.setStorage({ //储存密码数据到本地
              key: 'password',
              data: that.data.password
            })

            setTimeout(function () { //延时返回首页
              wx.navigateBack({}) //返回首页
            }, 1500)
          }
        } else {
          wx.cloud.callFunction({
            name: 'gettest',
            data: {
              web: that.data.chooseServer
            },
            success(res) {
              that.setData({
                inform: res.result,
                code: res.result[2]
              })
              app.globalData.cookie = res.result[1]
              // console.log(app.globalData.cookie)
              // console.log(res.result)
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
        }
      },
      fail(res) {
        that.setData({
          error: {
            type: 'error',
            text: '出错了！'
          }
        })
        wx.cloud.callFunction({
          name: 'gettest',
          data: {
            web: that.data.chooseServer
          },
          success(res) {
            that.setData({
              inform: res.result,
              code: res.result[2]
            })
            app.globalData.cookie = res.result[1]
            // console.log(app.globalData.cookie)
            // console.log(res.result)
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
      }
    })
  },
  //点击验证码刷新
  loginClick() {
    var that = this
    wx.cloud.callFunction({
      name: 'gettest',
      data: {
        web: that.data.chooseServer
      },
      success(res) {
        that.setData({
          inform: res.result,
          code: res.result[2]
        })
        app.globalData.cookie = res.result[1]
        // console.log(app.globalData.cookie)
        // console.log(res.result)
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
  showServerList: function (e) {
    this.setData({
      chooseServer: parseInt(e.detail.value)
    })
    wx.setStorage({
      data: e.detail.value,
      key: 'serverWeb',
    })
    this.loginClick()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    db.doc("information").get({
      success(res) {
        that.setData({
          hideNotice: res.data.hideNotice,
          notice: res.data.notice,
          information: {
            headInform: res.data.headInform
          }
        })
      }
    });

    var color = '#F09609'
    if (options.home === 'index') {
      color = '#F09609'
    } else {
      color = '#DB7093'
    }
    that.setData({
      titleColor: color
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: color,
      animation: {
        duration: 500,
        timingFunc: 'easeInOut'
      }
    })
    wx.setNavigationBarTitle({
      title: '教务系统'
    })
    wx.cloud.callFunction({
      name: 'gettest',
      data: {
        web: parseInt(wx.getStorageSync('serverWeb'))
      },
      success(res) {
        that.setData({
          inform: res.result,
          code: res.result[2]
        })
        // console.log(res.result)
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

    // console.log(options.home)
    if (options.home === 'index') { //打开这个页面传过来的值为index，则登陆后请求课表
      // console.log(options.home)
      that.setData({
        buttonName: '更新课表',
        type: 'wlist'
      })
    } else if (options.home === 'result') { //打开这个页面传过来的值为result，则登陆后请求成绩
      that.setData({
        buttonName: '更新成绩',
        type: 'result'
      })
    }
    wx.setNavigationBarTitle({
      title: that.data.buttonName
    })
  },

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
      key: 'account',
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
      key: 'password',
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

    wx.getStorage({ //获取本地服务器数据
      key: 'serverWeb',
      success(res) {
        that.setData({
          chooseServer: parseInt(res.data)
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
})