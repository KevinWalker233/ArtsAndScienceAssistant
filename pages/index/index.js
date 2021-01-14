<<<<<<< HEAD
// index.js
// 获取应用实例
const app = getApp()


Page({
 
  /*getopenid(){
    var that = this
    wx.cloud.callFunction({
      name:"getopenid",
      success(res){
        that.setData({
          openid:res.result.openid
        })
       console.log("获取openid成功",res.result.openid)
      }
    })
  },*/
  data: {
       account:[],
        // 颜色数组，用于课程的背景颜色
    colorArrays:["#85B8CF","#90C652","#D8AA5A","#FC9F9D","#0A9A84","#61BC69","#12AEF3","#E29AAD"],
    // 课表数组
    wlist: [
     
    ]
  },
  // 事件处理函数
  bindViewTap() {
=======
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
>>>>>>> 413c20125b31c6d86d53788423bcc432e6f969b3
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
<<<<<<< HEAD
  onLoad() {
    const db2 = wx.cloud.database().collection("schedule");
    //添加云数据库课表记录
   /*db2.add({
       data:{
         grade:"2020级",
                    college:"计算机学院",
                    major:"物联网工程",
                    classes:"1",
                    wlist: [
                      { "weekTime": 1, "jieCi": 1, "courseName": "大学英语2","address": "综合楼702"},
         { "weekTime": 1, "jieCi": 3, "courseName": "大学英语2","address": "成教楼102"},
         { "weekTime": 1, "jieCi": 5, "courseName": "线性代数","address": "教学主楼601"},
         { "weekTime": 1, "jieCi": 7, "courseName": "大学生心理健康教育","address": "电气楼401"},
         { "weekTime": 1, "jieCi": 9, "courseName": "大学物理1","address": "综合楼702"},
                      { "weekTime": 2, "jieCi": 1, "courseName": "高等数学", "address": "电气楼501" },
                      { "weekTime": 2, "jieCi": 3, "courseName": "离散数学", "address": "综合楼702"},
         { "weekTime": 2, "jieCi": 5, "courseName": "中国近代史纲要", "address": "综合楼701"}, 
                      { "weekTime": 3, "jieCi": 3, "courseName": "线性代数 ","address": "电气楼501"},
         { "weekTime": 3, "jieCi": 5, "courseName": "python程序设计", "address": "综合楼702"},
                      { "weekTime": 3, "jieCi": 7, "courseName": "形势与政策2", "address": "综合楼701"},
         { "weekTime": 3, "jieCi": 9, "courseName": "大学物理1", "address": "综合楼702"},
                      { "weekTime": 4, "jieCi": 1, "courseName": "物联网工程导论", "address": "综合楼701" },
         { "weekTime": 4, "jieCi": 3, "courseName": "离散数学", "address": "综合楼702" },
         { "weekTime": 4, "jieCi": 7, "courseName": "大学体育2", "address": "老校区操场" },
         { "weekTime": 5, "jieCi": 5, "courseName": "python程序设计", "address": "计算机中心10层" },
         { "weekTime": 5, "jieCi": 7, "courseName": "高等数学2", "address": "教学主楼601" },]
                    
       }
    })*/
    
    /*var that = this
    wx.cloud.callFunction({
      name:"getopenid",
      success(res){
        that.setData({
          'user_info.openid':res.result.openid ,
        })
       //console.log("获取openid成功",res.result.openid)
      }
    })
    console.log(options)
    var college = options.college
    var major = options.major
    var classes = options.class 
    this.setData({
      'user_info.college':college,
      'user_info.major':major,
      'user_info.classes':classes
    })
    console.log(this.data)
    /*db.add({
        data:{
          college:this.data.user_info.college,
          major:this.data.user_info.major,
          classes:this.data.user_info.classes,
          openid:this.data.user_info.openid

        }
    })*/
    var that = this
    wx.cloud.callFunction({
      name:"getopenid",
      success(res){
        that.setData({
          _openid:res.result.openid
        })
       console.log("获取openid成功",res.result.openid)
      }
    })
    
    const db = wx.cloud.database().collection("account");
    const DB = wx.cloud.database().collection("schedule");
    db.where({
      _openid:this.data._openid
    }).get().then(res=>{
      console.log("查询成功",res.data[0])
      this.setData({   //设置data中的account数据
        account:res.data
        
      })
      DB.where({
        grade:"2020级",
        major:"物联网工程",
        classes:"1"
     })
     .get().then(res=>{
       console.log("查询成功233",res)
       this.setData({
         wlist: res.data[0].wlist
       })
     }).catch(err=>{
       console.log("查询失败",err)
     })
     
      
    }).catch(err=>{
      console.log("查询失败",err)
    })
    
    //console.log(this)
    /**************************查询课表************************************** */
    
   
    
    
/************************************************************** */
=======
  onLoad: function () {
>>>>>>> 413c20125b31c6d86d53788423bcc432e6f969b3
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
<<<<<<< HEAD
    } else if (this.data.canIUse) {
=======
    } else if (this.data.canIUse){
>>>>>>> 413c20125b31c6d86d53788423bcc432e6f969b3
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
<<<<<<< HEAD
    
  },
  getUserInfo(e) {
=======
  },
  getUserInfo: function(e) {
>>>>>>> 413c20125b31c6d86d53788423bcc432e6f969b3
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
