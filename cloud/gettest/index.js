// 云函数入口文件
const cloud = require('wx-server-sdk')
// var iconv = require('iconv-lite')
const request = require('request')
var fs = require('fs')

let url = 'http://ems.bjwlxy.cn/'

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
    if (event.web === 1) url = 'http://218.195.117.143/'
    else if (event.web === 2) url = 'http://218.195.117.144/'
    else if (event.web === 3) url = 'http://218.195.117.145/'
    else if (event.web === 4) url = 'http://218.195.117.146/'
    else if (event.web === 5) url = 'http://218.195.117.147/'
    else url = 'http://ems.bjwlxy.cn/'
    //请求__VIEWSTATE
    request(url + 'Default2.aspx', function (error, response, body) {
      var arr = body.split('"')
      var __VIEWSTATE = arr[119]
      //请求验证码和cooike
      let stream1 = fs.createWriteStream("/tmp/code.jpg");

      request(url + 'CheckCode.aspx', function (error, response, body) {
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