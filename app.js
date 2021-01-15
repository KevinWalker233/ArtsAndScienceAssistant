// app.js
App({
  globalData: {
    userInfo: null,
    _openid:0,
    olduser:true
  },
    
  
  onLaunch() {
    //云开发初始化
    wx.cloud.init({
      env:"dor-stat-8gq3pn768a298b12"
    })
    
    const db = wx.cloud.database().collection("account");

    //获取用户openid
    
    wx.cloud.callFunction({    //调用云函数获取openid
      name:"getopenid",
      complete:res=>{
        console.log(res);
        db.where({
          _openid:res.result.openid   //进行筛选
        }).get({
          success(res){
            console.log(res.data.length)
            if(res.data.length==0){
              //通过判断data数组长度是否为0来进行下一步的逻辑处理
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          },
          fail(res){
            console.log(res);
          }
        })
      }
  })
  },
 
})
