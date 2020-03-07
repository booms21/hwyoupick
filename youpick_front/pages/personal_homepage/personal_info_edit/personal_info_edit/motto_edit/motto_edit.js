// pages/personal_homepage/personal_info_edit/personal_info_edit/motto_edit/motto_edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: "",
    useropenid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({
      useropenid: options.useropenid,
      motto: getApp().globalData.userInfo.usermotto
    })
  },
  mottoInput(e) {
    this.setData({
      motto: e.detail.value
    })
  },


  save_motto() {
var that=this;
    wx.request({
      url: getApp().globalData.urlPath + '/users/setUserMotto',
      data: {
        useropenid: this.data.useropenid,
        motto: this.data.motto
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        wx.showToast({
          title: '保存成功',
          icon: 'succes',
          duration: 2000,
          mask: true
        })
        getApp().globalData.userInfo.usermotto = that.data.motto;
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
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