// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "",
    wlist: "",
    week: "",
    time: "",
    classes: ""
  },
  tap(res) {
    var that = this
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      fileType: "jpg",
      success(res) {
        console.log(res.tempFilePath)
        that.setData({
          img: res.tempFilePath
        })
        that.image()
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  image(res) {
    wx.previewImage({
      urls: [this.data.img] // 需要预览的图片http链接列表
    })
  },
  shareCode(res) {
    wx.navigateTo({
      url: "/pages/share/shareCode/shareCode",
    })
  },
  shareTextCode(res) {
    // wx.navigateTo({
    //   url: "/pages/share/shareTextCode/shareTextCode",
    // })
    wx.showModal({
      title: '信息提示',
      content: '后续更新，敬请期待😊......',
      confirmText: '我知道了',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          // console.log('我已阅读')
        } else {}
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      wlist: options.wlist,
      week: options.week,
      time: options.time,
      classes: options.classes
    })

    const ctx = wx.createCanvasContext('canvas')
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 740);
    this.drawHead(ctx, that.data.time, that.data.week, that.data.classes)
    this.drawTime(ctx)
    this.drawClass(ctx, JSON.parse(that.data.wlist))
    this.drawCode(ctx)
    ctx.draw(false, function (res) {
      wx.canvasToTempFilePath({
        canvasId: 'canvas',
        fileType: "jpg",
        success(res) {
          that.setData({
            img: res.tempFilePath
          })
        },
        fail(res) {
          console.log(res)
        }
      })
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'canvas',
        fileType: "jpg",
        success(res) {
          console.log(res.tempFilePath)
          that.setData({
            img: res.tempFilePath
          })
        },
        fail(res) {
          console.log(res)
        }
      })
    }, 100)
  },
  drawCode(ctx) {
    ctx.save()
    ctx.setFillStyle('#000000')
    ctx.drawImage("/assets/classBg.png", 15, 640, 345, 90)
    ctx.restore()
  },
  drawHead(ctx, time, week, classes) {
    ctx.save()
    //绘制顶部日期和周次
    ctx.setFillStyle('#444')
    ctx.setFontSize(16)
    ctx.fillText(time, 15, 20)
    ctx.fillText(week, 290, 20)
    ctx.fillText(classes, 110, 640)
    //绘制顶部周
    var weeks = ['一', '二', '三', '四', '五', '六', '日']
    for (var i = 0; i < 7; i++) {
      ctx.setFillStyle('#444')
      ctx.setFontSize(16)
      ctx.fill
      ctx.fillText("周" + weeks[i], 50 + i * 46, 45)
      ctx.restore()
    }
  },
  drawTime(ctx) {
    ctx.save()
    var times = [{
        "jieCi": "1",
        "time": "8:00-8:50"
      },
      {
        "jieCi": "2",
        "time": "9:00-9:50"
      },
      {
        "jieCi": "3",
        "time": "10:10-11:00"
      },
      {
        "jieCi": "4",
        "time": "11:10-12:00"
      },
      {
        "jieCi": "5",
        "time": "14:30-15:20"
      },
      {
        "jieCi": "6",
        "time": "15:30-16:20"
      },
      {
        "jieCi": "7",
        "time": "16:30-17:20"
      },
      {
        "jieCi": "8",
        "time": "17:30-18:20"
      },
      {
        "jieCi": "9",
        "time": "19:30"
      },
      {
        "jieCi": "10",
        "time": "21:30"
      }
    ]
    for (var i = 0; i < times.length; i++) {
      ctx.setFillStyle('#444')
      ctx.setFontSize(10)
      var time = times[i]['time'].split('-')
      ctx.fillText(times[i]['jieCi'], 5, 65 + i * 60)
      ctx.fillText(time[0], 5, 80 + i * 60)
      if (time[1] != null)
        ctx.fillText(time[1], 5, 95 + i * 60)
    }
    ctx.restore()
  },
  drawClass(ctx, wlist) {
    ctx.save()
    var colors = ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"]
    var width = 48
    var height = 112
    var left = 38
    var jieCis = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
    for (var i = 0; i < wlist.length; i++) {
      this.roundRect(ctx, left + width * (parseInt(wlist[i]['weekTime']) - 1), 60 + height * jieCis[parseInt(wlist[i]['jieCi'])], width, height, 10, colors[i % 8], wlist[i]['courseName'], wlist[i]['address'])
    }
    ctx.restore()
  },
  /**
   * 
   * @param {CanvasContext} ctx canvas上下文
   * @param {number} x 圆角矩形选区的左上角 x坐标
   * @param {number} y 圆角矩形选区的左上角 y坐标
   * @param {number} w 圆角矩形选区的宽度
   * @param {number} h 圆角矩形选区的高度
   * @param {number} r 圆角的半径
   * @param {string} color 课表矩形的颜色
   */
  roundRect(ctx, x, y, w, h, r, color, classs, room) {
    ctx.save()
    if (w < 2 * r) {
      r = w / 2
    }
    if (h < 2 * r) {
      r = h / 2
    }
    ctx.setShadow(0, 0, 7, color)
    ctx.beginPath()
    ctx.setFillStyle(color)
    ctx.setLineWidth(1)
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    // ctx.stroke()
    ctx.fill()
    ctx.closePath()
    ctx.restore()
    ctx.setFillStyle('white')
    ctx.setFontSize(10.5)
    this.drawText(ctx, classs, x + 4, y + 18, 232, w - 15, room)
  },
  drawText(ctx, str, leftWidth, initHeight, titleHeight, canvasWidth, room) {
    ctx.save()
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
        initHeight += 13;
        lineWidth = 0;
        lastSubStrIndex = i;
        titleHeight += 30;
      }
      if (i == str.length - 1) { //绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
        this.drawRoom(ctx, room, leftWidth, initHeight + 15, titleHeight, canvasWidth)
      }
    }
    // 标题border-bottom 线距顶部距离
    titleHeight = titleHeight + 10;
    return titleHeight
  },
  drawRoom(ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
    ctx.save()
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
        initHeight += 13;
        lineWidth = 0;
        lastSubStrIndex = i;
        titleHeight += 30;
      }
      if (i == str.length - 1) { //绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
      }
    }
    // 标题border-bottom 线距顶部距离
    titleHeight = titleHeight + 10;
    return titleHeight
  },
  roundRect1(ctx, x, y, w, h, r, color) {
    ctx.save()
    // 开始绘制
    ctx.beginPath()
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    // 这里是使用 fill 还是 stroke都可以，二选一即可
    ctx.setFillStyle(color)
    // ctx.setStrokeStyle('transparent')
    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y + r)
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // border-right
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w - r, y + h)
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // border-bottom
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h - r)
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // border-left
    ctx.lineTo(x, y + r)
    ctx.lineTo(x + r, y)

    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    ctx.fill()
    // ctx.stroke()
    ctx.closePath()
    // 剪切
    ctx.clip()
    ctx.restore()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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