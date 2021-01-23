// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()


var sendMsg = async (item) => {
  if (item.tip) {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: item._openid,
      data: {
        thing6: {
          value: '英语'
        },
        time2: {
          value: '5:30'
        },
        thing10: {
          value: '家里'
        },
        name8: {
          value: '测试'
        },
        thing9: {
          value: '下次提醒请再次点击'
        }
      },
      templateId: 'rv7wyzh3M0k5j6adlCrIwe74XRc-8snnMD9STeDmhmw'
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