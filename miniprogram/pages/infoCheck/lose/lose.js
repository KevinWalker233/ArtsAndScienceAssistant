Page({
  /**
   * 页面的初始数据
   */
  data: {
    inform: [],
    // inform: [{
    //   type: 0, //0为拾取，1丢失
    //   headImg: 'https://thirdwx.qlogo.cn/mmopen/vi_32/ibEf0iaYdUvGxLmufqZCBlmDfh7QKcFTlhsKYVCIicYTUHkyFMLmAJbIhLPia6kAmhaJ1UdiaXRItT4MY13KNVlyCZQ/132',
    //   title: '老区二号食堂捡到饭卡一张', //帖子标题
    //   context: '今天下午18点32分在老去二号食堂捡到饭卡202096094022一张', //帖子内容
    //   addres: '老区二号食堂',
    //   contact: '13060368396', //联系信息
    //   contactType: 1, //联系方式
    //   loseType: 0, //丢失物品类型
    //   cardID: 202096094022, //卡号
    //   latitude: 34.349491644965276,
    //   longitude: 107.16128445095487
    // }, {
    //   type: 0,
    //   headImg: 'https://thirdwx.qlogo.cn/mmopen/vi_32/ibEf0iaYdUvGxLmufqZCBlmDfh7QKcFTlhsKYVCIicYTUHkyFMLmAJbIhLPia6kAmhaJ1UdiaXRItT4MY13KNVlyCZQ/132',
    //   title: '老区二号食堂捡到饭卡两张',
    //   context: '今天下午18点32分在老去二号食堂捡到饭卡202096094022一张',
    //   addres: '老区二号食堂',
    //   contact: '13060368396',
    //   contactType: 0,
    //   loseType: 1,
    //   latitude: 34.349491644965276,
    //   longitude: 107.16128445095487
    // }, {
    //   type: 1,
    //   headImg: 'https://thirdwx.qlogo.cn/mmopen/vi_32/ibEf0iaYdUvGxLmufqZCBlmDfh7QKcFTlhsKYVCIicYTUHkyFMLmAJbIhLPia6kAmhaJ1UdiaXRItT4MY13KNVlyCZQ/132',
    //   title: '老区二号食堂丢失饭卡一张',
    //   context: '今天下午18点32分在老去二号食堂捡到饭卡202096094022一张',
    //   addres: '老区二号食堂',
    //   contact: '1192085905',
    //   contactType: 1,
    //   loseType: 2,
    //   latitude: 34.349491644965276,
    //   longitude: 107.16128445095487
    // }, {
    //   type: 1,
    //   headImg: 'https://thirdwx.qlogo.cn/mmopen/vi_32/ibEf0iaYdUvGxLmufqZCBlmDfh7QKcFTlhsKYVCIicYTUHkyFMLmAJbIhLPia6kAmhaJ1UdiaXRItT4MY13KNVlyCZQ/132',
    //   title: '老区二号食堂丢失饭卡一张',
    //   context: '今天下午18点32分在老去二号食堂捡到饭卡202096094022一张',
    //   addres: '老区二号食堂',
    //   contact: '1192085905',
    //   contactType: 1,
    //   loseType: 3,
    //   latitude: 34.349491644965276,
    //   longitude: 107.16128445095487
    // }],
    navbar: ['拾取', '丢失'],
    currentTab: 0
  },
  //切换bar
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })
  },
  clickInfo(res) {
    var index = res.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/infoCheck/lose/loseInform/loseInform?inform=' + JSON.stringify(this.data.inform[index])
    })
  },
  add(res) {
    wx.navigateTo({
      url: '/pages/infoCheck/lose/loseAdd/loseAdd'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getInform()
  },
  async getInform() {
    var that = this
    const c = wx.cloud.database().collection("lostObjects"); //获取集合中记录的总数
    const total = await (await c.count()).total
    const batchTimes = Math.ceil(total / 20)
    let arraypro = [] // 定义空数组 用来存储每一次获取到的记录 

    let x = 0 //这是一个标识每次循环就+1 当x等于batchTimes 说明已经到了最后一次获取数据的时候
    //没错，循环查询，看着就觉得很影响性能，但是么的办法。
    for (let i = 0; i < batchTimes; i++) {
      //分组获取
      wx.cloud.database().collection("lostObjects").skip(i * 20).get({
        success: function (res) {
          x += 1
          // 20个20个的获取 最后一次不够20 那就是剩下的
          for (let j = 0; j < res.data.length; j++) {
            arraypro.push(res.data[j])
          }
          //判断是否是最后一次，如果是说明已经不用再继续获取了，这时候就可以赋值了
          if (x == batchTimes) {
            console.log(arraypro)
            that.setData({
              inform: arraypro
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})