App({
  globalData: {
    _openid:-1,
    account: [],//用户数据
    configVersion:-1,//配置文件版本
    times:[]//课表时间
  },
  onLaunch() {
    var that = this;

    //云开发初始化
    wx.cloud.init({
      env:"dor-stat-8gq3pn768a298b12"
    })
    const schoolCalendarDb = wx.cloud.database().collection("schoolCalendar")
    const accountDb = wx.cloud.database().collection("account");
    const scheduleDb = wx.cloud.database().collection("schedule");
    const configDb = wx.cloud.database().collection("config");

    //获取用户openid
    wx.cloud.callFunction({    //调用云函数获取openid
    name:"getopenid",
    complete:res=>{
      that.globalData._openid=res.result.openid;
      accountDb.where({
        _openid:res.result.openid   //进行筛选
      }).get({
        success(res){
          if(res.data.length==0){
            //通过判断data数组长度是否为0来进行下一步的逻辑处理
            wx.switchTab({
              url: "/pages/wo/wo",
            })
          }
        },
        fail(res){
          console.log(res);
        }
      })
    }
  });
  }
})
