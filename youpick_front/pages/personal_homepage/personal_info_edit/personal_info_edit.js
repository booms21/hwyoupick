// pages/personal_homepage/personal_info_edit/personal_info_edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useropenid:'',
    usernickname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      useropenid: options.useropenid,
      usernickname: getApp().globalData.userInfo.nickName
    })

  },

  toEditUserMotto() {
    var id = this.data.useropenid;
    wx.navigateTo({
      url: `personal_info_edit/motto_edit/motto_edit?useropenid=${id}`,
    })
  },
  toEditUserTel() {
    var id = this.data.useropenid;
    wx.navigateTo({
      url: `personal_info_edit/phonenum_edit/phonenum_edit?useropenid=${id}`,
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