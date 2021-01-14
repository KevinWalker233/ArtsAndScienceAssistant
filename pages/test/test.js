Page({
  data: {
    num:0
  },
  onInput(e){
    this.setData({num:e.detail.value})
  },
  handleClick(e){
    console.log(e);
  }
})