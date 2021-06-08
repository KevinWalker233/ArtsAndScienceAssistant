Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0, //发布类型，0为物品丢失，1为拾取物品
    title: "", //标题
    context: "", //详细信息
    address: "", //物品丢失/拾取地址
    array: ["饭卡", "证件", "手机", "书籍", "钥匙", "其他"], //丢失物品类型的list
    index: -1, //丢失物品类型的选择器索引
    cardID: "", //若物品类型索引为0（饭卡）,则需要输入此内容，内容为饭卡卡号
    arrayContact: ["QQ", "手机", "微信"], //联系方式类型的list
    indexContact: -1, //联系方式选择器索引
    contact: -1, //联系信息
    user: {}, //授权的用户信息
    latitude: "", //坐标
    longitude: "", //坐标
    markers: [] //这是地图上显示的标记
  },
  //发布类型改变
  changeType(res) {
    var type = parseInt(res.detail.value)
    this.setData({
      type: type
    })
  },
  //输入标题
  bindTitleInput(res) {
    var value = res.detail.value
    this.setData({
      title: value
    })
  },
  //输入详细信息
  bindContextInput(res) {
    var value = res.detail.value
    this.setData({
      context: value
    })
  },
  //输入地址
  bindAddressInput(res) {
    var value = res.detail.value
    this.setData({
      address: value
    })
  },
  //输入卡号
  bindCardIDInput(res) {
    var value = res.detail.value
    this.setData({
      cardID: value
    })
  },
  //卡号输入完成
  changeCardID(res) {
    var that = this
    if (res.detail.value.length < 5 || res.detail.value.length > 12) {
      wx.showModal({
        title: '提示',
        content: '学号格式错误！',
        showCancel: false,
        success(res) {
          that.setData({
            cardID: ""
          })
        }
      })
    }
  },
  //输入联系方式
  bindContactInput(res) {
    var value = res.detail.value
    this.setData({
      contact: value
    })
  },
  //选择物品类型
  bindPickerChange(res) {
    var index = parseInt(res.detail.value)
    this.setData({
      index: index
    })
  },
  //选择联系方式类型
  bindPickerChanges(res) {
    var index = parseInt(res.detail.value)
    this.setData({
      indexContact: index
    })
  },
  //刷新位置
  updateLocal(res) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude,
          }]
        })
      }
    })
  },
  //授权信息
  getUser(res) {
    var that = this
    wx.getUserProfile({
      desc: '用于完善物品丢失或拾取者信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        that.setData({
          user: res.userInfo
        })
        console.log(res.userInfo)
      },
      fail(err) {
        wx.showModal({
          title: '提示',
          content: '允许授权后才可以使用',
          confirmText: '我知道了',
          showCancel: false
        })
      }
    })
  },
  //点击发布按钮
  formSubmit(res) {
    var that = this
    if (that.data.title != "" && that.data.context != "" && that.data.address != "" && that.data.index > -1 && that.data.indexContact > -1 && that.data.latitude != "" && that.data.longitude != "" && typeof (that.data.user.avatarUrl) != "undefined") {
      if (that.data.index == 0) {
        if (that.data.cardID != "") {
          wx.showToast({
            title: '提交成功！',
            icon: 'error',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '请完善信息',
            icon: 'error',
            duration: 2000
          })
        }
      } else if (that.data.index != 0) {
        wx.showToast({
          title: '提交成功！',
          icon: 'error',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'error',
        duration: 2000
      })
    }
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
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude,
          }]
        })
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