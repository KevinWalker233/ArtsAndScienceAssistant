const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [], // 课表色块数组
    leftClass: [], //左侧课表时间
    hideModal: true, //模态框的状态 true-隐藏 false-显示
    animationData: {},
    weekArray: ['一', '二', '三', '四', '五', '六', '日'],
    weekIndex: 0,
    jieCiArray: ["上午第一节", "上午第二节", "下午第一节", "下午第二节", "晚上"],
    jieCiIndex: 0,
    type: 0,
    classValue: "",
    classRoomValue: "",
    teacherValue: "",
    startWeek: "",
    endWeek: "",
    items: [{
        value: '0',
        name: '全部',
        checked: 'true'
      },
      {
        value: '1',
        name: '单周'
      },
      {
        value: '2',
        name: '双周'
      }
    ],
    checked: "0",
    index: -1
  },
  classFactory() {
    var that = this
    if (parseInt(that.data.jieCiIndex) == 0) {
      var jieCi = 1
    } else if (parseInt(that.data.jieCiIndex) == 1) {
      var jieCi = 3
    } else if (parseInt(that.data.jieCiIndex) == 2) {
      var jieCi = 5
    } else if (parseInt(that.data.jieCiIndex) == 3) {
      var jieCi = 7
    } else if (parseInt(that.data.jieCiIndex) == 4) {
      var jieCi = 9
    }
    var classes = {}
    classes.address = that.data.classRoomValue
    classes.courseName = that.data.classValue
    classes.teacher = that.data.teacherValue
    classes.weekTime = parseInt(that.data.weekIndex) + 1
    classes.jieCi = jieCi
    if (that.data.checked == 1)
      var danShuangZhou = "单"
    else if (that.data.checked == 2)
      var danShuangZhou = "单"
    else var danShuangZhou = ""

    var weeks = that.data.startWeek + "-" + that.data.endWeek + danShuangZhou + "(" + (jieCi) + "," + (jieCi + 1) + ")"
    classes.weeks = weeks
    return classes
  },
  addClass(e) {
    var that = this
    var type = e.currentTarget.dataset.type
    if (type == 0) { //保存
      var wlist = that.data.wlist
      wlist.splice(that.data.index, 1, that.classFactory())
      that.setData({
        wlist: wlist,
        index: -1
      })
      wx.setStorageSync('wlist', JSON.stringify(wlist))
      app.globalData.wlist = wlist
      wx.vibrateShort({
        type: 'medium'
      })
      that.hideModal()
    } else if (type == 1) { //添加
      var wlist = that.data.wlist
      wlist.push(that.classFactory())
      that.setData({
        wlist: wlist,
        index: -1
      })
      wx.setStorageSync('wlist', JSON.stringify(wlist))
      app.globalData.wlist = wlist
      wx.vibrateShort({
        type: 'medium'
      })
      that.hideModal()
    } else if (type == 2) { //删除
      var wlist = that.data.wlist
      wlist.splice(that.data.index, 1)
      that.setData({
        wlist: wlist,
        index: -1
      })
      wx.setStorageSync('wlist', JSON.stringify(wlist))
      app.globalData.wlist = wlist
      wx.vibrateShort({
        type: 'medium'
      })
      that.hideModal()
    }
  },
  bindJieCiChange(e) {
    this.setData({
      jieCiIndex: e.detail.value
    })
  },
  bindWeekChange(e) {
    this.setData({
      weekIndex: e.detail.value
    })
  },
  radioChange(e) {
    var str = null;
    for (var value of this.data.items) {
      if (value.value === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({
      checked: str
    });
  },
  // 显示遮罩层
  showModal: function (e) {
    var type = e.currentTarget.dataset.type
    var index = e.currentTarget.dataset.index
    var that = this;
    if (type == 1) {
      var wlist = that.data.wlist
      if (wlist[index].weeks.indexOf("单") != -1) {
        var checked = "1"
      } else if (wlist[index].weeks.indexOf("双") != -1) {
        var checked = "2"
      } else {
        var checked = "0"
      }
      var items = [{
          value: '0',
          name: '全部'
        },
        {
          value: '1',
          name: '单周'
        },
        {
          value: '2',
          name: '双周'
        }
      ]
      for (var i = 0; i < items.length; i++) {
        if (items[i].value === checked) {
          items[i].checked = 'true'
        }
      }
      var jieCi = parseInt(wlist[index].weeks.split("(")[1].split(",")[0])
      var jieCiIndex = 0
      if (jieCi == 1) {
        jieCiIndex = 0
      } else if (jieCi == 3) {
        jieCiIndex = 1
      } else if (jieCi == 5) {
        jieCiIndex = 2
      } else if (jieCi == 7) {
        jieCiIndex = 3
      } else if (jieCi == 9) {
        jieCiIndex = 4
      }
      that.setData({
        classValue: wlist[index].courseName,
        classRoomValue: wlist[index].address,
        teacherValue: wlist[index].teacher,
        startWeek: parseInt(wlist[index].weeks.split("(")[0].split("-")[0]),
        endWeek: parseInt(wlist[index].weeks.split("(")[0].split("-")[1]),
        weekIndex: parseInt(wlist[index].weekTime) - 1,
        jieCiIndex: jieCiIndex,
        checked: checked,
        items: items,
        index: index
      })
    } else if (type == 0) {
      var items = [{
          value: '0',
          name: '全部',
          checked: "true"
        },
        {
          value: '1',
          name: '单周'
        },
        {
          value: '2',
          name: '双周'
        }
      ]
      that.setData({
        classValue: "",
        classRoomValue: "",
        teacherValue: "",
        startWeek: "",
        endWeek: "",
        weekIndex: 0,
        jieCiIndex: 0,
        checked: "0",
        items: items
      })
    }
    that.setData({
      hideModal: false,
      type: type
    })
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn(); //调用显示动画
    }, 100)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 300, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 200) //先执行下滑动画，再隐藏模块
  },
  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(1000).step()
    this.setData({
      animationData: this.animation.export(),
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
    var that = this
    that.setData({ //设置课表
      wlist: app.globalData.wlist
    })
    wx.getStorage({
      key: 'times',
      success(res) {
        // console.log("[查询]左侧课表时间加载成功：", res.data)
        that.setData({
          leftClass: res.data
        })
      }
    })

    setTimeout(() => {
      if (that.data.wlist.length <= 0 || that.data.wlist == null) {
        wx.startPullDownRefresh()
      }
    }, 1000);
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
    this.onShow()
    wx.stopPullDownRefresh()
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