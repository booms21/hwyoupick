// pages/personal/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useremail:'',
    feedbackcontent:'',
    useropenid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.setData({
  useropenid: options.useropenid

})
  },


  submit(){

    wx.request({
      url: getApp().globalData.urlPath + '/admin/addFeedbackInfo',
      data:{
      content:this.data.feedbackcontent,
      email:this.data.useremail,
        openid: this.data.useropenid,
        nikename: getApp().globalData.userInfo.nickName

      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {      
        console.log("提交意见反馈成功");
        wx.showToast({
          title: '提交成功',
          icon: 'succes',
          duration: 2000,
          mask: true
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })



  },
  emailInput(e) {
    this.setData({
     useremail: e.detail.value

    })
  },
  contentInput(e) {
    this.setData({
    feedbackcontent: e.detail.value

    })
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