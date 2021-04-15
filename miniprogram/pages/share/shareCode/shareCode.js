import QRCode from './weapp-qrcode'
const app = getApp()

Page({
  data: {
    img: ''
  },
  scanCode(e) {
    wx.scanCode({
      scanType: ['qrCode'],
      success(res) {
        wx.showModal({
          title: '详细信息',
          content: res.result,
          confirmText: '设置课表',
          cancelText: '考虑一下',
          showCancel: true,
          success(r) {
            if (r.confirm) {
              var wlistStr = res.result.replace(/\ufeff/g, "")
              var wlist = JSON.parse(wlistStr)
              app.globalData.wlist = [].concat(wlist);
              wx.setStorage({ //储存课表数据到本地
                key: 'wlist',
                data: wlistStr
              })
              setTimeout(function () { //延时返回首页
                wx.navigateBack({
                  delta: 2
                }) //返回首页
              }, 500)
            }
          }
        })
      }
    })
  },
  showImg(res) {
    wx.previewImage({
      urls: [this.data.img] // 需要预览的图片http链接列表
    })
  },
  onLoad: function (options) {
    var that = this
    var imgData = QRCode.drawImg(JSON.stringify(app.globalData.wlist), {
      typeNumber: 4,
      errorCorrectLevel: 'L',
      size: 700
    })
    that.setData({
      img: imgData
    })
  },

  onReady: function () {

  },

  onShow: function () {
    // var that = this
    // console.log(JSON.stringify(app.globalData.wlist))
  }
})