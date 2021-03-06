const cloud = require('wx-server-sdk')
var iconv = require('iconv-lite')
const request = require('request')
const jsdom = require("jsdom");

let url = 'http://ems.bjwlxy.cn/' //学院登陆网址

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();

exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    if (event.web === 1) url = 'http://218.195.117.143/'
    else if (event.web === 2) url = 'http://218.195.117.144/'
    else if (event.web === 3) url = 'http://218.195.117.145/'
    else if (event.web === 4) url = 'http://218.195.117.146/'
    else if (event.web === 5) url = 'http://218.195.117.147/'
    else url = 'http://ems.bjwlxy.cn/'
    var inform = []
    request.post({
      url: url + 'Default2.aspx',
      headers: {
        "Cookie": event.cookie
      },
      encoding: null,
      form: {
        "__VIEWSTATE": event.__VIEWSTATE,
        "txtUserName": event.account,
        "TextBox1": '',
        "TextBox2": event.password,
        "txtSecretCode": event.code,
        'RadioButtonList1': '%D1%A7%C9%FA',
        'Button1': '',
        'lbLanguage': '',
        'hidPdrs': '',
        'hidsc': ''
      }
    }, function (error, response, body) {
      var buf = iconv.decode(body, 'gb2312');
      if (buf.toString().indexOf('验证码不正确') != -1) {
        var error = {
          type: 'error',
          text: '验证码不正确!!'
        }
        inform.push(error)
        resolve(inform)
      } else if (buf.toString().indexOf('用户名不能为空') != -1) {
        var error = {
          type: 'error',
          text: '用户名不能为空!!'
        }
        inform.push(error)
        resolve(inform)
      } else if (buf.toString().indexOf('密码不能为空') != -1) {
        var error = {
          type: 'error',
          text: '密码不能为空!!'
        }
        inform.push(error)
        resolve(inform)
      } else if (buf.toString().indexOf('验证码不能为空') != -1) {
        var error = {
          type: 'error',
          text: '验证码不能为空!!'
        }
        inform.push(error)
        resolve(inform)
      } else if (buf.toString().indexOf('密码错误') != -1) {
        var error = {
          type: 'error',
          text: '密码错误!!'
        }
        inform.push(error)
        resolve(inform)
      }
      request.get({
        url: url + 'xs_main.aspx?xh=' + event.account,
        encoding: null,
        headers: {
          "Cookie": event.cookie
        }
      }, function (e, r, b) {
        var buf2 = iconv.decode(b, 'gb2312');
        const dom2 = new jsdom.JSDOM(buf2.toString())
        var name = dom2.window.document.getElementById('xhxm').innerHTML
        name = dom2.window.document.getElementById('xhxm').innerHTML.substring(0, name.length - 2)
        request.get({
          url: url + 'tjkbcx.aspx?xh=' + event.account + '&xm=' + encodeURI(name) + '&gnmkdm=N121601',
          encoding: null,
          headers: {
            'Referer': url + 'tjkbcx.aspx?xh=' + event.account + '&xm=' + encodeURI(name) + '&gnmkdm=N121601',
            "Cookie": event.cookie
          }
        }, function (e1, r1, b1) {
          var buf3 = iconv.decode(b1, 'gb2312');
          // console.log(buf3.toString())
          const dom1 = new jsdom.JSDOM(buf3.toString()) //解析'班级课表查询'页面
          var selected = [] //这是需要模拟点击储存的数据
          var user = [] //这是需要发给客户端的用户的，学院，专业，年级，班级信息,姓名
          //这里是获取班级课表的__VIEWSTATE和部分信息
          selected.push((dom1.window.document.getElementsByName("__VIEWSTATE"))[0].getAttribute("value"))
          var option = dom1.window.document.getElementsByTagName("option")
          for (var i = 0; i < option.length; i++) {
            if (option[i].getAttribute('selected')) {
              selected.push(option[i].getAttribute("value"))
              user.push(option[i].innerHTML)
            }
          }
          user.push(name)
          //下面是模拟点击学期为2，其他参数也可以通过修改设置
          request.post({
            url: url + 'tjkbcx.aspx?xh=' + event.account + '&xm=' + encodeURI(name) + '&gnmkdm=N121601',
            headers: {
              "Referer": url + 'tjkbcx.aspx?xh=' + event.account + '&xm=' + encodeURI(name) + '&gnmkdm=N121601',
              "Cookie": event.cookie
            },
            encoding: null,
            form: {
              "__EVENTTARGET": "xq",
              "__EVENTARGUMENT": "",
              "__VIEWSTATE": selected[0],
              "xn": selected[1], //这是学年
              "xq": '2', //这是学期
              'nj': selected[3], //这是年级
              'xy': selected[4], //这是学院
              'zy': selected[5], //这是专业
              'kb': selected[6], //这是班级课表
            }
          }, function (error, response, b4) {
            var buf4 = iconv.decode(b4, 'gb2312');
            console.log(buf4.toString())
            //这个是取课表信息的
            const dom = new jsdom.JSDOM(buf4.toString()) //解析第二学期页面的数据
            var tb = dom.window.document.getElementById("Table6")
            var rows = tb.rows;
            var wlist = [];
            for (var i = 1; i < rows.length; i++) { //--循环所有的行
              var cells = rows[i].cells;
              for (var j = 0; j < cells.length; j++) { //--循环所有的列
                if (i % 2 == 0) {
                  var zhouCi = -1;
                  var keCi = -1;
                  var text = "";
                  if ((i - 1) == 3 || (i - 1) == 7) {
                    zhouCi = j;
                    keCi = i - 1;
                    text = cells[j].innerHTML;
                    // console.log("第"+(j)+"周");
                    // console.log("第"+(i-1)+"节课");
                    // console.log(cells[j].innerHTML);
                  } else if ((i - 1) == 1 || (i - 1) == 5 || (i - 1) == 9) {
                    zhouCi = j - 1;
                    keCi = i - 1;
                    text = cells[j].innerHTML;
                    // console.log("第"+(j-1)+"周");
                    // console.log("第"+(i-1)+"节课");
                    // console.log(cells[j].innerHTML);
                  }
                  //下面是有课的输出内容
                  if (text.indexOf("<br>") != -1) {
                    var arr1 = text.split("<br>");
                    if (arr1[5] != '') {
                      var ke = {
                        "weekTime": zhouCi, //周几上课
                        "weeks": arr1[1], //第几周到第几周
                        "teacher": arr1[2], //课任老师
                        "address": arr1[3], //上课教室
                        "courseName": arr1[0], //课程名称
                        "jieCi": keCi //课程是第几节
                      };
                      var ke1 = {
                        "weekTime": zhouCi, //周几上课
                        "weeks": arr1[6], //第几周到第几周
                        "teacher": arr1[7], //课任老师
                        "address": arr1[8], //上课教室
                        "courseName": arr1[5], //课程名称
                        "jieCi": keCi //课程是第几节
                      };
                      wlist.push(ke);
                      wlist.push(ke1);
                    } else {
                      var ke = {
                        "weekTime": zhouCi, //周几上课
                        "weeks": arr1[1], //第几周到第几周
                        "teacher": arr1[2], //课任老师
                        "address": arr1[3], //上课教室
                        "courseName": arr1[0], //课程名称
                        "jieCi": keCi //课程是第几节
                      };
                      wlist.push(ke);
                    }
                  }
                }
              }
            }
            var success = {
              type: 'success',
              text: '登陆成功！'
            }
            inform.push(success)
            inform.push(wlist)
            inform.push(user)
            const openid = cloud.getWXContext().OPENID
            db.collection("account").add({ //添加用户信息
              data: {
                _id: openid, //openid也存到id上，防止一个用户多次储存
                _openid: openid, //以防万一
                account: event.account, //账号
                password: event.password, //密码
                classes: user[5], //班级
                grade: user[2], //年级
                major: user[4], //专业
                college: user[3], //学院
                name: user[6], //姓名
                tip: false,
                clockTip: false
              }
            })
            resolve(inform)
            console.log(context)
          })
        })
      })
    })
  })
}