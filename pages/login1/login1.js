// pages/login1/login1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    college:0,
    major:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.college)
    this.setData({
      college:options.college
    })
    
   if(this.data.college == "计算机学院"){
     this.setData({
     major:["计算机科学与技术","软件工程","物联网工程","计算机科学与技术(专升本)"]
     })
   }
   if(this.data.college =="政法学院"){
    this.setData({
    major:["思想政治教育","法学","哲学","公共管理类"]
    })
  }
  if(this.data.college =="教育学院"){
    this.setData({
    major:["教育学","教育技术学","应用心理学","学前教育","学前教育(专升本)","应用心理学(第二学士学位)"]
    })
  }
  if(this.data.college =="文学与新闻传播学院"){
    this.setData({
    major:["汉语言文学","广播电视编导","播音与主持艺术","新闻传播学类","汉语言文学(第二学士学位)"]
    })
  }
  if(this.data.college =="外国语学院"){
    this.setData({
    major:["英语","翻译"]
    })
  }
  if(this.data.college =="历史文化与旅游学院"){
    this.setData({
    major:["历史学","旅游管理","旅游管理(专升本)","文化产业管理"]
    })
  }
  if(this.data.college =="经济管理学院"){
    this.setData({
    major:["经济学","工商管理类","市场营销(专升本)"]
    })
  }
  if(this.data.college =="美术学院"){
    this.setData({
    major:["美术学","设计学类"]
    })
  }
  if(this.data.college =="音乐学院"){
    this.setData({
    major:["音乐学","舞蹈学"]
    })
  }
  if(this.data.college =="数学与信息科学学院"){
    this.setData({
    major:["数学与应用数学","信息与计算科学","统计学"]
    })
  }
  if(this.data.college =="政法学院"){
    this.setData({
    major:["思想政治教育","法学","哲学","公共管理类"]
    })
  }
  if(this.data.college =="物理与光电技术学院"){
    this.setData({
    major:["物理学","电子科学与技术","材料物理"]
    })
  }
  if(this.data.college =="化学化工学院"){
    this.setData({
    major:["化学","应用化学","化学工程与工艺","制药工程","材料化学",""]
    })
  }
  if(this.data.college =="地理与环境学院"){
    this.setData({
    major:["地理科学","环境工程","自然地理与资源环境","人文地理与城乡规划","给排水科学与工程","测绘工程","地理科学(实验班)"]
    })
  }
  if(this.data.college =="机械工程学院"){
    this.setData({
    major:["机械设计制造及其自动化","材料成型及控制工程","工业设计","机械电子工程"]
    })
  }
  if(this.data.college =="电子电气工程学院"){
    this.setData({
    major:["电气工程及其自动化","电气工程及其自动化(专升本)","自动化类","电子信息类"]
    })
  }
  if(this.data.college =="体育学院"){
    this.setData({
    major:["体育教育"]
    })
  }
   console.log(this.data)
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