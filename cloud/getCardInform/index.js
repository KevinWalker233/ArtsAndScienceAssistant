const cloud = require('wx-server-sdk')
var request = require('request')
const jsdom = require("jsdom");

let url = 'http://yktcx.bjwlxy.cn/Default.aspx'
let url2 = 'http://yktcx.bjwlxy.cn/CheckCode.aspx'

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();

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

            db.collection("account").doc(openid).update({
              data: {
                cardAccount: event.account //卡务系统账号
              }
            })
            db.collection("accountX").doc(openid).update({
              data: {
                cardAccount: event.account, //卡务系统账号
                cardPassword: event.password //卡务系统密码
              }
            })
            var arr = []
            for (var i = 0; i < dom.window.document.getElementsByTagName('em').length; i++) {
              arr.push(dom.window.document.getElementsByTagName('em')[i].innerHTML.replace('<cite>', '：').replace('</cite>', ''))
            }
            var inform = []
            var success = {
              type: 'success',
              text: '登陆成功！'
            }
            inform.push(success)
            inform.push(arr)
            resolve(inform)
          })
        })
      })
    })
  })
}