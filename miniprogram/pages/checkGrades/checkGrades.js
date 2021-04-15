var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    results: [], //成绩
    showResults: [], //展示的成绩
    xns: [], //学年
    xqs: [], //学期
    chooseXN: '', //所选学年
    chooseXQ: '', //所选学期
    showXN: '选择学年', //展示的学年
    showXQ: '选择学期', //展示的学期
    Ccontext: [] //这里是顶部数据
  },
  clickBox(e) {
    wx.showModal({
      title: '成绩信息',
      content: 
      '学年:' + this.data.showResults[e.currentTarget.dataset.index]['xn'] + '\r\n' +
      '学期:' + this.data.showResults[e.currentTarget.dataset.index]['xq'] + '\r\n' +
      this.data.showResults[e.currentTarget.dataset.index]['kcmc'] + '\r\n' +
      '成绩:' + this.data.showResults[e.currentTarget.dataset.index]['cj'] + '\r\n' +
      '绩点:' + this.data.showResults[e.currentTarget.dataset.index]['jd'] + '\r\n' +
      '补考成绩:' + this.data.showResults[e.currentTarget.dataset.index]['bkcj'] + '\r\n' +
      '重修成绩:' + this.data.showResults[e.currentTarget.dataset.index]['cxcj'] + '\r\n' +
      '学分:' + this.data.showResults[e.currentTarget.dataset.index]['xf'] + '\r\n' +
      '辅修标记:' + this.data.showResults[e.currentTarget.dataset.index]['fxbj'] + '\r\n' +
      '重修标记:' + this.data.showResults[e.currentTarget.dataset.index]['cxbj'] + '\r\n' +
      '课程代码:' + this.data.showResults[e.currentTarget.dataset.index]['kcdm'] + '\r\n' +
      '课程性质:' + this.data.showResults[e.currentTarget.dataset.index]['kcxz'] + '\r\n' +
      '课程归属:' + this.data.showResults[e.currentTarget.dataset.index]['kxgs'] + '\r\n' +
      '开课学院:' + this.data.showResults[e.currentTarget.dataset.index]['kkxy'] + '\r\n' +
      '备注:' + this.data.showResults[e.currentTarget.dataset.index]['bz'],
      confirmText: '我知道了',
      showCancel: false
    })
  },
  login(res) { //更新数据按钮
    wx.navigateTo({
      url: "/pages/loginL/loginL?home=result",
    })
  },
  changeXN(res) {
    this.setData({
      chooseXN: res.detail.value,
      showXN: this.data.xns[parseInt(res.detail.value)]
    })
    var newResults = []
    console.log(this.data.chooseXQ)
    if (this.data.chooseXQ === '') {
      var choose = this.data.xns[parseInt(this.data.chooseXN)]
      for (var i = 0; i < this.data.results.length; i++) {
        if (this.data.results[i].xn === choose) {
          newResults.push(this.data.results[i])
        }
      }
    } else {
      var choose = this.data.xns[parseInt(this.data.chooseXN)]
      var choose1 = this.data.xqs[parseInt(this.data.chooseXQ)]
      for (var i = 0; i < this.data.results.length; i++) {
        if (this.data.results[i].xn === choose && this.data.results[i].xq === choose1) {
          newResults.push(this.data.results[i])
        }
      }
    }
    this.setData({
      showResults: newResults,
      Ccontext: this.selectResult(newResults)
    })
  },
  changeXQ(res) {
    this.setData({
      chooseXQ: res.detail.value,
      showXQ: this.data.xqs[parseInt(res.detail.value)]
    })
    var newResults = []
    if (this.data.chooseXN === '') {
      var choose = this.data.xqs[parseInt(this.data.chooseXQ)]
      for (var i = 0; i < this.data.results.length; i++) {
        if (this.data.results[i].xq === choose) {
          newResults.push(this.data.results[i])
        }
      }
    } else {
      var choose = this.data.xqs[parseInt(this.data.chooseXQ)]
      var choose1 = this.data.xns[parseInt(this.data.chooseXN)]
      for (var i = 0; i < this.data.results.length; i++) {
        if (this.data.results[i].xq === choose && this.data.results[i].xn === choose1) {
          newResults.push(this.data.results[i])
        }
      }
    }
    this.setData({
      showResults: newResults,
      Ccontext: this.selectResult(newResults)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({ //获取本地成绩数据
      key: 'results',
      success(res) {
        app.globalData.results = [].concat(JSON.parse(res.data))
        that.setData({
          results: [].concat(JSON.parse(res.data)),
          showResults: [].concat(JSON.parse(res.data))
        })
      },
      fail(res) {
        console.log(res)
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
    var that = this
    that.setData({
      results: app.globalData.results,
      showResults: app.globalData.results
    })

    const xnsSet = new Set(); //创建一个数组用来存学年
    const xqsSet = new Set(); //创建一个数组用来存学期
    for (var i = 0; i < that.data.results.length; i++) {
      xnsSet.add(that.data.results[i].xn)
      xqsSet.add(that.data.results[i].xq)
    }

    that.setData({
      xns: Array.from(xnsSet),
      xqs: Array.from(xqsSet)
    })

    that.setData({
      Ccontext: that.selectResult(that.data.showResults)
    })
  },
  /**
   * 筛选顶部数据
   * @param {*} result 
   */
  selectResult(result) {
    var classNum = 0
    var loseClassNum = 0
    var successClassNum = 0
    classNum = result.length
    for (var i = 0; i < result.length; i++) {
      if (parseInt(result[i].cj) < 60) {
        loseClassNum++
      } else if (parseInt(result[i].cj) >= 85) {
        successClassNum++
      }
    }
    var Ccontext = [{
        title: loseClassNum + '科',
        value: parseInt((loseClassNum / classNum) * 100)
      },
      {
        title: parseInt((((classNum - loseClassNum) / classNum)) * 100) + '%',
        value: parseInt((classNum - loseClassNum) / classNum * 100)
      }, {
        title: successClassNum + '科',
        value: parseInt((successClassNum / classNum) * 100)
      }
    ]
    return Ccontext
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