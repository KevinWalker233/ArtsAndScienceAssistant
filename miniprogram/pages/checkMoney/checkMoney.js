var app = getApp()
const timeFormat = require('../../utils/time.js');

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
    cardInform: [], //用户数据
    mouth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    date: "",
    year: "",
    mouths: "",
    day: ""
  },
  getBill(res) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var mouth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var datestart = that.data.year + "-" + (parseInt(that.data.date) + 1) + "-1"
    var dateend = that.data.year + "-" + (parseInt(that.data.date) + 1) + "-" + mouth[that.data.date]
    wx.cloud.callFunction({
      name: 'getCardBill',
      data: {
        account: that.data.account,
        password: that.data.password,
        datestart: datestart,
        dateend: dateend,
        type: "1"
      },
      complete(res) {
        console.log(res)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            })
          },
        })
        wx.navigateTo({
          url: "/pages/checkMoney/bill/bill?bill=" + JSON.stringify(res.result)
        })
      }
    })
  },
  getBillDay(res) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var today = that.data.year + "-" + that.data.mouths + "-" + that.data.day
    console.log(today)
    wx.cloud.callFunction({
      name: 'getCardBill',
      data: {
        account: that.data.account,
        password: that.data.password,
        datestart: today,
        dateend: today,
        type: "0"
      },
      complete(res) {
        console.log(res)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            })
          },
        })
        wx.navigateTo({
          url: "/pages/checkMoney/bill/bill?bill=" + JSON.stringify(res.result)
        })
      }
    })
  },
  bindDateChange(res) {
    console.log(res.detail.value)
    this.setData({
      date: parseInt(res.detail.value)
    })
  },
  pay(res) { //充值
    wx.navigateTo({
      url: "/pages/application/textView/textView?url=https://mp.weixin.qq.com/s/mi_9bo7CTkAvQlIjSq8tHQ"
    })
    // wx.previewImage({
    // urls: ["cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/card.png"] // 需要预览的图片http链接列表
    // })
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
    var account = wx.getStorageSync('cardAccount')
    if (account != "") {
      this.updateCardInform();
    } else {
      wx.navigateTo({
        url: "/pages/loginCard/loginCard",
      })
    }
  },
  guaShi(res) { //点击挂失按钮
    wx.showLoading({
      title: '加载中',
    })
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
    wx.showLoading({
      title: '加载中',
    })
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
    wx.showLoading({
      title: '加载中',
    })
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
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            })
          },
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
    var date = timeFormat.formatTime(new Date).split(" ")[0].split("\/")[1]
    var year = timeFormat.formatTime(new Date).split(" ")[0].split("\/")[0]
    var day = timeFormat.formatTime(new Date).split(" ")[0].split("\/")[2]
    that.setData({
      date: parseInt(date) - 1,
      mouths: parseInt(date),
      year: parseInt(year),
      day: parseInt(day)
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