// pages/iexpFunction/concentrat/concentrat.js
var bgam = wx.createInnerAudioContext();
const timeFormat = require('../../../utils/time.js');

Page({
//点击每个导航的点击事件
handleTap: function(e) {
  let id = e.currentTarget.id;
  if(id){
    this.setData({
      currentId:id
    })
  }
},
  /**
   * 页面的初始数据
   */
  data: {
    currentId: '1',
    section: [{
      name: '专注',
      typeId: '1'
    },  {
      name: '统计',
      typeId: '2'
    }],
    // 专注项，图片文字
    time:'5',
    timer:null,
    mTime:300000,
    timeStr:'05:00',
    pauseShow: true,
    // 选中激活项
    cateActive:'0',
    cateArr:[
      {
        icon:'work.png',
        text:'工作'
      },
      {
        icon:'study.png',
        text:'学习'
      },
      {
        icon:'think.png',
        text:'思考'
      },
      {
        icon:'write.png',
        text:'写作'
      },
      {
        icon:'sports.png',
        text:'运动'
      },
      {
        icon:'read.png',
        text:'阅读'
      }, 
    ],
    rate:'',
    showModal:false,
    // 统计页面
    sum:[
    {
      title: '今日专注次数',
      value: '0',
    },{
      title: '累计专注次数',
      value: '0'
    },{
      title: '今日专注时长',
      value: '0分钟'
    },{
      title: '累计专注时长',
      value: '0分钟'
    }],
    actionIndex: 0,
    dayList:[],
    list:[],
  },
  silderChange: function(e){
    this.setData({
      time:e.detail.value
    })
  },
  // 点击专注项激活
  clickCate: function(e){
    this.setData({
      cateActive:e.currentTarget.dataset.index
    })
  },
  // 点击开始专注，弹出模态框
  toShowModal: function(e) {
    this.setData({
      showModal: true,
      mTime: this.data.time*60*1000,
      timeStr:parseInt(this.data.time) >= 10 ? this.data.time + ":00" : '0'+this.data.time +":00"
    }),
    this.drawActive();
  },
  //  canvas 画圆填充
  drawActive: function(){
    var _this = this;
     var timer = setInterval(function(){
    // 转化角度
    var angle = 1.5 + 2*(_this.data.time*60*1000 - _this.data.mTime)/(_this.data.time*60*1000);
    var currentTime = _this.data.mTime - 100
    _this.setData({
      mTime: currentTime
    });
    if(angle < 3.5){
      if(currentTime % 1000 == 0){
        var timeStr1 = currentTime /1000; //s
        var timeStr2 = parseInt(timeStr1 /60); // m
        var timeStr3 = (timeStr1 - timeStr2 * 60) >= 10 ? (timeStr1 - timeStr2 * 60): '0' +(timeStr1 - timeStr2 * 60);
        var timeStr2 = timeStr2 >= 10 ? timeStr2 : '0' + timeStr2;
        _this.setData({
          timeStr:timeStr2+":"+timeStr3
        })
      }
    var lineWidth = 6 / _this.data.rate;
    var ctx = wx.createCanvasContext('progress_active');
    ctx.setLineWidth(lineWidth);
    ctx.setStrokeStyle('#ffffff');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(400/_this.data.rate/2,400/_this.data.rate/2,400/_this.data.rate/2 - 2*lineWidth,1.5*Math.PI,angle * Math.PI,false);
    ctx.stroke();
    ctx.draw();
    } else{
      // 计时结束,播放音频,关闭对话框,计入缓存
      clearInterval(timer);
      bgam.play();
      _this.setData({
        timeStr:'00:00',
        showModal:false
      });
      var logs = wx.getStorageSync('logs') || [];
      logs.unshift({
        data: timeFormat.formatTime(new Date),
        cate: _this.data.cateActive,
        time: _this.data.time
      });
      wx.setStorageSync('logs', logs);
      }
    },100);
    _this.setData({
      timer:timer
    })
  },
  
  // 点击暂停，实现停止时间，显示继续按钮等操作
  pauseTime: function(){
    clearInterval(this.data.timer);
    this.setData({
      pauseShow:false
    })
  },
  // 点击继续，实现继续倒计时，显示暂停按钮
  continueTime: function(){
    this.drawActive();
    this.setData({
      pauseShow:true
    })
  },
  // 点击放弃，结束
  cancleTime: function(){
    var _this = this
    // 提示框
    wx.showModal({
      title: '确认放弃',
      content: '再坚持一下？快要坚持成功了！',
      confirmText: '继续坚持',
      cancelText: '仍要放弃',
      success: function (res) {
        if (res.confirm) {
          _this.drawActive();
          _this.setData({
            pauseShow:true
          })
        } else {
          clearInterval(_this.data.timer);
          _this.setData({
            pauseShow:true,
            showModal:false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载成功时音频
    bgam.src = 'cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/success.mp3'
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth
    this.setData({
      rate:rate
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
    var logs = wx.getStorageSync('logs') || [];
    var day = 0;
    var totle = logs.length;
    var dayTime = 0;
    var totleTime = 0;
    var dayList = [];
    if(logs.length > 0){
      for(var i = 0; i < logs.length; i++){
        if(logs[i].data.substr(0,10) == timeFormat.formatTime(new Date).substr(0,10)){
          day = day + 1;
          dayTime = dayTime + parseInt(logs[i].time);
          dayList.push(logs[i]);
          this.setData({
            dayList: dayList,
            list: dayList
          })
        }
        totleTime = totleTime + parseInt(logs[i].time);
      }
      this.setData({
        'sum[0].value':day,
        'sum[1].value':totle,
        'sum[2].value':dayTime+'分钟',
        'sum[3].value':totleTime+'分钟'
      })
    }
  },
  changeType: function(e){
    var index = e.currentTarget.dataset.index;
    if(index == 0){
      this.setData({
        list: this.data.dayList
      })
    } else if(index == 1){
      var logs = wx.getStorageSync('logs') || [];
      this.setData({
        list: logs
      })
    }
    this.setData({
      actionIndex: index
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
    var _this = this
    // 停止计时
    clearInterval(_this.data.timer);
    _this.setData({
      pauseShow:true,
      showModal:false
    })
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