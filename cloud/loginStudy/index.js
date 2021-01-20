// 云函数入口文件
const cloud = require('wx-server-sdk')
var iconv = require('iconv-lite')
const request = require('request')
// var fs = require('fs')

let url = 'http://ems.bjwlxy.cn/Default2.aspx'
// let url1 = 'http://ems.bjwlxy.cn/CheckCode.aspx'


cloud.init()

// let promise = new Promise((resolve, reject) => {
//   request('http://www.baidu.com/', function (error, response, body) {
//     console.log(body)
//     resolve("hello word")
//   })
// })

// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    request.post({
      url: url,
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
      request.get({
        url: 'http://ems.bjwlxy.cn/xs_main.aspx?xh='+event.account,
        encoding: null,
        headers: {
          "Cookie": event.cookie
        }
      }, function (e, r, b) {
        // var buf2 = iconv.decode(b, 'gb2312');
        // console.log(buf2.toString())
        request.get({
          url: 'http://ems.bjwlxy.cn/xskbcx.aspx?xh='+event.account+'&xm=%D0%EC%D5%DC&gnmkdm=N121602',
          encoding: null,
          headers: {
            'Referer': 'http://ems.bjwlxy.cn/xskbcx.aspx?xh='+event.account+'&xm=%D0%EC%D5%DC&gnmkdm=N121602',
            "Cookie": event.cookie
          }
        }, function (e1, r1, b1) {
          var buf3 = iconv.decode(b1, 'gb2312');
          // console.log(buf3.toString())
          resolve(buf3.toString())
        })
      })
      // }
    })
  })

}