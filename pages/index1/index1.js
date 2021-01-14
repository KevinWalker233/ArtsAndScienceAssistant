const db = wx.cloud.database().collection("schoolCalendar")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    year:0,
    schoolCalendar:[],
    information:{
      headInform:"",
      informs:[]
    },
    showStudyDay:false,//是否展示放假天数
    studyDay:0//距离放假还有多少天
  },
  //判断是否为闰年并返回月份的数组
  isOlympicYear:function(year){
    var month_olympic = [31,29,31,30,31,30,31,31,30,31,30,31];
    var month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
    var tmp = year % 4;
    if (tmp == 0) {
      return month_olympic;
    } else {
      return month_normal;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;

    //获取日期
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var my_year = date.getFullYear();
    var my_month = date.getMonth();
    var my_day = date.getDate();

    //每个月第一天是周几的数组
    var weeks = [];

    //用来给data的schoolCalendar赋值
    var p = [];

    //计算是否为闰年并赋值月份
    var month = this.isOlympicYear(my_year);

    
    // 指定日期和时间
    var EndTime = new Date();
    // 当前系统时间
    var NowTime = new Date();
    var t = EndTime.getTime() - NowTime.getTime();


    //这里是遍历12个月份
    for(var i=0;i<12;i++){
      var days = [];//要赋值给days的数组
      var week = new Date(my_year, i, 1).getDay();//得到每月的第一天是周几
      weeks[i] = week;
      //这里是每个月份有42个盒子，并给盒子赋值
      for(var j=0;j<42;j++){
        if(j%7==0||(j-6)%7==0){
          days[j]={
            days:"",
            color:"rgba(102,102,102,1)"
          };
        }else{
          days[j]={
            days:"",
            color:"rgba(0,0,0,1)"
          };
        }
      }

      //通过获取到每月第一天周几后通过每个月的天数设置显示的数字
      for(var k=week,l=1;l<=month[i];k++,l++){
        days[k]={
          days:l,
          color:days[k].color
        };
      }

      //这边是给p数组写入需要的数据
      p[i]={
        mouth:i+1,
        day:month[i],
        days: days
      };
    }
    this.setData({
      year:my_year,
      schoolCalendar:p
    });
    //加载假期
    db.doc("holiday").get({
      success(res){
        console.log(res.data.holidays);
        var holidays = res.data.holidays;
        var calendar = self.data.schoolCalendar;
        //遍历假期
        for(var i = 0;i<res.data.holidays.length;i++){
          var holiday = holidays[i];
          var yearBegin = holiday.holidayBegin.year;//暂时没用
          var monthBegin = holiday.holidayBegin.month;
          var dayBegin = holiday.holidayBegin.day;
          var yearEnd = holiday.holidayEnd.year;//暂时没用
          var monthEnd = holiday.holidayEnd.month;
          var dayEnd = holiday.holidayEnd.day;
          if((monthBegin-monthEnd)==0){//当假期开始月份和结束月份为同一个月时
            for(var j=dayBegin-1;j<dayEnd;j++){//遍历开始当天到结束当天
              var week1 = weeks[monthBegin-1]//得到放假当月第一天是周几
              calendar[monthBegin-1].days[week1+j]={
                days:calendar[monthBegin-1].days[week1+j].days,
                color:"rgb(255,255,255)",
                bgColor:"rgba(230,95,23,0.8)"
              };
            }
          }else{//当假期开始月份和结束月份为不同一个月时
            for(var k=dayBegin-1;k<month[monthBegin-1];k++){//遍历开始当天到月底
              var week2 = weeks[monthBegin-1]//得到放假当月第一天是周几
              calendar[monthBegin-1].days[week2+k]={
                days:calendar[monthBegin-1].days[week2+k].days,
                color:"rgb(255,255,255)",
                bgColor:"rgba(230,95,23,0.8)"
              };
            }
            for(var z=monthBegin+1;z<monthEnd;z++){
              for(var x=weeks[z-1];x<month[z-1]+weeks[z-1];x++){
                console.log(month[z-1]);
                calendar[z-1].days[x]={
                  days:calendar[z-1].days[x].days,
                  color:"rgb(255,255,255)",
                  bgColor:"rgba(230,95,23,0.8)"
                };
              }
            }
            for(var l=weeks[monthEnd-1];l<dayEnd+weeks[monthEnd-1];l++){//遍历开始当天到结束当天
              calendar[monthEnd-1].days[l]={
                days:calendar[monthEnd-1].days[l].days,
                color:"rgb(255,255,255)",
                bgColor:"rgba(230,95,23,0.8)"
              };
            }
          }
        }
        self.setData({
          schoolCalendar:calendar
        });
      }
    })
    //加载考试
    db.doc("examination").get({
      success(res){
        console.log(res.data.examinations);
        var examinations = res.data.examinations;
        var calendar = self.data.schoolCalendar;
        //遍历考试
        for(var i = 0;i<res.data.examinations.length;i++){
          var examination = examinations[i];
          var yearBegin = examination.examinationBegin.year;//暂时没用
          var monthBegin = examination.examinationBegin.month;
          var dayBegin = examination.examinationBegin.day;
          var yearEnd = examination.examinationEnd.year;//暂时没用
          var monthEnd = examination.examinationEnd.month;
          var dayEnd = examination.examinationEnd.day;
          if((monthBegin-monthEnd)==0){//当假期开始月份和结束月份为同一个月时
            for(var j=dayBegin-1;j<dayEnd;j++){//遍历开始当天到结束当天
              var week1 = weeks[monthBegin-1]//得到放假当月第一天是周几
              calendar[monthBegin-1].days[week1+j]={
                days:calendar[monthBegin-1].days[week1+j].days,
                color:"rgb(255,255,255)",
                bgColor:"rgba(56,120,194,0.8)"
              };
            }
          }else{//当假期开始月份和结束月份为不同一个月时
            for(var k=dayBegin-1;k<month[monthBegin-1];k++){//遍历开始当天到月底
              var week2 = weeks[monthBegin-1]//得到放假当月第一天是周几
              calendar[monthBegin-1].days[week2+k]={
                days:calendar[monthBegin-1].days[week2+k].days,
                color:"rgb(255,255,255)",
                bgColor:"rgba(56,120,194,0.8)"
              };
            }
            for(var z=monthBegin+1;z<monthEnd;z++){
              for(var x=weeks[z-1];x<month[z-1]+weeks[z-1];x++){
                console.log(month[z-1]);
                calendar[z-1].days[x]={
                  days:calendar[z-1].days[x].days,
                  color:"rgb(255,255,255)",
                  bgColor:"rgba(56,120,194,0.8)"
                };
              }
            }
            for(var l=weeks[monthEnd-1];l<dayEnd+weeks[monthEnd-1];l++){//遍历开始当天到结束当天
              calendar[monthEnd-1].days[l]={
                days:calendar[monthEnd-1].days[l].days,
                color:"rgb(255,255,255)",
                bgColor:"rgba(56,120,194,0.8)"
              };
            }
          }
        }
        self.setData({
          schoolCalendar:calendar
        });
      }
    })
    db.doc("information").get({
      success(res){
        self.setData({
          information:{
            headInform:res.data.headInform
          }
        })
      }
    });
    db.doc("holiday").get({
      success(res){
      // 指定日期和时间
      var EndTime = new Date(res.data.nextHoliday.year,res.data.nextHoliday.month,res.data.nextHoliday.day);
      console.log(EndTime);
      // 当前系统时间
      var NowTime = new Date();
      console.log(NowTime);
      var t = parseInt((EndTime.getTime() - NowTime.getTime()) / 1000 / 60 / 60 / 24);
      console.log(t);
        self.setData({
          showStudyDay:res.data.showStudyDay,
          studyDay:t
        })
      }
    });
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