// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {

    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {

          wx.getUserInfo({
            lang: 'zh_CN',
            success: res => {
              //从数据库获取用户信息
              //  this.queryUsreInfo();
              //用户已经授权过
              getApp().globalData.userInfo = res.userInfo;
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              wx.switchTab({
                url: '../index/index'
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      
      wx.getUserInfo({
        lang: 'zh_CN',
        success: res => {
          //从数据库获取用户信息
          this.addUserInfo();
          //用户已经授权过
          getApp().globalData.userInfo = res.userInfo;
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }

          wx.switchTab({
            url: '../index/index'
          })
        }
      });




    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function() {
    wx.request({
      url: getApp().globalData.urlPath + '/users',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        getApp().globalData.userInfo = res.data;
      }
    })
  },
  addUserInfo: function() {
    wx.login({
      success: function(logindata) {
        //res.code 

        wx.getUserInfo({
          lang: 'zh_CN',
          success: res => {
            res.userInfo.code = logindata.code;
            console.log(res)
            wx.request({
              url: getApp().globalData.urlPath + '/users/add',
              data: 
                res.userInfo
              ,
              method:"POST",
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res.data);
                wx.setStorageSync('useropenid', res.data.openid);
        
              }
            })

            getApp().globalData.userInfo = res.userInfo;
          }
        })


      },
      fail: function() {

      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})