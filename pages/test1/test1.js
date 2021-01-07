// pages/test1/test1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num1:0,
    num2:0,
    result:''
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

  compare:function(e) {
    var str = '两数相等';
    if(this.data.num1 > this.data.num2){
      console.log("1111111111");
      str = '第一个数大';
    }else{
      console.log("222222222");
      str = '第二个数大';
    }
    this.setData({result:str});
  },

  input1:function(e) {
    this.setData({num1:e.detail.value});
    console.log('数字1：'+this.data.num1);
  },

  input2:function(e) {
    this.setData({num2:Number(e.detail.value)});
    console.log('数字2：'+this.data.num2);
  }
})