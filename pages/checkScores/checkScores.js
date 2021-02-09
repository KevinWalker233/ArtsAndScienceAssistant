var app = getApp()
const configDb = wx.cloud.database().collection("config");
const accountDb = wx.cloud.database().collection("account")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    xn: '', //学年
    xq: '', //学期
    jdNum: 0, //本学期所学课程数量
    xfJD: 0, //总绩点
    xfJDNum: 0, //平均绩点
    xfNum: 0, //目前已修学分
    ranking: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.results.length == 0) {
      wx.navigateTo({
        url: "/pages/loginL/loginL?home=result",
      })
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

    configDb.doc('xqxx').get().then(res => {
      that.setData({
        xn: res.data.xn,
        xq: res.data.xq
      })
      var jd = 0 //总绩点
      var jdNum = 0 //课程数量
      var num = 0 //总学分
      var xfJDNum = 0 //学分绩点和
      for (var i = 0; i < app.globalData.results.length; i++) {
        num = num + parseFloat(app.globalData.results[i].xf)
        xfJDNum = xfJDNum + (parseFloat(app.globalData.results[i].xf) * parseFloat(app.globalData.results[i].jd)) //学分绩点总和
        if (app.globalData.results[i].xn === that.data.xn && app.globalData.results[i].xq === that.data.xq) {
          jd = jd + parseFloat(app.globalData.results[i].jd) //总绩点
          jdNum++ //本学期所学课程数
        }
      }
      xfJDNum = xfJDNum.toFixed(2)
      that.setData({
        xfNum: num,
        jdNum: jdNum,
        xfJD: jd,
        xfJDNum: xfJDNum
      })
      if (xfJDNum >= 0) {
        accountDb.doc(app.globalData._openid).update({
          data: {
            xfjd: xfJDNum //学分绩点和
          }
        })
      }
      console.log(app.globalData.user)
      accountDb.where({
          'college': app.globalData.user[3],
          'major': app.globalData.user[4],
          'grade': app.globalData.user[2]
        })
        .get({
          success: function (res) {
            console.log(res.data)
            var arr = []
            var hasMe = false //判断有没有自己
            for (var i = 0; i < res.data.length; i++) {
              if (parseFloat(res.data[i]['xfjd']) >= 0) {
                if (res.data[i]['name'] === app.globalData.user[6]) { //如果有自己的名字且有成绩
                  hasMe = true
                }
                arr.push(parseFloat(res.data[i]['xfjd']))
              }
            }

            if (!hasMe) { //没成绩则放入自己的成绩
              arr.push(parseFloat(xfJDNum))
            }

            that.setData({
              ranking: arr.sort(function (a, b) {
                return b - a
              })
            })
          }
        })
    })
  },
})