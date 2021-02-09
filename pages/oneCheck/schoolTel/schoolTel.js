// pages/oneCheck/schoolTel/schoolTel.js
Page({
  //点击导航标题事件
  _handlerTap:function(evt){
    //console.log(evt.currentTarget.id)
    let idx = parseInt(evt.currentTarget.id)
    this.setData({
      currentTarget:evt.currentTarget.id,
      currentIdx:idx
    })
 },
  //内容滑动事件
 _handleChange:function(evt){
     this.setData({
       currentTarget:evt.detail.current
     })
 },
 //拨打电话
 call:function(e){
   wx.makePhoneCall({
    phoneNumber: e.currentTarget.id, //仅为示例，并非真实的电话号码
    success() {
      console.log('接口调用成功的回调函数')
    },
    fail() {
      console.log('接口调用失败的回调函数')
    },
    complete() {
      console.log('接口调用结束的回调函数（调用成功、失败都会执行）')
    }
  })
 },

  /**
   * 页面的初始数据
   */
  data: {
    currentTarget:0,
    //教学系统
    arr1:[
      {
        "position":"	哲学系党总支",
        "new":"",
        "old":"3368941"
      },
      {
        "position":"	书记",
        "new":"",
        "old":"	3362706"
      },
      {
        "position":"	哲学系",
        "new":"",
        "old":"	3364252"
      },
      {
        "position":"	主任",
        "new":"",
        "old":"	3368306"
      },
      {
        "position":"	副主任",
        "new":"",
        "old":"		3303236"
      },
      {
        "position":"	教干中心",
        "new":"",
        "old":"	3368857"
      },
      {
        "position":"	政法学院党总支",
        "new":"3566084",
        "old":""
      },
      {
        "position":"	书记",
        "new":"3566355",
        "old":""
      },
      {
        "position":"	副书记",
        "new":"	3565880",
        "old":""
      },
      {
        "position":"政法学院",
        "new":"	3566083",
        "old":""
      },
      {
        "position":"院长",
        "new":"	3566356",
        "old":""
      },
      {
        "position":"	副院长",
        "new":"	3566358",
        "old":""
      },
      {
        "position":"	教育学院党总支",
        "new":"",
        "old":"	3368945"
      },
      {
        "position":"	书记",
        "new":"",
        "old":"	3362708"
      },
      {
        "position":"	副书记",
        "new":"",
        "old":"	3565156"
      },
      {
        "position":"	教育学院",
        "new":"",
        "old":"	3364254"
      },
      {
        "position":"	院长",
        "new":"",
        "old":"3362709"
      },
      {
        "position":"	副院长",
        "new":"",
        "old":"	3957026"
      },
      {
        "position":"	文学与新闻传播学院党总支",
        "new":"	3566092",
        "old":""
      },
      {
        "position":"	书记",
        "new":"	3566136",
        "old":""
      },
      {
        "position":"副书记",
        "new":"	3565156",
        "old":""
      },
      {
        "position":"	文学与新闻传播学院",
        "new":"3566091",
        "old":""
      },
      {
        "position":"	院长",
        "new":"3566359",
        "old":""
      },
      {
        "position":"关陇方言与民俗研究中心",
        "new":"	3569936",
        "old":""
      },
      {
        "position":"	外国语言文学系党总支",
        "new":"	3566363",
        "old":""
      },
      {
        "position":"书记",
        "new":"	3566360",
        "old":""
      },
      {
        "position":"	副书记",
        "new":"3566518",
        "old":""
      },
      {
        "position":"	外国语言文学系",
        "new":"	外国语言文学系",
        "old":""
      },

      {
        "position":"	主任",
        "new":"3566365",
        "old":""
      },
      {
        "position":"	副主任",
        "new":"3566362",
        "old":""
      },
      {
        "position":"	实验楼",
        "new":"	3566596",
        "old":""
      },
      {
        "position":"	历史文化与旅游系党总支",
        "new":"	3566380",
        "old":""
      },
      {
        "position":"	书记",
        "new":"3566381",
        "old":""
      },
      {
        "position":"历史文化与旅游系",
        "new":"3566382",
        "old":""
      },
      {
        "position":"	主任",
        "new":"	3566383",
        "old":""
      },
      {
        "position":"	副主任",
        "new":"	3566385",
        "old":""
      },
      {
        "position":"	经济管理学院党总支",
        "new":"3566090",
        "old":""
      },
      {
        "position":"书 记",
        "new":"3566386",
        "old":""
      },
      {
        "position":"	副书记",
        "new":"3569556",
        "old":""
      },
      {
        "position":"	经济管理学院",
        "new":"	3566087",
        "old":""
      },

      {
        "position":"	院 长",
        "new":"3569296",
        "old":""
      },
      {
        "position":"副院长",
        "new":"	3566387",
        "old":""
      },
      {
        "position":"音乐系党总支",
        "new":"	3566186",
        "old":""
      },
      {
        "position":"书 记",
        "new":"	3566189",
        "old":""
      },
      {
        "position":"副书 记",
        "new":"",
        "old":""
      },
      {
        "position":"音 乐 系",
        "new":"	3566073",
        "old":""
      },
      {
        "position":"	主 任",
        "new":"	3566129",
        "old":""
      },
      {
        "position":"	副主任",
        "new":"	3566395",
        "old":""
      },
      {
        "position":"	美术学院党总支",
        "new":"	3566205",
        "old":""
      },
      {
        "position":"	书 记",
        "new":"	3566389",
        "old":""
      },
      {
        "position":"	副书记",
        "new":"	3566209",
        "old":""
      },
      {
        "position":"	美术学院",
        "new":"	3566074",
        "old":""
      },
      {
        "position":"	院 长",
        "new":"	3566390",
        "old":""
      },
      {
        "position":"	副院长",
        "new":"	3565275",
        "old":""
      },
      {
        "position":"	数学与信息科学学院党总支",
        "new":"	3566082",
        "old":""
      },
      {
        "position":"	书 记",
        "new":"3566391",
        "old":""
      },
      {
        "position":"	副书记",
        "new":"	3566586",
        "old":""
      },
      {
        "position":"	数学与信息科学学院",
        "new":"	3566079",
        "old":""
      },
      {
        "position":"	院 长",
        "new":"	3566392",
        "old":""
      },
      {
        "position":"	副院长",
        "new":"3566586",
        "old":""
      },
      {
        "position":"	物理与光电技术学院党总支	",
        "new":"	",
        "old":"	3368951"
      },
      {
        "position":"书 记	",
        "new":"	",
        "old":"3362711"
      },
      {
        "position":"		副书记",
        "new":"	",
        "old":"	3877031"
      },
      {
        "position":"	物理与光电技术学院	",
        "new":"	",
        "old":"	3364258"
      },
      {
        "position":"	院 长	",
        "new":"	3362712	",
        "old":""
      },
      {
        "position":"		副院长",
        "new":"	",
        "old":"	3362713"
      },

      {
        "position":"		化学化工学院党总支",
        "new":"	3565152	",
        "old":""
      },
      {
        "position":"	书 记	",
        "new":"	3566509	",
        "old":""
      },
      {
        "position":"	副书记	",
        "new":"	3566509	",
        "old":""
      },
      {
        "position":"	化学化工学院	",
        "new":"	3566589	",
        "old":""
      },
      {
        "position":"	院 长	",
        "new":"		3566508",
        "old":""
      },
      {
        "position":"	副院长	",
        "new":"	3566588",
        "old":""
      },

      {
        "position":"	地理与环境学院党总支	",
        "new":"	3566335	",
        "old":""
      },
      {
        "position":"	书 记	",
        "new":"	3566339	",
        "old":""
      },
      {
        "position":"	副书记	",
        "new":"	3566331	",
        "old":""
      },
      {
        "position":"	地理与环境学院	",
        "new":"		3566337",
        "old":""
      },
      {
        "position":"	院 长	",
        "new":"		3566338",
        "old":""
      },
      {
        "position":"	副院长	",
        "new":"	3566336	",
        "old":""
      },
      {
        "position":"	机械工程学院党总支	",
        "new":"	",
        "old":"	3368955"
      },
      {
        "position":"		书 记",
        "new":"	",
        "old":"	书 记"
      },
      {
        "position":"	副书记	",
        "new":"	",
        "old":"	3368807"
      },
      {
        "position":"		机械工程学院",
        "new":"	",
        "old":"	3364295"
      },
      {
        "position":"		院 长",
        "new":"	",
        "old":"	3362719"
      },
      {
        "position":"		副院长",
        "new":"	",
        "old":"	3362707"
      },
      {
        "position":"		电子电气工程学院党总支",
        "new":"	",
        "old":"	3362724"
      },
      {
        "position":"	书 记	",
        "new":"	",
        "old":"3362721"
      },
      {
        "position":"	副书记	",
        "new":"	",
        "old":"	3362723"
      },
      {
        "position":"	电子电气工程学院	",
        "new":"	",
        "old":"	3364262"
      },
      {
        "position":"	院 长	",
        "new":"	",
        "old":"	3362722	"
      },
      {
        "position":"		副院长",
        "new":"	",
        "old":"	3362723	"
      },
      {
        "position":"	计算机学院党总支	",
        "new":"	",
        "old":"	3368940	"
      },

      {
        "position":"	书 记	",
        "new":"	",
        "old":"		3362726"
      },
      {
        "position":"	副书记	",
        "new":"	",
        "old":"	3231839	"
      },
      {
        "position":"		计算机学院",
        "new":"	",
        "old":"	3364310	"
      },
      {
        "position":"	院 长	",
        "new":"	",
        "old":"	3362728	"
      },
      {
        "position":"	副院长	",
        "new":"	",
        "old":"	3231839	"
      },

      {
        "position":"	体育系党总支	",
        "new":"		3566029",
        "old":"	"
      },
      {
        "position":"	书 记	",
        "new":"	3566078	",
        "old":"	"
      },
      {
        "position":"	体 育 系	",
        "new":"	3566076	",
        "old":"	"
      },
      {
        "position":"	主 任	",
        "new":"	3566309	",
        "old":"	"
      },
      {
        "position":"	副主任	",
        "new":"	3566308	",
        "old":"	"
      },
      {
        "position":"器材室	",
        "new":"	",
        "old":"	3361149"
      },
      {
        "position":"	体育科学研究所	",
        "new":"	3566077	",
        "old":"	"
      },
      {
        "position":"思贤楼",
        "new":"	3566063",
        "old":"	"
      },
      {
        "position":"	立心楼",
        "new":"	3566612	",
        "old":"	"
      },{
        "position":"	实验楼",
        "new":"	3566064",
        "old":"		"
      },
      {
        "position":"	艺术楼",
        "new":"	3566065",
        "old":"		"
      },
      {
        "position":"	综合楼",
        "new":"		3361001",
        "old":"		"
      },
      {
        "position":"",
        "new":"",
        "old":"		"
      },
      {
        "position":"",
        "new":"",
        "old":"		"
      },
    ],
    /**********************************************************************/
    arr2:[
      {
        "position":"报警中心",
         "new":"	3566110",
         "old":" 3368959 "
      },
      {
        "position":"新校区正门",
         "new":"3566011",
         "old":""
      },
      {
        "position":"新区东门",
         "new":"3566012",
         "old":""
      },
      {
        "position":"	后勤集团",
         "new":"	3566027",
         "old":"3364320"
      },
      {
        "position":"	总经理",
         "new":"	3566039",
         "old":""
      },
      {
        "position":"	副总经理",
         "new":"",
         "old":"	3368988"
      },
      {
        "position":"	物业管理中心",
         "new":"",
         "old":"	3364297"
      },

      {
        "position":"	配电室（物业保修）",
         "new":"",
         "old":"	3364297"
      },
      {
        "position":"	学生社区管理中心",
         "new":"",
         "old":"	3368969"
      },
      {
        "position":"	1#学生公寓",
         "new":"",
         "old":"3368901"
      },
      {
        "position":"	2#学生公寓",
         "new":"",
         "old":"	3368902"
      },

      {
        "position":"	3#学生公寓",
         "new":"",
         "old":"	3368903"
      },
      {
        "position":"4#学生公寓",
         "new":"",
         "old":"	3368904"
      },
      {
        "position":"	5#学生公寓",
         "new":"",
         "old":"3368905"
      },
      {
        "position":"	6#学生公寓",
         "new":"",
         "old":"	3368856"
      },

      {
        "position":"7#学生公寓",
         "new":"",
         "old":"	3368937"
      },
      {
        "position":"	8#学生公寓",
         "new":"",
         "old":"	3361036"
      },
      {
        "position":"汽车队",
         "new":"	3566305",
         "old":"3364278"
      },
      {
        "position":"	幼儿园",
         "new":"",
         "old":"	3364332"
      },

      {
        "position":"	医 院",
         "new":"3566098",
         "old":"	3368978"
      },
      {
        "position":"	急 诊",
         "new":"	3566093",
         "old":"3368979"
      },
      {
        "position":"	后勤公司",
         "new":"	3566027",
         "old":""
      },
      {
        "position":"	公寓管理服务中心",
         "new":"	3566610",
         "old":""
      },

      {
        "position":"	饮食服务中心",
         "new":"	3566060",
         "old":""
      },
      {
        "position":"	2#学生公寓",
         "new":"	3566051",
         "old":""
      },
      {
        "position":"	3#学生公寓",
         "new":"	3566052",
         "old":""
      },
      {
        "position":"	4#学生公寓",
         "new":"	3566053",
         "old":""
      },

       {
        "position":"	5#学生公寓",
         "new":"3566054",
         "old":""
      },
      {
        "position":"	6#学生公寓",
         "new":"	3566055",
         "old":""
      },
      {
        "position":"	7#学生公寓",
         "new":"	3566607",
         "old":""
      },
      {
        "position":"	8#学生公寓",
         "new":"	3566608",
         "old":""
      },
      {
        "position":"	9#学生公寓",
         "new":"	3566609",
         "old":""
      },

      {
        "position":"	10#学生公寓",
         "new":"	3565981",
         "old":""
      },
      {
        "position":"	11#学生公寓",
         "new":"	3565982",
         "old":""
      },
      {
        "position":"	12#学生公寓",
         "new":"	3565039",
         "old":""
      },
       {
        "position":"	13#学生公寓",
         "new":"	3569580",
         "old":""
      },
      {
        "position":"	14#学生公寓",
         "new":"	3569956",
         "old":""
      },
      {
        "position":"	15#学生公寓",
         "new":"	3369786",
         "old":""
      },
      {
        "position":"	物业管理服务中心",
         "new":"	3565110",
         "old":""
      },
      {
        "position":"	大学生超市",
         "new":"	3566071",
         "old":""
      },
      {
        "position":"",
         "new":"",
         "old":""
      },
      {
        "position":"",
         "new":"",
         "old":""
      },
    ]
/*******************************************************************/

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

  }
})