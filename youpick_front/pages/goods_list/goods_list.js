// pages/goods_list/goods_list.js
var detail = '../detail/detail'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
   // maxtime: '',
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  tohomePage(e) {
    var id = e.currentTarget.dataset.id
 
    wx.navigateTo({
      url: `../personal_homepage/personal_homepage?useropenid=${id}`,
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
    wx.hideTabBarRedDot({
      index: 1,
    })
    this.requestData()
  },
  /**
   * 上拉刷新
   */
  bindscrolltoupper: function () {
    //加载最新
    this.requestData();
    console.log("刷新")
  },

  /**
   * 加载更多
   */
  /*
  bindscrolltolower: function () {
    console.log('到底部')
    //加载更多
    this.requestData('list');
  },*/
  /**
    * 查看大图
    */
  lookBigPicture: function (e) {


    let urls = []
    urls.push(e.currentTarget.dataset.url)
    wx.previewImage({
      // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: urls

    })
    // //获取图片高度 对应wxml中data-height="{{item.height}}"
    // var height = e.currentTarget.dataset.height;
    // //获取图片高度 对应wxml中data-width="{{item.width}}"
    // var width = e.currentTarget.dataset.width;
    // // 传参方式向GET请求
    // wx.navigateTo({
    //   url: detail + '?' + 'url=' + url + "&height=" + height + "&width=" + width,
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   },
    // })
  },





  requestData() {
    var that = this
    wx.request({
      url: getApp().globalData.urlPath + '/goodsInfo/getList',
      data: {
        limit: 10
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          list: res.data.list,
          loadingHidden: true,
         
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


  onShareAppMessage: function () {

  },




  goDetail(e) {
    console.log("id:" + e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../goods_detail/goods_detail?goodsid=${id}`,
    })
  }
})