// pages/lifeService/todos/todos.js
const app = getApp()
var time = require('../../../utils/time.js')
Page({
  data: {
    input: '',

    todos:[
      
    ],

    leftCount:0
  },
  inputChangeHandle:function(res){
    this.setData({
      input:res.detail.value
    })
  },
  addTodoHandle:function(){
    if(!this.data.input){
      return
    }
    var todos = this.data.todos
      todos.push({
      name:this.data.input,
      creatTime:time.formatTime(new Date()),
      completed:false
    })
    
    this.setData({
      todos:todos,
      input:'',
      leftCount:this.data.leftCount + 1
    })
  },
   
  toggleTodoHandle:function(res){
     //切换点中的item的完成状态
     var item = this.data.todos[res.currentTarget.dataset.index]
     item.completed = !item.completed
     var leftCount = this.data.leftCount + (item.completed?-1:1)
     this.setData({
       todos:this.data.todos,
       leftCount:leftCount
     })
  }, 
 
  removeToDoHandle:function(res){
    var todos = this.data.todos
    var item = todos.splice(res.currentTarget.dataset.index,1)[0]
    var leftCount = this.data.leftCount - (item.completed ? 0:1 )

    this.setData({
      todos:todos,
      leftCount:leftCount
    })
  },

  ClearHandle:function(){
     var todos = []
     this.data.todos.forEach(function(item){
       if(!item.completed){
         todos.push(item)
       }
     })
     this.setData({
       todos:todos
     })
  },

  onLoad:function() {
    var input = wx.getStorageSync('input')||"";
    var todos = wx.getStorageSync('todos')||[];
    var leftCount = wx.getStorageSync('leftCount')||0;
    this.setData({
      input:input,
      todos:todos,
      leftCount:leftCount
    })
  },

  onShow:function(){
    var input = wx.getStorageSync('input')||"";
    var todos = wx.getStorageSync('todos')||[];
    var leftCount = wx.getStorageSync('leftCount')||0;
    this.setData({
      input:input,
      todos:todos,
      leftCount:leftCount
    })

  },
  
  onHide:function(){
    wx.setStorageSync(
      'input',this.data.input
     )
     wx.setStorageSync(
      'todos',this.data.todos
     )      
     wx.setStorageSync(
      'leftCount',this.data.leftCount
     )
  },
  
  onUnload: function () {
    wx.setStorageSync(
      'input',this.data.input
     )
     wx.setStorageSync(
      'todos',this.data.todos
     )      
     wx.setStorageSync(
      'leftCount',this.data.leftCount
     )
  }
})