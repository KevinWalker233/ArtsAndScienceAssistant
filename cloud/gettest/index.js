// 云函数入口文件
const cloud = require('wx-server-sdk')
// var iconv = require('iconv-lite')
const request = require('request')
var fs = require('fs')

let url = 'http://ems.bjwlxy.cn/Default2.aspx'
let url1 = 'http://ems.bjwlxy.cn/CheckCode.aspx'


cloud.init()

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    let buffers = [];
    stream.on('error', reject);
    stream.on('data', (data) => buffers.push(data))
    stream.on('end', () => resolve(Buffer.concat(buffers)))
  });
}

// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    //请求__VIEWSTATE
    request(url, function (error, response, body) {
      var arr = body.split('"')
      var __VIEWSTATE = arr[119]
      //请求验证码和cooike
      let stream1 = fs.createWriteStream("/tmp/code.jpg");

      request(url1, function (error, response, body) {
        streamToBuffer(fs.createReadStream("/tmp/code.jpg")).then(function (res) {
          var cookie = (response.headers["set-cookie"])[0];
          var base64 = 'data:image/jpg;base64,' + res.toString('base64')
          var inform = [];
          inform.push(__VIEWSTATE)
          inform.push(cookie)
          inform.push(base64)
          // resolve(body.toString())
          // resolve('data:image/jpg;base64,' + res.toString('base64'))
          resolve(inform)
        })
      }).pipe(stream1)
    })
  })
}