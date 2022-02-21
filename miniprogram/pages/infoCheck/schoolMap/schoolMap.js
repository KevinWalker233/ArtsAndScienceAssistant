// pages/infoCheck/schoolMap/schoolMap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapId: "mapp",
    // 中心点纬度、经度
    latitude: "34.34818",
    longitude: "107.187452",
    // 显示地球卫星图图标
    showSatellite: true,
    // 显示实例地图图标
    showInstance: false,
    setting: {
      scale: 13, // 缩放级别，取值范围为 3-20，默认为 16
      includePoints: [], // 缩放视野以包含所有给定的坐标点
      showScale: true, // 是否显示比例尺，工具暂不支持，默认为 false
      enableZoom: true, // 是否支持缩放，默认为 true
      enableScroll: true, // 是否支持拖动，默认为 true
      enableRotate: true, // 是否支持旋转，默认为 false
      showCompass: true, // 显示指南针，默认为 false
      enable3D: true, // 是否展示3D楼块(工具暂不支持），默认为 false
      enableOverlooking: false, // 是否开启俯视，默认为 false
      enableSatellite: false, // 是否开启卫星图，默认为 false
      enableTraffic: false, // 是否开启实时路况，默认为 false
    },
    showDialog: false,
    showMapNav: true,
    showModelStatus:false,
    markers: [
      // 1老校区大门
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 1,
      locationName:"老校区大门",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/0.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/gate.png",
      locationContent:"这是老校区大门口哦！！！",
      latitude: 34.34833203295634,
      longitude: 107.16035653565214,
      width: 25,
      height: 26
    },
      // 2教学楼
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 2,
      locationName:"教学楼",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/1.jpg",
      locationIcon:"../../../assets/mapIcon/oldSchool/school.png",
      locationContent:"老校区教学楼是计算机学院......",
      latitude: 34.34885908050591,
      longitude: 107.16062475655363,
      width: 25,
      height: 26
    }, 
      // 3操场
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 3,
      locationName:"老校区操场",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/2.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/playground.png",
      locationContent:"老校区操场",
      latitude: 34.34878378820223,
      longitude: 107.16327477906034,
      width: 25,
      height: 26
    }, 
      // 4学术报告厅
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 4,
      locationName:"学术报告厅",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/3.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/AcademicReportingHall.png",
      locationContent:"学术报告厅",
      latitude: 34.34978472743541,
      longitude: 107.16236282799528,
      width: 25,
      height: 26
    },
      //  5综合楼
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 5,
      locationName:"综合楼",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/4.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
      locationContent:"综合楼",
      latitude: 34.349634144421024,
      longitude: 107.1628348967819,
      width: 25,
      height: 26
    }, 
      // 6图书馆
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 6,
      locationName:"老校区图书馆",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/5.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/library.png",
      locationContent:"石鼓校区图书馆",
      latitude: 34.349536708208355,
      longitude: 107.16098953697966,
      width: 25,
      height: 26
    }, 
      // 7,1号餐厅
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 7,
      locationName:"学生1号餐厅",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/6.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/restaurant_1.png",
      locationContent:"学生1号餐厅",
      latitude: 34.349953025779634,
      longitude: 107.16183711502836,
      width: 25,
      height: 26
    }, 
      // 8,8号楼，计算机学院公寓
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 8,
      locationName:"8号楼公寓",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/7.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/apartment_8.png",
      locationContent:"8号楼大学公寓，是计算机学院学生公寓，位于宝鸡文理石鼓校区正北部，周边接近1号、2号餐厅，菜鸟驿站......",
      latitude: 34.350626215773445,
      longitude: 107.16151524994658,
      width: 25,
      height: 26
    }, 
      // 9家属楼
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 9,
      locationName:"家属楼",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/8.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/apartment_8.png",
      locationContent:"家属楼",
      latitude: 34.3494038404611,
      longitude: 107.15889741394804,
      width: 25,
      height: 26
    }, 
      // 10相家庄市场
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 10,
      locationName:"相家庄市场",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/9.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/apartment_8.png",
      locationContent:"相家庄市场,石鼓校区同学的欢快之地！",
      latitude: 34.3475968182261,
      longitude: 107.16134358856962,
      width: 25,
      height: 26
    }, 
      // 11学生2号餐厅
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 11,
      locationName:"学生2号餐厅",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/10.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/restaurant_1.png",
      locationContent:"学生2号餐厅",
      latitude: 34.350232045969676,
      longitude: 107.1604745528488,
      width: 25,
      height: 26
    },
      // 12新校区大门
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 12,
      locationName:"新校区南门",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/11.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/gate.png",
      locationContent:"新校区南门，是新校区最显眼的地方！！",
      latitude: 34.34719377609236,
      longitude: 107.20988620732115,
      width: 25,
      height: 26
    },
      // 13新校区图书馆
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 13,
      locationName:"新校区图书馆",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/12.jpg",
      locationIcon:"../../../assets/mapIcon/oldSchool/library.png",
      locationContent:"新校区图书馆",
      latitude: 34.34896537540995,
      longitude: 107.20990766499327,
      width: 25,
      height: 26
    },
      // 14新校区立心楼
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 14,
      locationName:"立心楼",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/13.jpg",
      locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
      locationContent:"新校区立心楼",
      latitude: 34.34803529043601,
      longitude: 107.208598746994,
      width: 25,
      height: 26
    },
      // 15新校区思贤楼
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 15,
      locationName:"思贤楼",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/14.jpg",
      locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
      locationContent:"新校区思贤楼",
      latitude: 34.348190305314695,
      longitude: 107.21147407505796,
      width: 25,
      height: 26
    },
      // 16新校区音乐学院
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 16,
      locationName:"音乐厅",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/15.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
      locationContent:"新校区音乐厅",
      latitude: 34.35099823950773,
      longitude: 107.20881332371519,
      width: 25,
      height: 26
    },
      // 17新校区明理楼
    {
        iconPath: "../../../assets/mapIcon/marker.png",
        id: 17,
        locationName:"明理楼",
        locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/16.png",
        locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
        locationContent:"新校区明理楼",
        latitude: 34.35035162577346,
        longitude: 107.20809985611723,
        width: 25,
        height: 26
    },
      // 18新校区尚能楼
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 18,
      locationName:"尚能楼",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/17.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
      locationContent:"新校区尚能楼",
      latitude: 34.34972272270062,
      longitude: 107.20796038124845,
      width: 25,
      height: 26
    },
      // 19新校区体育学院
    {
        iconPath: "../../../assets/mapIcon/marker.png",
        id: 19,
        locationName:"体育学院",
        locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/18.png",
        locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
        locationContent:"新校区体育学院",
        latitude: 34.35091409142591,
        longitude: 107.21165646527098,
        width: 25,
        height: 26
    },
      // 20新校区大学生超市
    {
        iconPath: "../../../assets/mapIcon/marker.png",
        id: 20,
        locationName:"大学生超市",
        locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/19.png",
        locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
        locationContent:"大学生超市",
        latitude: 34.34966071791539,
        longitude: 107.2140919110565,
        width: 25,
        height: 26
    },
      // 21新校区篮球场
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 21,
      locationName:"灯光篮球场",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/20.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
      locationContent:"灯光篮球场",
      latitude: 34.34966957574166,
      longitude: 107.21271325562284,
      width: 25,
      height: 26
    },
      // 22新校区1号公寓
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 22,
      locationName:"2号公寓",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/21.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
      locationContent:"新校区2号公寓",
      latitude: 34.349930881281246,
      longitude: 107.21372713063047,
      width: 25,
      height: 26
    },
      // 23新校区博文楼
    {
        iconPath: "../../../assets/mapIcon/marker.png",
        id: 23,
        locationName:"新校区博文楼",
        locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/22.png",
        locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
        locationContent:"新校区博文楼,新校区最高的楼",
        latitude: 34.351401263352976,
        longitude: 107.21088935349272,
        width: 25,
        height: 26
    },
      // 24新校区3号公寓
    {
        iconPath: "../../../assets/mapIcon/marker.png",
        id: 24,
        locationName:"3号公寓",
        locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/23.png",
        locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
        locationContent:"新校区3号公寓",
        latitude: 34.35030290809734,
        longitude: 107.21378077481077,
        width: 25,
        height: 26
     },
      // 25新校区游泳馆
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 25,
      locationName:"新校区游泳馆",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/24.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
      locationContent:"新校区游泳馆",
      latitude: 34.351582844889485,
      longitude: 107.2085451028137,
      width: 25,
      height: 26
    },
      // 26新校区校医院
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 26,
      locationName:"新校区校医院",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/25.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
      locationContent:"新校区校医院",
      latitude: 34.34951899252089,
      longitude: 107.21680630657957,
      width: 25,
      height: 26
    },
      // 27新校区创新创业中心
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 27,
      locationName:"创新创业中心",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/26.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
      locationContent:"创新创业中心",
      latitude: 34.34986001884095,
      longitude: 107.21778263066099,
      width: 25,
      height: 26
    },
      // 28新校区餐厅
    {
        iconPath: "../../../assets/mapIcon/marker.png",
        id: 28,
        locationName:"新校区餐厅",
        locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/27.png",
        locationIcon:"../../../assets/mapIcon/oldSchool/restaurant_1.png",
        locationContent:"新校区餐厅",
        latitude: 34.349598713083246,
        longitude: 107.21477319214628,
        width: 25,
        height: 26
    },
      // 29新校区体育场
    {
        iconPath: "../../../assets/mapIcon/marker.png",
        id: 29,
        locationName:"新校区体育场",
        locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/28.png",
        locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
        locationContent:"新校区体育场",
        latitude: 34.35099823950254,
        longitude: 107.21226264450834,
        width: 25,
        height: 26
    },
      // 30新校区广场
    {
        iconPath: "../../../assets/mapIcon/marker.png",
        id: 30,
        locationName:"润德园",
        locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/29.png",
        locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
        locationContent:"润德园",
        latitude: 34.35024976150674,
        longitude: 107.21058894608305,
        width: 25,
        height: 26
    },
      // 31新校区四为园
    {
      iconPath: "../../../assets/mapIcon/marker.png",
      id: 31,
      locationName:"四为园",
      locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/30.png",
      locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
      locationContent:"四为园",
      latitude: 34.350023888136555,
      longitude: 107.20909763787077,
      width: 25,
      height: 26
  },
    // 32新校区体育馆
  {
    iconPath: "../../../assets/mapIcon/marker.png",
    id: 32,
    locationName:"体育馆",
    locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/31.png",
    locationIcon:"../../../assets/mapIcon/oldSchool/ComplexBuilding.png",
    locationContent:"室内体育馆",
    latitude: 34.34848261830973,
    longitude: 107.20766533825682,
    width: 25,
    height: 26
  },
    // 33新校区报告厅
  {
    iconPath: "../../../assets/mapIcon/marker.png",
    id: 33,
    locationName:"报告厅",
    locationImg:"cloud://wlzs-2gtlu9u2a909b08e.776c-wlzs-2gtlu9u2a909b08e-1304646404/mapImg/school/32.png",
    locationIcon:"../../../assets/mapIcon/oldSchool/AcademicReportingHall.png",
    locationContent:"新校区报告厅",
    latitude: 34.351410120998,
    longitude: 107.21033681843565,
    width: 25,
    height: 26
  }]
  },
  // 点击 卫星图 切换 卫星地图
  changeSatellite:function(){
    var thisBlock = this;
    thisBlock.setData({
      setting: {
        enableSatellite: true, // 开启卫星图，默认为 false
      },
      // 关闭地球卫星图图标
      showSatellite:false,
      // 打开实例图图标
      showInstance:true
    })
  },
  // 点击 实例图 切换 实例地图
  changeInstance:function(){
    var thisBlock = this;
    thisBlock.setData({
      setting: {
        enableSatellite: false, // 关闭卫星图，默认为 false
      },
      // 打开地球卫星图图标
      showSatellite:true,
      // 关闭实例图图标
      showInstance:false
    })
  },
  // 点击，我的位置。定位
  // 方式一：回到当前位置
  clickcontrol() {
    let mpCtx = wx.createMapContext("mapp");
    mpCtx.moveToLocation();
    },
  // 方式二：回到当前
  locationClick: function () {
    var thisBlock = this;
    wx.getLocation({
      type: "gcj02", // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标

      success: function (res) {
        thisBlock.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          // markers: [{
          //   iconPath: "../../../assets/mapIcon/marker.png",
          //   id: 0,
          //   latitude: res.latitude,
          //   longitude: res.longitude,
          //   width: 25,
          //   height: 26,
          //   locationName:"当前位置",
          //   locationContent:"",
          //   callout: {
          //     padding: 10,
          //     content:"当前位置",
          //     bgColor:"#DC143C",
          //     color:"#FFFF00",
          //     display:"ALWAYS"
          //   },
          // }],
        });
      }
    })
  },
  //点击标记，显示对话框
  showModal: function(event) {
    // 拿到markers的id
    var id = event.detail.markerId;
    // 拿到对应markers的信息
    var locationLatitude = this.data.markers[id - 1].latitude
    var locationLongitude = this.data.markers[id - 1].longitude
    var name = this.data.markers[id - 1].locationName
    var image = this.data.markers[id - 1].locationImg
    var content = this.data.markers[id - 1].locationContent
    var icon = this.data.markers[id - 1].locationIcon
    this.setData({
      // 打开对话框
      showDialog: true,
      // 关闭导航栏
      showMapNav: false,
      latitude:locationLatitude,
      longitude:locationLongitude,
      // 缩放
      setting: {
        scale: 18, // 缩放级别，取值范围为 3-20，默认为 16
      },
      locationName: name,
      locationImg: image,
      locationIcon: icon,
      locationContent: content
    })
  },
  // 点击遮罩层，关闭对话框
  toggleDialog: function () {
    this.setData({
      // 关闭对话框
      showDialog: false,
      // 打开导航栏
      showMapNav: true
    })
  },
  // 点击切换按钮，跳转
  jumpSchool:function(){
    var thisBlock = this;
    thisBlock.setData({
      latitude: "34.348",
      longitude: "107.1610",
      setting: {
        scale: 16, // 缩放级别，取值范围为 3-20，默认为 16
      }
    })
  },
  // 点击列表按钮，展示
  powerDrawer:function(e){
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  // 列表弹出层 动画实现
  util: function(currentStatu){
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
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