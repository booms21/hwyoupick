// pages/personal/myattention/myattention.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    useropenid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      useropenid: options.useropenid

    })
    wx.request({
      url: getApp().globalData.urlPath + '/users/getMyfollow',
      data: {
        useropenid: options.useropenid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          list: res.data.list

        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  cancelattention(e) {
    var openid = e.currentTarget.dataset.openid


    var that = this;

    wx.request({
      url: getApp().globalData.urlPath + '/users/follow',
      data: {
        wx_openid: this.data.useropenid,
        release_openid: openid
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '已取消关注',
          icon: 'none',
          duration: 2000//持续的时间
        })

        var listarry = that.data.list;
        listarry.splice(e.currentTarget.dataset.idx, 1);
        that.setData({
          list: listarry
        })

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