const cloud = require('wx-server-sdk')
var request = require('request')
const jsdom = require("jsdom");

let url = 'http://yktcx.bjwlxy.cn/Default.aspx'
let url2 = 'http://yktcx.bjwlxy.cn/CheckCode.aspx'

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: url2,
      headers: {
        "Host": "yktcx.bjwlxy.cn",
        "Connection": "keep-alive",
        "User-Agent": "LogStatistic",
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        "Referer": "http://yktcx.bjwlxy.cn/Default.aspx",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9"
      },
      method: 'GET',
    };
    request(options, function (error, response, body) { //请求验证码及cookie
      cookie = response.headers["set-cookie"][0]; //获取验证码所对应的cookie
      request(url, function (e, r, b) {
        request.post({
          url: 'http://yktcx.bjwlxy.cn/Handler/UserLogin.ashx',
          headers: {
            "Cookie": cookie
          },
          encoding: null,
          form: {
            "action": "Login",
            "managetype": "Front",
            "acounttype": "StudentNo",
            "username": event.account, //账号
            "userpassword": event.password, //密码
            "checkcode": cookie.substring(28, 32) //由于cookie里面带了验证码，所以我们并不需要用户输入验证码
          }
        }, function (error, response, body) {
          // console.log(body.toString()) //{"resultCode":"00","resultMessage":"验证成功"}提示验证成功即登陆成功
          var cookies = response.headers["set-cookie"]; //第二次获取cookie
          request.get({ //请卡务数据
            url: 'http://yktcx.bjwlxy.cn/User/User_Account.aspx ',
            encoding: null,
            headers: {
              "Referer": "http://yktcx.bjwlxy.cn/User/User_Main.aspx",
              "Cookie": cookies
            }
          }, function (e, r, b) {
            const dom = new jsdom.JSDOM(b.toString())
            const openid = cloud.getWXContext().OPENID

            if (event.type === '挂失') {
              request.get({
                url: 'http://yktcx.bjwlxy.cn/User/User_LostCard.aspx',
                headers: {
                  "Cookie": cookies
                },
                encoding: null
              }, function (e1, r1, b1) {
                const dom1 = new jsdom.JSDOM(b1.toString())
                console.log(b1.toString())
                var __VIEWSTATE = dom1.window.document.getElementsByName('__VIEWSTATE')[0].getAttribute('value')
                var __VIEWSTATEGENERATOR = dom1.window.document.getElementsByName('__VIEWSTATEGENERATOR')[0].getAttribute('value')
                var cardID = dom1.window.document.getElementsByTagName('option')[0].getAttribute('value')
                console.log(__VIEWSTATE)
                console.log(__VIEWSTATEGENERATOR)
                request.post({
                  url: 'http://yktcx.bjwlxy.cn/User/User_LostCard.aspx',
                  headers: {
                    "Origin": "http://yktcx.bjwlxy.cn",
                    "Referer": "http://yktcx.bjwlxy.cn/User/User_LostCard.aspx",
                    "Cookie": cookies
                  },
                  encoding: null,
                  form: {
                    '__VIEWSTATE': __VIEWSTATE,
                    '__VIEWSTATEGENERATOR': __VIEWSTATEGENERATOR,
                    'ddlAccountNo': cardID,
                    'txtInqPassword': event.password,
                    'btnSubmit': '挂失',
                  }
                }, function (e2, r2, b2) {
                  const dom2 = new jsdom.JSDOM(b2.toString())
                  var log = dom2.window.document.getElementsByClassName('font_14 font_green font_normal')[0].innerHTML
                  if (log.indexOf('操作成功!' != -1)) {
                    var success = {
                      type: 'success',
                      text: '操作成功！请点击右上角更新页面数据！'
                    }
                    var inform = []
                    inform.push(success)
                    resolve(inform)
                  }
                })
              })
            } else if (event.type === '解挂') {
              request.get({
                url: 'http://yktcx.bjwlxy.cn/User/User_UnLostCard.aspx',
                headers: {
                  "Cookie": cookies
                },
                encoding: null
              }, function (e1, r1, b1) {
                const dom1 = new jsdom.JSDOM(b1.toString())
                console.log(b1.toString())
                var __VIEWSTATE = dom1.window.document.getElementsByName('__VIEWSTATE')[0].getAttribute('value')
                var __VIEWSTATEGENERATOR = dom1.window.document.getElementsByName('__VIEWSTATEGENERATOR')[0].getAttribute('value')
                var cardID = dom1.window.document.getElementsByTagName('option')[0].getAttribute('value')
                console.log(__VIEWSTATE)
                console.log(__VIEWSTATEGENERATOR)
                request.post({
                  url: 'http://yktcx.bjwlxy.cn/User/User_UnLostCard.aspx',
                  headers: {
                    "Origin": "http://yktcx.bjwlxy.cn",
                    "Referer": "http://yktcx.bjwlxy.cn/User/User_UnLostCard.aspx",
                    "Cookie": cookies
                  },
                  encoding: null,
                  form: {
                    '__VIEWSTATE': __VIEWSTATE,
                    '__VIEWSTATEGENERATOR': __VIEWSTATEGENERATOR,
                    'ddlAccountNo': cardID,
                    'txtInqPassword': event.password,
                    'btnSubmit': '解挂',
                  }
                }, function (e2, r2, b2) {
                  const dom2 = new jsdom.JSDOM(b2.toString())
                  var log = dom2.window.document.getElementsByClassName('font_14 font_green font_normal')[0].innerHTML
                  if (log.indexOf('操作成功' != -1)) {
                    var success = {
                      type: 'success',
                      text: '操作成功！请点击右上角更新页面数据！'
                    }
                    var inform = []
                    inform.push(success)
                    resolve(inform)
                  }
                })
              })
            }
          })
        })
      })
    })
  })
}