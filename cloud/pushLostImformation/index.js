// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = (event, context) => {
  return new Promise((resolve, reject) => {
    var wxContext = cloud.getWXContext()
    var openid = wxContext.OPENID
    cloud.database().collection('authorityList').where({
      _id: "banUsers"
    }).get().then((res) => {
      var a = (res.data[0].banUsers).indexOf(openid)
      if (a > -1) {
        resolve(-1)
      } else {
        cloud.database().collection("lostObjects").add({
          data: {
            openid: wxContext.OPENID,
            type: event.type,
            headImg: event.headImg,
            title: event.title,
            context: event.context,
            address: event.address,
            cardID: event.cardID,
            user: event.user,
            contactType: event.contactType,
            contact: event.contact,
            loseType: event.loseType,
            latitude: event.latitude,
            longitude: event.longitude,
            time:event.Date
          }
        })
        resolve(1)
      }
    })
  })
}