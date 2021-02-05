const app = getApp()
const configDB = wx.cloud.database().collection("config");

Page({
  data: {
    showModal: false, //false关闭模态框 true开启模态框
    showModal1: false, //false关闭模态框 true开启模态框
    showModal2: false, //false关闭模态框 true开启模态框
    navbar: ['新区', '老区'],
    currentTab: 0, //当前选择的新区老区社团
    one: {}, //第二名
    two: {}, //第一名
    three: {}, //第三名
    courseitems: [],
    courseitems1: []
  },
  submit: function () {
    this.setData({
      showModal: true
    })
  },
  submit1: function () {
    this.setData({
      showModal1: true
    })
  },
  submit2: function () {
    this.setData({
      showModal2: true
    })
  },

  preventTouchMove: function () {

  },
  go: function () {
    this.setData({
      showModal: false
    })
  },
  go1: function () {
    this.setData({
      showModal1: false
    })
  },
  go2: function () {
    this.setData({
      showModal2: false
    })
  },
  //切换bar
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
  },
  onShow() {
    var that = this
    configDB.doc('SheTuanJianJie').get().then(res => {
      console.log(res.data)
      that.setData({
        one: res.data.one,
        two: res.data.two,
        three: res.data.three,
        courseitems: res.data.jianJie,
        courseitems1: res.data.jianJie2,
      })
    })
  },
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })
  },
})