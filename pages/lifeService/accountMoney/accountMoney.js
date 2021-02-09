// pages/lifeService/accountMoney/accountMoney.js
var util = require('../../../utils/util');
Page({
  //点击导航标题事件
  _handlerTap:function(evt){
     //console.log(evt.currentTarget.id)
     let idx = parseInt(evt.currentTarget.id)
     this.setData({
       currentTarget:evt.currentTarget.id,
       currentIdx:idx
     })
  },
   //内容滑动事件
  _handleChange:function(evt){
      this.setData({
        currentTarget:evt.detail.current
      })
  },
   //【支出】数字输入框获取焦点
   payInputFocus: function(event) {
    console.log(event.detail.value)
    this.setData({
            payAmount: ""
    })
},

//【支出】数字输入框失去焦点时判断是否有内容
 payInputBlur: function(event) {
    let num = event.detail.value;
    this.setData({
      payAmount:num
    })
    if (num == "") {
            this.setData({
                    payAmount: "0.00"
            })
    }
},


// 【支出】选择分类
bindPickerChange: function(event) {
  
  //console.log(this.data.multiArray[event.detail.value])
  var Indexitem = this.data.multiArray[event.detail.value]
  this.setData({
   Index:event.detail.value,
   Indexitem:Indexitem
  })
},
 //选择支出日期
 bindPayDateChange: function(event) {
  console.log(event.detail.value)
   this.setData({
     payDate:event.detail.value
   })
},
//备注失去焦点
remarkBlur: function(event) {
  let text = event.detail.value;
 // console.log(text)
 this.setData({
  remarkPayContent:text
 })
},
// 【收入】选择分类
bindIncomePickerChange: function(event) {
  //console.log(this.data.incomeArray[event.detail.value])
  var Incomeitem = this.data.incomeArray[event.detail.value]
  this.setData({
    Incomeitem:Incomeitem,
    incomeIndex:event.detail.value
  })
},
//【收入】数字输入框失去焦点时判断是否有内容
incomeInputBlur: function(event) {
  let num = event.detail.value;
  this.setData({
    incomeAmount:num
  })
  if (num == "") {
          this.setData({
                  payAmount: "0.00"
          })
  }
},
//选择收入日期
bindIncomeDateChange: function(event) {
  console.log(event.detail.value)
   this.setData({
    incomeDate:event.detail.value
   })
},

/****支出点击按钮****/
_booking:function(e){
  var money = this.data.money
  var payAmount = this.data.payAmount
  var newmoney = Number(money)-Number(payAmount)
  this.setData({
    money:newmoney
  })
  wx.setStorage({
    data: newmoney,
    key: 'money',
  })

 // 先获取缓存中的内容
 let array = wx.getStorageSync('item') || []
  // 向数组中追加
  array.push({
     payAmount:this.data.payAmount,
      Indexitem:this.data.Indexitem,
      payDate:this.data.payDate,
      remarkPayContent:this.data.remarkPayContent,
      money:this.data.money
  })
  // 重新设置缓存
  wx.setStorage({
    key: 'item',
    data: array,
    success: function (res) {
      wx.showToast({
        title: '记账成功',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
      })  
    },fail(){
      wx.clearStorage({
        success: (res) => {},
      })
    }
  })

  
   //加载账单
   var that = this
   wx.getStorage({
     key: 'item',
     success (res) {
       console.log("666",res.data)
       that.setData({
         arr1:res.data.reverse()
       })
     }
   })
   var that = this
   wx.getStorage({
     key: 'item2',
     success (res) {
       console.log("777",res.data)
       that.setData({
         arr2:res.data.reverse()
       })
     }
   })

},

/**收入点击按钮************************** */
_booking2:function(e){
  var money = this.data.money
  var incomeAmount = this.data.incomeAmount
  var newmoney = Number(money)+Number(incomeAmount)
  this.setData({
    money:newmoney
  })
  wx.setStorage({
    data: newmoney,
    key: 'money',
  })
 // 先获取缓存中的内容
 let array = wx.getStorageSync('item2') || []
  // 向数组中追加
  array.push({
      incomeAmount:this.data.incomeAmount,
      Incomeitem:this.data.Incomeitem,
      incomeDate:this.data.incomeDate,
      remarkPayContent:this.data.remarkPayContent,
      money:this.data.money
  })
  // 重新设置缓存
  wx.setStorage({
    key: 'item2',
    data: array,
    success: function (res) {
      wx.showToast({
        title: '记账成功',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
      })  
    },fail(){
      wx.clearStorage({
        success: (res) => {},
      })
    }
  })
   //加载账单
   var that = this
   wx.getStorage({
     key: 'item',
     success (res) {
       console.log("666",res.data)
       that.setData({
         arr1:res.data.reverse()
       })
     }
   })
   var that = this
   wx.getStorage({
     key: 'item2',
     success (res) {
       console.log("777",res.data)
       that.setData({
         arr2:res.data.reverse()
       })
     }
   })

},


  /**
   * 页面的初始数据
   */
  data: {
      currentTarget:0,
       nowTime:'',
        // 【支出】
        multiArray: [
          '【食】品', '【交】通', '【购】物',  '【娱】乐', '【学】习', '【恋】爱',   '【医】疗', '【其】他', 
             ],
        Index: 0,
        Indexitem:'【食】品',
        payAmount: 0.00,
        payAccountIndex: [0, 0],

        payDate: "",//支付时间
        remarkPayContent:'',//备注

        // 【收入】
        incomeArray: ['生活费', '兼职收入', '红包收入', '利息收入', '理财收入', '奖学金', '赞助'],
        incomeIndex: 0,
        Incomeitem:"生活费",
        incomeAmount: 0.00,
        incomeDate:'',
        //余额
        money:0,
       //支出账单
       arr1:[],
       //收入账单
       arr2:[],

       //折叠展开动画
      flag1:true,
      flag2:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var nowTime = util.formatTime(new Date());
    this.setData({
            nowTime,
            payDate: nowTime,
            incomeDate: nowTime
    });
    

  },
//折叠面板
handFlag:function(){
  
  this.setData({
    flag1 : !this.data.flag1
  })
},
handFlag2:function(){
  
  this.setData({
    flag2 : !this.data.flag2
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
    wx.getStorage({
      key: 'item',
      success (res) {
        console.log("233",res.data[res.data.length-1].money)
        that.setData({
          money:res.data[res.data.length-1].money
        })
      }
    })
    //加载账单
    var that = this
    wx.getStorage({
      key: 'item',
      success (res) {
        console.log("666",res.data)
        that.setData({
          arr1:res.data.reverse()
        })
      }
    })
    var that = this
    wx.getStorage({
      key: 'item2',
      success (res) {
        console.log("777",res.data)
        that.setData({
          arr2:res.data.reverse()
        })
      }
    })
    var that = this
    wx.getStorage({
      key: 'money',
      success (res) {
        
        that.setData({
         money:res.data
        })
      }
    })

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