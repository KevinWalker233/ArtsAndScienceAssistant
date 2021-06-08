// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await cloud.database().collection("lostObjects").add({
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
      longitude: event.longitude
    }
  })
}