// app.js
App({
  globalData: {
    userInfo: null,
    _openid:0,
    olduser:true
  },
    
  
  onLaunch() {
    
    /*wx.navigateTo({
      url: '/pages/login/login',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
        
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })*/
    //云开发初始化
    wx.cloud.init({
      env:"sjl-3gekxaj6d5829670",
      env:"sjl-3gekxaj6d5829670"
    })
    
    const db = wx.cloud.database().collection("account");

    //获取用户openid
    
    wx.cloud.callFunction({    //调用云函数获取openid
      name:"getopenid",
      complete:res=>{
        db.where({
          _openid:res.result.openid   //进行筛选
        }).get({
          success:res=>{
            console.log(res.data.length)
            if(res.data.length==0){
              //通过判断data数组长度是否为0来进行下一步的逻辑处理
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }
        })
      }
    })

    
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    /*wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
  },
 
})
