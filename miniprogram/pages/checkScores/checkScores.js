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
    xfNum: 0, //目前已修学分,
    zhNum: 0, //本学期综合成绩
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
      var jd = 0.0 //总绩点
      var jdNum = 0.0 //课程数量
      var jdsNum = 0.0 //非公共任选课程数量
      var num = 0.0 //总学分
      var xfJDNum = 0.0 //学分绩点和
      var zyNum = 0.0
      for (var i = 0; i < app.globalData.results.length; i++) {
        //如果 成绩 或 补考成绩 或 重修成绩 大于60分
        if (parseFloat(app.globalData.results[i].cj) >= 60.0 || parseFloat(app.globalData.results[i].bkcj) >= 60.0 || parseFloat(app.globalData.results[i].cxcj) >= 60.0) {
          num = num + parseFloat(app.globalData.results[i].xf)
          xfJDNum = xfJDNum + (parseFloat(app.globalData.results[i].xf) * parseFloat(app.globalData.results[i].jd)) //学分绩点总和
          if (app.globalData.results[i].xn === that.data.xn) { //本学年
            if (app.globalData.results[i].xq === that.data.xq) { //本学期
              jd = jd + parseFloat(app.globalData.results[i].jd) //总绩点
              jdNum++ //本学期所学课程数
            }
            if (app.globalData.results[i].kcxz != "公共任选课") {
              zyNum = zyNum + parseFloat(app.globalData.results[i].cj) //总成绩
              jdsNum++
            }
          }
        } else if (app.globalData.results[i].cj === '免修') { //如果为免修
          num = num + parseFloat(app.globalData.results[i].xf)
        }
      }
      xfJDNum = xfJDNum.toFixed(2)
      jd = jd.toFixed(2)
      console.log(jd)
      that.setData({
        xfNum: num,
        jdNum: jdNum,
        xfJD: jd,
        xfJDNum: xfJDNum,
        zhNum: (zyNum / jdsNum).toFixed(2)
      })
      if (xfJDNum >= 0) {
        accountDb.doc(app.globalData._openid).update({
          data: {
            xfjd: (zyNum / jdsNum).toFixed(2) //学分绩点和
          }
        })
      }
      // console.log(app.globalData.user)

      /**
       * 循环查询整合数据
       */
      var college = app.globalData.user[3]
      var major = app.globalData.user[4]
      var grade = app.globalData.user[2]
      that.getListCount(college, major, grade).then(res => {
        // console.log(res)
        let count = res
        let list = []
        for (let i = 0; i < count; i += 20) {
          that.getListIndexSkip(i, college, major, grade).then(res => {
            list = list.concat(res);
            if (list.length == count) {
              // console.log(list)
              var arr = []
              var hasMe = false //判断有没有自己
              for (var i = 0; i < list.length; i++) {
                if (parseFloat(list[i]['xfjd']) > 0) {
                  if (list[i]['name'] === app.globalData.user[6]) { //如果有自己的名字且有成绩
                    hasMe = true
                  }
                  arr.push(parseFloat(list[i]['xfjd']))
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
        }
      })

      // accountDb.where({
      //     'college': app.globalData.user[3],
      //     'major': app.globalData.user[4],
      //     'grade': app.globalData.user[2]
      //   })
      //   .get({
      //     success: function (res) {
      //       console.log(res.data)
      //       var arr = []
      //       var hasMe = false //判断有没有自己
      //       for (var i = 0; i < res.data.length; i++) {
      //         if (parseFloat(res.data[i]['xfjd']) > 0) {
      //           if (res.data[i]['name'] === app.globalData.user[6]) { //如果有自己的名字且有成绩
      //             hasMe = true
      //           }
      //           arr.push(parseFloat(res.data[i]['xfjd']))
      //         }
      //       }

      //       if (!hasMe) { //没成绩则放入自己的成绩
      //         arr.push(parseFloat(xfJDNum))
      //       }

      //       that.setData({
      //         ranking: arr.sort(function (a, b) {
      //           return b - a
      //         })
      //       })
      //     }
      //   })
    })
  },
  /**
   * 获取account总数
   */
  getListCount(college, major, grade) {
    return new Promise((resolve, reject) => {
      accountDb.where({
        'college': college,
        'major': major,
        'grade': grade
      }).count().then(res => {
        resolve(res.total)
      })
    })
  },
  /**
   * 单次查询函数
   */
  getListIndexSkip(skip, college, major, grade) {
    return new Promise((resolve, reject) => {
      // let statusList = []
      let selectPromise;
      if (skip > 0) {
        selectPromise = accountDb.where({
          'college': college,
          'major': major,
          'grade': grade
        }).skip(skip).get()
      } else {
        selectPromise = accountDb.where({
          'college': college,
          'major': major,
          'grade': grade
        }).get()
      }
      selectPromise.then(res => {
        resolve(res.data)
      })
    })
  }
})