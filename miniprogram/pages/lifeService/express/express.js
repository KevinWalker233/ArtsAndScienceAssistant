var exNum = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: null
  },
  /**
   * 扫码
   */
  sweep() {
    var that = this
    wx.scanCode({
      success(res) {
        var num = res.result
        console.log(res)
        
          that.setData({
            num: num
          })
          exNum = num
        
      }
    })
  },
  /**
   * 监听输入
   */
  listener(e) {
    var num = e.detail.value
    exNum = num
  

  },
 
  /**
   * 提交单号
   */
  submit() {
    //console.log(exNum)
    if (exNum.length < 5) {
      wx.showModal({
        title: '提示',
        content: '请检查快递单号是否输入正确',
        showCancel: false
      })
    } else {
      wx.showLoading({
        title: '查询中',
      })
      wx.request({
        url: 'https://api.tianapi.com/txapi/kuaidi/index?key=a56d6b18eaafded09201c84ffa0940a5&number=' + exNum,
        complete: function() {
          wx.hideLoading()
        },
        success: function(result) {

          if (result.data.msg == "数据返回为空") {
            wx.showModal({
              title: '查询失败',
              content: '查询快递信息失败',
              showCancel: false
            })
          } else if (result.data.msg == "success") {
            console.log(result)
            var list = result.data.newslist[0]
            list.num = exNum
            wx.navigateTo({
              url: '../express/logs/logs?list=' + JSON.stringify(list)
            })
          } else {
            wx.showModal({
              title: '查询失败',
              content: '未知错误',
              showCancel: false
            })
          }
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
