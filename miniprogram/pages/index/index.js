const app = getApp()
const db = wx.cloud.database().collection("schoolCalendar")
const db3 = wx.cloud.database().collection("config");

Page({
  data: {
    //课表
    // 颜色数组，用于课程的背景颜色
    dayBgColor: "rgba(27,155,134,0.8)", //当天的背景颜色
    dayColor: "rgba(255,255,255,1)", //当天的颜色
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [], // 课表色块数组
    leftClass: [], //左侧课表时间
    week: 0, //周次
    dayWeek: 0, //当天是第几周
    weekPicker: ['全部', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], //周次
    month: 0, //顶部显示的月
    day: 0, //顶部显示的天
    weekName: '', //顶部显示的周
    //校历
    year: 0, //校历显示的年
    schoolCalendar: [], //月份信息
    //校历上的信息
    information: {
      headInform: "", //校历上面提示的信息
      informs: [] //还未使用
    },
    showStudyDay: false, //是否展示放假天数
    studyDay: 0, //距离放假还有多少天
    hideNotice: true, //是否显示顶部公告栏
    notice: '', //顶部公告栏内容
    top: 0
  },
  changeWeek(res) { //选择周次
    wx.setStorage({
      data: (parseInt(res.detail.value)),
      key: 'week',
    })
    this.setData({ //设置课表
      wlist: this.wlistFactory(app.globalData.wlist, (parseInt(res.detail.value))),
      week: (parseInt(res.detail.value))
    })
  },
  login(res) { //点击更新课表按钮
    wx.navigateTo({
      url: "/pages/loginL/loginL?home=index",
    })
  },
  edit(res) {
    wx.navigateTo({
      url: "/pages/edit/edit"
    })
  },
  share(res) {
    // wx.cloud.callFunction({
    //   name: "test",
    //   success(res) {
    //     console.log(res)
    //   }
    // })
    // wx.cloud.callFunction({
    //   name: "bookCollection",
    //   success(res) {
    //     console.log(res.result)
    //   },
    //   fail(err){
    //     console.log(err)
    //   }
    // })

    var week = ''
    if (this.data.week > 0) week = '第' + this.data.week + '周'
    else week = '全部'
    var user = JSON.parse(wx.getStorageSync('user'))
    var time = this.data.year + '年' + this.data.month + '月' + this.data.day + '日(周' + this.data.weekName + ')'
    wx.navigateTo({
      url: "/pages/share/share?week=" + week + '&time=' + time + '&classes=' + user[5] + '&wlist=' + JSON.stringify(this.data.wlist)
    })

    // wx.navigateTo({
    //   url: "/pages/head/head"
    // })
  },
  //判断是否为闰年并返回月份的数组
  isOlympicYear: function (year) {
    var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var tmp = year % 4;
    if (tmp == 0) {
      return month_olympic;
    } else {
      return month_normal;
    }
  },
  //解析处理wlist的函数
  wlistFactory(wlist, week) {
    if (parseInt(week) === 0) {
      return wlist
    } else {
      var newWlist = []
      var danShuangZhou
      if (parseInt(week) % 2 === 0) {
        danShuangZhou = '双'
      } else {
        danShuangZhou = '单'
      }
      for (var i = 0; i < wlist.length; i++) {
        var start = parseInt(wlist[i]['weeks'].split('(')[0].split('-')[0])
        var end = parseInt(wlist[i]['weeks'].split('(')[0].split('-')[1])
        if (start <= parseInt(week) && parseInt(week) <= end) {
          if (wlist[i]['weeks'].indexOf('单') != -1 || wlist[i]['weeks'].indexOf('双') != -1) {
            if (wlist[i]['weeks'].indexOf(danShuangZhou) != -1) {
              newWlist.push(wlist[i])
            }
          } else {
            newWlist.push(wlist[i])
          }
        }
      }
      return newWlist
    }
  },
  onLoad() {
    db3.doc('navigationBar').get({
      success(res) {
        wx.setNavigationBarColor({
          frontColor: res.data.frontColor,
          backgroundColor: res.data.backgroundColor
        })
      }
    })
    var self = this;

    this.widget = this.selectComponent('.widget');

    //获取日期
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var my_year = date.getFullYear();
    var my_month = date.getMonth();
    var my_day = date.getDate();
    var my_week = date.getDay();
    var weekName = ['日', '一', '二', '三', '四', '五', '六']

    self.setData({
      month: my_month + 1,
      day: my_day,
      weekName: weekName[my_week],
      dayWeek: my_week
    })

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
    for (var i = 0; i < 12; i++) {
      var days = []; //要赋值给days的数组
      var week = new Date(my_year, i, 1).getDay(); //得到每月的第一天是周几
      weeks[i] = week;
      //这里是每个月份有42个盒子，并给盒子赋值
      for (var j = 0; j < 42; j++) {
        if (j % 7 == 0 || (j - 6) % 7 == 0) {
          days[j] = {
            days: "",
            color: "rgba(102,102,102,1)"
          };
        } else {
          days[j] = {
            days: "",
            color: "rgba(0,0,0,1)"
          };
        }
      }

      //通过获取到每月第一天周几后通过每个月的天数设置显示的数字
      for (var k = week, l = 1; l <= month[i]; k++, l++) {
        days[k] = {
          days: l,
          color: days[k].color
        };
      }

      //这边是给p数组写入需要的数据
      p[i] = {
        mouth: i + 1,
        day: month[i],
        days: days
      };
    }
    this.setData({
      year: my_year,
      schoolCalendar: p
    });

    //加载假期
    db.doc("holiday").get({
      success(res) {
        // console.log(res.data.holidays);
        var holidays = res.data.holidays;
        var calendar = self.data.schoolCalendar;
        //遍历假期
        for (var i = 0; i < res.data.holidays.length; i++) {
          var holiday = holidays[i];
          var yearBegin = holiday.holidayBegin.year; //暂时没用
          var monthBegin = holiday.holidayBegin.month;
          var dayBegin = holiday.holidayBegin.day;
          var yearEnd = holiday.holidayEnd.year; //暂时没用
          var monthEnd = holiday.holidayEnd.month;
          var dayEnd = holiday.holidayEnd.day;
          if ((monthBegin - monthEnd) == 0) { //当假期开始月份和结束月份为同一个月时
            for (var j = dayBegin - 1; j < dayEnd; j++) { //遍历开始当天到结束当天
              var week1 = weeks[monthBegin - 1] //得到放假当月第一天是周几
              calendar[monthBegin - 1].days[week1 + j] = {
                days: calendar[monthBegin - 1].days[week1 + j].days,
                color: "rgb(255,255,255)",
                bgColor: "rgba(230,95,23,0.8)"
              };
            }
          } else { //当假期开始月份和结束月份为不同一个月时
            for (var k = dayBegin - 1; k < month[monthBegin - 1]; k++) { //遍历开始当天到月底
              var week2 = weeks[monthBegin - 1] //得到放假当月第一天是周几
              calendar[monthBegin - 1].days[week2 + k] = {
                days: calendar[monthBegin - 1].days[week2 + k].days,
                color: "rgb(255,255,255)",
                bgColor: "rgba(230,95,23,0.8)"
              };
            }
            for (var z = monthBegin + 1; z < monthEnd; z++) {
              for (var x = weeks[z - 1]; x < month[z - 1] + weeks[z - 1]; x++) {
                // console.log(month[z - 1]);
                calendar[z - 1].days[x] = {
                  days: calendar[z - 1].days[x].days,
                  color: "rgb(255,255,255)",
                  bgColor: "rgba(230,95,23,0.8)"
                };
              }
            }
            for (var l = weeks[monthEnd - 1]; l < dayEnd + weeks[monthEnd - 1]; l++) { //遍历开始当天到结束当天
              calendar[monthEnd - 1].days[l] = {
                days: calendar[monthEnd - 1].days[l].days,
                color: "rgb(255,255,255)",
                bgColor: "rgba(230,95,23,0.8)"
              };
            }
          }
        }
        self.setData({
          schoolCalendar: calendar
        });
      }
    })
    //加载考试
    db.doc("examination").get({
      success(res) {
        // console.log(res.data.examinations);
        var examinations = res.data.examinations;
        var calendar = self.data.schoolCalendar;
        //遍历考试
        for (var i = 0; i < res.data.examinations.length; i++) {
          var examination = examinations[i];
          var yearBegin = examination.examinationBegin.year; //暂时没用
          var monthBegin = examination.examinationBegin.month;
          var dayBegin = examination.examinationBegin.day;
          var yearEnd = examination.examinationEnd.year; //暂时没用
          var monthEnd = examination.examinationEnd.month;
          var dayEnd = examination.examinationEnd.day;
          if ((monthBegin - monthEnd) == 0) { //当假期开始月份和结束月份为同一个月时
            for (var j = dayBegin - 1; j < dayEnd; j++) { //遍历开始当天到结束当天
              var week1 = weeks[monthBegin - 1] //得到放假当月第一天是周几
              calendar[monthBegin - 1].days[week1 + j] = {
                days: calendar[monthBegin - 1].days[week1 + j].days,
                color: "rgb(255,255,255)",
                bgColor: "rgba(56,120,194,0.8)"
              };
            }
          } else { //当假期开始月份和结束月份为不同一个月时
            for (var k = dayBegin - 1; k < month[monthBegin - 1]; k++) { //遍历开始当天到月底
              var week2 = weeks[monthBegin - 1] //得到放假当月第一天是周几
              calendar[monthBegin - 1].days[week2 + k] = {
                days: calendar[monthBegin - 1].days[week2 + k].days,
                color: "rgb(255,255,255)",
                bgColor: "rgba(56,120,194,0.8)"
              };
            }
            for (var z = monthBegin + 1; z < monthEnd; z++) {
              for (var x = weeks[z - 1]; x < month[z - 1] + weeks[z - 1]; x++) {
                // console.log(month[z - 1]);
                calendar[z - 1].days[x] = {
                  days: calendar[z - 1].days[x].days,
                  color: "rgb(255,255,255)",
                  bgColor: "rgba(56,120,194,0.8)"
                };
              }
            }
            for (var l = weeks[monthEnd - 1]; l < dayEnd + weeks[monthEnd - 1]; l++) { //遍历开始当天到结束当天
              calendar[monthEnd - 1].days[l] = {
                days: calendar[monthEnd - 1].days[l].days,
                color: "rgb(255,255,255)",
                bgColor: "rgba(56,120,194,0.8)"
              };
            }
          }
        }
        self.setData({
          schoolCalendar: calendar
        });
      }
    })

    db.doc("information").get({
      success(res) {
        self.setData({
          hideNotice: res.data.hideNotice,
          notice: res.data.notice,
          information: {
            headInform: res.data.headInform
          }
        })
      }
    });
    db.doc("holiday").get({
      success(res) {
        // 指定日期和时间
        var EndTime = new Date(res.data.nextHoliday.year, res.data.nextHoliday.month, res.data.nextHoliday.day);
        // console.log(EndTime);
        // 当前系统时间
        var NowTime = new Date();
        // console.log(NowTime);
        var t = parseInt((EndTime.getTime() - NowTime.getTime()) / 1000 / 60 / 60 / 24);
        // console.log(t);
        self.setData({
          showStudyDay: res.data.showStudyDay,
          studyDay: t
        })
      }
    });

    wx.getStorage({
      key: 'week',
      success(res) {
        self.setData({
          week: res.data,
          wlist: self.wlistFactory(JSON.parse(wx.getStorageSync('wlist')), res.data)
        })
      }
    })

    //加载课表
    // wx.getStorage({ //获取本地课表
    //   key: "wlist",
    //   success(res) { //本地课表有数据，则显示课表
    //     // console.log('[查询]本地课表获取结果：', res.data) 
    //     self.setData({ //设置课表
    //       wlist: self.wlistFactory(JSON.parse(res.data), self.data.week)
    //     })
    //   },
    //   fail(res) {
    //     console.log(res)
    //   }
    // })
  },
  onReady() {
    var that = this;

    var configVersions = 0;
    wx.getStorage({
      key: 'configVersion',
      success(res) {
        // console.log(res.data)
        db3.doc("update").get({
          success(res) {
            // console.log("[查询]配置文件版本加载成功：", res.data.version);
            configVersions = res.data.version;
          }
        })
      }
    })

    wx.getStorage({
      key: 'times',
      success(res) {
        // console.log("[查询]左侧课表时间加载成功：", res.data)
        that.setData({
          leftClass: res.data
        })
        db3.doc("update").get({
          success(res) {
            // console.log("[查询]配置文件版本加载成功：", res.data.version);
            if (configVersions != res.data.version) {
              //获取云数据库中左侧课表中的时间
              db3.doc("schoolTime").get({
                success(res) {
                  var leftClass = [];
                  for (var i = 0; i < 10; i++) {
                    leftClass[i] = {
                      jieCi: res.data.times[i].jieCi,
                      time: res.data.times[i].time
                    }
                  }
                  db3.doc("update").get({
                    success(res) {
                      // console.log("[查询]配置文件版本加载成功：", res.data.version);
                      app.globalData.configVersion = res.data.version;
                    }
                  })
                  that.setData({
                    leftClass: leftClass
                  })
                  wx.setStorage({
                    key: 'times',
                    data: leftClass
                  })
                }
              })
            }
          }
        })
      },
      fail(res) {
        // console.log(res.data)
        //获取云数据库中左侧课表中的时间
        db3.doc("schoolTime").get({
          success(res) {
            var leftClass = [];
            for (var i = 0; i < 10; i++) {
              leftClass[i] = {
                jieCi: res.data.times[i].jieCi,
                time: res.data.times[i].time
              }
            }
            db3.doc("update").get({
              success(res) {
                // console.log("[查询]配置文件版本加载成功：", res.data.version);
                app.globalData.configVersion = res.data.version;
              }
            })
            that.setData({
              leftClass: leftClass
            })
            wx.setStorage({
              key: 'times',
              data: leftClass
            })
          }
        })
      }
    });
  },
  //onShowonShowonShowonShowonShowonShowonShowonShowonShowonShowonShowonShowonShowonShowonShow
  onShow() {
    var that = this

    // that.setData({ //设置课表
    //   wlist: app.globalData.wlist
    // })

    that.setData({ //设置课表
      wlist: this.wlistFactory(app.globalData.wlist, that.data.week)
    })

    // setTimeout(function () {
    //   that.setData({ //设置课表
    //     wlist: that.wlistFactory(that.data.wlist, that.data.week)
    //   })
    // }, 1000)

    //调用云函数获取用户openid
    wx.cloud.callFunction({
      name: "getopenid",
      success(res) {
        that.setData({
          _openid: res.result.openid
        })
        // console.log("[查询]获取openid成功：", res.result.openid)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPageScroll: function (e) {
    console.log(e)
    if (e.scrollTop >= 550) {
      this.setData({
        top: -300
      })
    } else {
      this.setData({
        top: 0
      })
    }
  },
  classClick(e) { //课表按钮被点击
    wx.vibrateShort({
      type: 'light'
    })
    wx.showModal({
      title: '详细信息',
      content: this.data.wlist[e.currentTarget.dataset.index]['courseName'] + '\r\n' +
        this.data.wlist[e.currentTarget.dataset.index]['weeks'] + '\r\n' +
        this.data.wlist[e.currentTarget.dataset.index]['teacher'] + '\r\n' +
        this.data.wlist[e.currentTarget.dataset.index]['address'],
      confirmText: '我知道了',
      showCancel: false
    })
  }
})