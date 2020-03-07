//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    loadingHidden: false,
    imgUrls: [
      '../images/lunbo.jpg',
      '../images/hootroom5.jpg',
      '../images/guid.jpg'
    ],
    hotList:[],
    indicatorDots: true,
    autoplay: true,
    interval: 7000,
    duration: 1000,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },



  onLoad: function () {
 
var that=this;




    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {

    var that = this;

    wx.request({
      url: getApp().globalData.urlPath + '/goodsInfo/getHotList',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          loadingHidden: true,
          hotList: res.data.hotList

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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goDetail(e) {
    console.log("id:" + e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../goods_detail/goods_detail?goodsid=${id}`,
    })
  },
  // 显示搜索input
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  // 隐藏搜索input
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  // 搜索input状态改变时
  inputTyping: function (e) {
    var _this = this;
    this.setData({
      inputVal: e.detail.value
    });
    if (e.detail.value) {
      var url = http.generateUrl('api/v1/search/' + e.detail.value);
      wx.request({
        url: url,
        method: 'GET',
        success: function (res) {
          if (res.data.status == 1) {
            _this.setData({
              hellspawnList: res.data.body.hellspawn_list
            })
          }
        }
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title:'享购物,不用等 快来好物优评'
    };
  }
})
