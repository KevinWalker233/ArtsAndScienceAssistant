// pages/application/application.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图图片链接
    carouselImgUrls:[
      "cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/swiperimg/4.jpeg",
      "cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/swiperimg/2.jpeg",
      "cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/swiperimg/1.jpeg",
      "cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/swiperimg/5.jpeg",
      "cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/swiperimg/3.jpg"
    ],
    functionList:[
      {
        Icon:"../../assets/tabBarimages/学习1.png",
        Text:"学习"
      },
      {
        Icon:"../../assets/tabBarimages/应用1.png",
        Text:"应用"
      },
      {
        Icon:"../../assets/tabBarimages/我1.png", 
        Text:"我的"
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * infoCheck - 信息查询跳转
   * 跳转至 地图 功能
   */
  jumpSchoolMap:function(){
    wx.navigateTo({
      url: '../infoCheck/schoolMap/schoolMap',
    })
  },
  // 跳转至 考试安排 功能
  jumpExam:function(){
    wx.navigateTo({
      url: '../infoCheck/exam/exam',
    })
  },
  // 跳转至 校车 功能
  jumpCommutingBus:function(){
    wx.navigateTo({
      url: '../infoCheck/commutingBus/commutingBus',
    })
  },
  // 跳转至 放假安排 功能
  jumpHoliday:function(){
    wx.navigateTo({
      url: '../infoCheck/holiday/holiday',
    })
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