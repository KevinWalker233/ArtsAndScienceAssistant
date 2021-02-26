// components/customSwiper/customSwiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: Array,
  },
  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange(e) {
      this.setData({
        currentIndex: e.detail.current
      });
    },
    clickgo(e) {

      wx.navigateTo({
        url: "/pages/application/textView/textView?url=" + e.currentTarget.dataset.url,
      })
      console.log(e)
    },
  }
})