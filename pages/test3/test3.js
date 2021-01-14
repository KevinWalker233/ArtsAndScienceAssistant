// pages/test3/test3.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude:0,
    latitude:0,
    markers:[],
    circles:[]
  },
  //获取位置
  getMap(){
    var self = this;
    console.log(this.data.latitude);
    console.log(this.data.longitude);
    wx.getLocation({
      type: "gcj02",
      success(res) {
        self.setData({
          radius:230
        })
        var latitude = res.latitude
        var longitude = res.longitude
        var latitude1 = 34.349491644965276
        var longitude1 = 107.16128445095487

        var radLat1 = latitude * Math.PI / 180.0;
        var radLat2 = latitude1 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = (longitude * Math.PI / 180.0) - (longitude1 * Math.PI / 180.0);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;

        console.log(s*1000);
        console.log(latitude)
        console.log(longitude)
        var isin = ""
        console.log(self.data.radius)
        self.setData({
          latitude:latitude,
          longitude:longitude,
          long:s*1000,
          radius:230,
          isin:isin,
          markers: [{
            id: "1",
            latitude: latitude1,
            longitude: longitude1,
            title: "测试地点"
          }],
          circles: [{
            latitude: latitude1,
            longitude: longitude1,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 230,
            strokeWidth: 1
          }]
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    console.log(this.data.latitude);
    console.log(this.data.longitude);
    wx.getLocation({
      type: "gcj02",
      success(res) {
        self.setData({
          radius:230
        })
        var latitude = res.latitude
        var longitude = res.longitude
        var latitude1 = 34.349491644965276
        var longitude1 = 107.16128445095487

        var radLat1 = latitude * Math.PI / 180.0;
        var radLat2 = latitude1 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = (longitude * Math.PI / 180.0) - (longitude1 * Math.PI / 180.0);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;

        console.log(s*1000);
        console.log(latitude)
        console.log(longitude)
        var isin = ""
        console.log(self.data.radius)
        self.setData({
          latitude:latitude,
          longitude:longitude,
          long:s*1000,
          radius:230,
          isin:isin,
          markers: [{
            id: "1",
            latitude: latitude1,
            longitude: longitude1,
            title: "测试地点"
          }],
          circles: [{
            latitude: latitude1,
            longitude: longitude1,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 230,
            strokeWidth: 1
          }]
        })
      }
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