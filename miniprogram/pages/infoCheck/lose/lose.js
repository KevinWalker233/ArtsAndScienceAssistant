Page({
  /**
   * 页面的初始数据
   */
  data: {
    inform: [],
    navbar: ['拾取', '丢失'],
    currentTab: 0,
    //搜索相关
    inputShowed: false,
    inputVal: ""
    //
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
    //搜索相关
    this.setData({
      search: this.search.bind(this)
    })
    //
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
            var list = arraypro.reverse()
            that.setData({
              inform: list,
              inform2: list
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

  },
  /***
   * 搜索功能
   */
  inputKeywords: function (e) {
    console.log(e.detail.value)
    this.setData({
      keywords: e.detail.value
    })
  },
  search: function (value) {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
    //   }, 200)
    // })
    var searchInform = []
    var inform = this.data.inform2
    var keywords = this.data.keywords
    if ((keywords == '' || keywords == null) && (this.data.inform2 != null && this.data.inform2 != '')) {
      this.setData({
        inform: this.data.inform2
      })
      return;
    }
    for (var index = 0; index < inform.length; index++) {
      if (((inform[index].address).indexOf(keywords) != -1) || ((inform[index].title).indexOf(keywords) != -1) || (((inform[index].context).indexOf(keywords) != -1) || ((inform[index].cardID).indexOf(keywords) != -1))) {
        searchInform.push(inform[index])
      }
    }
    this.setData({
      inform: searchInform
    })
  },

})