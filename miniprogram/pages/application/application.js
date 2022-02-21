const configDb = wx.cloud.database().collection("config");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图图片链接
    carouselImgUrls: [],
    infoCheck: [],
    lifeService: [],
    oneCheck: [],
    imgUrl: "",
    url: "",
    flag: false,
    sec: 5
  },
  // 信息查询内功能点击
  infoCheckClick(res) {
    var index = parseInt(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: this.data.infoCheck[index].page
    })
  },
  // 生活服务内功能点击
  lifeServiceClick(res) {
    var index = parseInt(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: this.data.lifeService[index].page
    })
  },
  // 其他功能内功能点击
  oneCheckClick(res) {
    var index = parseInt(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: this.data.oneCheck[index].page
    })
  },
  //点击广告进入页面
  activity(res) {
    wx.navigateTo({
      url: this.data.url,
    })
  },
  //关闭活动广告
  closeActicity(res) {
    clearInterval(this.id)
    clearTimeout(this.time)
    this.setData({
      flag: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.cloud.database().collection("config").doc("activity").get({
      success(res) {
        if (res.data.open) {
          that.setData({
            imgUrl: res.data.imgUrl,
            url: res.data.url,
            flag:res.data.open
          })
          var s = 5
          var id = setInterval(function () {
            s--
            that.setData({
              sec: s
            })
          }, 1000)
          var time = setTimeout(function () {
            that.setData({
              flag: false
            })
            clearInterval(id)
          }, 5000)
          this.id = id
          this.time = time
        }
      }
    })
    configDb.doc('navigationBar').get({
      success(res) {
        wx.setNavigationBarColor({
          frontColor: res.data.frontColor,
          backgroundColor: res.data.backgroundColor
        })
      }
    })

    configDb.doc('banner').get({
      success(res) {
        that.setData({
          carouselImgUrls: res.data.bannerCard
        })
      }
    })
    configDb.doc('application').get({
      success(res) {
        var appVersion = wx.getStorageSync('appVersion') //获取本地版本号
        if (appVersion == res.data.version) { //版本号相同
          that.setData({
            infoCheck: JSON.parse(wx.getStorageSync('infoCheck')),
            lifeService: JSON.parse(wx.getStorageSync('lifeService')),
            oneCheck: JSON.parse(wx.getStorageSync('oneCheck'))
          })
        } else { //版本号不同
          console.log("!=")
          wx.setStorageSync('infoCheck', JSON.stringify(res.data.infoCheck))
          wx.setStorageSync('lifeService', JSON.stringify(res.data.lifeService))
          wx.setStorageSync('oneCheck', JSON.stringify(res.data.oneCheck))
          wx.setStorageSync('appVersion', res.data.version)
          that.setData({
            infoCheck: res.data.infoCheck,
            lifeService: res.data.lifeService,
            oneCheck: res.data.oneCheck
          })
        }
      },
      fail(err) { //手机无网络打开时
        console.log("断网", err)
        that.setData({
          infoCheck: JSON.parse(wx.getStorageSync('infoCheck')),
          lifeService: JSON.parse(wx.getStorageSync('lifeService')),
          oneCheck: JSON.parse(wx.getStorageSync('oneCheck'))
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