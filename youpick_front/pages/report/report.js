// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    content:'',
    title:'',
    sort:'',
    array: ['垃圾广告', '色情淫谇', '人身攻击', '泄露隐私', '禁卖品'],
    goodsid:'',
    useropenid:''
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.useropenid)
    this.setData({
      useropenid: options.useropenid,
      goodsid: options.goodsid
    })
   
  },




  contentInput(e) {
    this.setData({
      content: e.detail.value

    })
  },
  titleInput(e) {
    this.setData({
      title: e.detail.value

    })
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      sort: this.data.array[e.detail.value]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  submit(){

    wx.request({
      url: getApp().globalData.urlPath + '/admin/addReportInfo',
      data: {
        content: this.data.content,
        title: this.data.title,
        openid: this.data.useropenid,
        nikename: getApp().globalData.userInfo.nickName,
        goodsinfoid: this.data.goodsid,
        sort: this.data.sort
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("提交举报成功");
        wx.showToast({
          title: '提交成功',
          icon: 'succes',
          duration: 2000,
          mask: true
        })
 
      }
    })
  }
  ,
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