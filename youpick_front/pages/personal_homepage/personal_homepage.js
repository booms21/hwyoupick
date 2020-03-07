// pages/personal_homepage/personal_homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    useropenid: '',
    currentTab: 2,
    userinfo: {},
    fansnum: '',
    floedsnum: '',
    likesnum:'',
    goodslist:{},
    CommentList:{},
    IsediticonHidden:true
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("+++" + options.useropenid)
    if (options.useropenid == wx.getStorageSync('useropenid')) {
      this.setData({
        IsediticonHidden: false
      })

    }
    this.setData({
      useropenid: options.useropenid
    })
  },

  toEditUserInfo() {
    var id = this.data.useropenid;
    wx.navigateTo({
      url: `personal_info_edit/personal_info_edit?useropenid=${id}`,
    })
  },
  getPublishList(){
    var that = this;
    wx.request({
      url: getApp().globalData.urlPath + '/users/getActivity',
      data: {
        openid: this.data.useropenid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        var likesnum = res.data.likesnum;
        if (likesnum==null){
          likesnum=0
        }
        that.setData({
          goodslist: res.data.goodslist,
          CommentList: res.data.CommentList,
          loadingHidden: true,
          likesnum: likesnum
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
  goDetail(e) {

    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../goods_detail/goods_detail?goodsid=${id}`,
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
    var that = this;
 

    wx.request({
      url: getApp().globalData.urlPath + '/users/getUserInfo',
      data: {
        openid: this.data.useropenid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          userinfo: res.data.userinfo,
          fansnum: res.data.fansnum,
          floedsnum: res.data.floedsnum
        })
        console.log(res.data.userinfo)
        getApp().globalData.userInfo.usertel = res.data.userinfo.user_tel;

        getApp().globalData.userInfo.usermotto = res.data.userinfo.wx_motto;

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    this.getPublishList();
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