// pages/infoCheck/holiday/holiday.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    notice:{
      releaseName:"宝鸡文理学院教务处",
      releaseTime:"2021年02月12日",
      content:"今天是2020年1月三大技术等哈就到时间啊大技术等哈就打萨达时间等哈就说你打技术等哈就说杜阿姨撒技术等哈u尾巴嫉妒啊时间的萨达u速度啊速度叫阿好烦"
    },
    timeList:[
      {
        actName:"距上课时间",
        actIcon:"../../../assets/holidayIcon/lesson.png",
        actEndTime: '2021/03/01 10:00:43'
      },
      {
        actName:"2021春节",
        actIcon:"../../../assets/holidayIcon/newYear.png",
        actEndTime: '2021/02/12 00:00:00'
      },
      {
        actName:"情人节",
        actIcon:"../../../assets/holidayIcon/valentineDay.png",
        actEndTime: '2021/06/01 10:00:43'
      }
    ],
    countDownList: [],
    // 倒计时间数组
    actEndTimeList: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let endTimeList = [];
    // 将活动的结束时间参数提成一个单独的数组，方便操作
    this.data.timeList.forEach(o => {endTimeList.push(o.actEndTime)})
    this.setData({ 
      actEndTimeList: endTimeList
    });
    // 执行倒计时函数
    this.countDown();
  },
  timeFormat(param){//小于10的格式化函数
    return param < 10 ? '0' + param : param; 
  },
  countDown(){//倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0){
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      }else{//活动已结束，全部设置为'00'
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({ countDownList: countDownArr})
    setTimeout(this.countDown,1000);
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