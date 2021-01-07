//app.js
App({
  onLaunch: function () {
    //云开发环境初始化
    wx.cloud.init({
      env:"dor-stat-8gq3pn768a298b12"
    })
  },
  globalData:{
    useInfo:null
  }
})