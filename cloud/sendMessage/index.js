// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()


var sendMsg = async (item) => {
  if (item.clockTip) {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: item._openid,
      data: {
        phrase1: {
          value: '每日打卡'
        },
        thing3: {
          value: '下次提醒请多次订阅'
        }
      },
      templateId: 'fh162iT9nuIpjP3IcQpJhitaY0Nl9hqlY809ul8FYE0'
    })
  }
}


const MAX_LIMIT = 100
exports.main = async (event, context) => {
  // 先取出集合记录总数
  const countResult = await db.collection('account').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('account').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  var arr = (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
  for (var i = 0; i < arr.data.length; i++) {
    sendMsg(arr.data[i])
  }
}