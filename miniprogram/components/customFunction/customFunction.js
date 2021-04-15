// components/customFunction/customFunction.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    jumpCheckGrades(){
      wx.navigateTo({
        url: '../../pages/checkGrades/checkGrades'
      })
    },
    jumpCheckCourse(){
      wx.navigateTo({
        url: '../../pages/checkMoney/checkMoney'
      })
    },
    jumpCheckScores(){
      wx.navigateTo({
        url: '../../pages/checkScores/checkScores'
      })
    }
  }
})
