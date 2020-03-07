// pages/personal/personal.js

//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: false,
    userInfo: {},
    useropenid:'',
    //avatarUrl:null,
gender:'',
    device: [
      { iconurl: '../images/wx_app_like.png', title: '我的关注', tap: 'goMyfollow' },
      { iconurl: '../images/wx_app_view.png', title: '我的粉丝', tap: 'goMyfans' },
      { iconurl: '../images/wx_app_collect.png', title: '我的收藏', tap: 'goMycollection' }
    ],
    api: [
      { iconurl: '../images/wx_app_cellphone.png', title: '系统信息', tap: 'showSystemInfo' },
      { iconurl: '../images/wx_app_network.png', title: '网络状态', tap: 'showNetWork' },
      { iconurl: '../images/wx_app_location.png', title: '地图显示', tap: 'showMap' },
      { iconurl: '../images/wx_app_compass.png', title: '指南针', tap: 'showCompass' },
      { iconurl: '../images/wx_app_lonlat.png', title: '当前位置、速度', tap: 'showLonLat' },
      { iconurl: '../images/wx_app_scan.png', title: '二维码', tap: 'scanQRCode' },

      { iconurl: '../images/wx_app_setting.png', title: '设置', tap: 'setting' },
      { iconurl: '', title: '收货地址', tap: 'chooseAddress' }
    ],
    others: [
      { iconurl: '../images/visit.png', title: '关于好物优评', tap: 'showProject' },
      { iconurl: '../images/wx_app_message.png', title: '意见反馈', tap: 'toFeedback' }
    ],
    compassVal: 0,
    compassHidden: true,
    shakeInfo: {
      gravityModalHidden: true,
      num: 0,
      enabled: false
    },
    shakeData: {
      x: 0,
      y: 0,
      z: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this;

    var CuserInfo = wx.getStorageSync('CuserInfo');
    if (CuserInfo.accesstoken) {
      that.setData({ islogin: true });
    }
 
    //调用应用实例的方法获取全局数据
 
      //更新数据
      that.setData({
        userInfo: app.globalData.userInfo,
        useropenid: wx.getStorageSync('useropenid'),
        gender: app.globalData.userInfo.gender
      })



  },
  goMyfollow() {
    wx.navigateTo({
      url: 'myattention/myattention?useropenid='+this.data.useropenid,
    })

  },
  goMyfans() {
    wx.navigateTo({
      url: 'myfans/myfans?useropenid=' + this.data.useropenid,
    })

  },
  goMycollection() {
    wx.navigateTo({
      url: 'mycollection/mycollection?useropenid=' + this.data.useropenid,
    })

  },
  tohomePage(){
    console.log("id:" + this.data.useropenid);
    var id = this.data.useropenid;
    wx.navigateTo({
      url: `../personal_homepage/personal_homepage?useropenid=${id}`,
    })
  },
  toFeedback() {

    var id = this.data.useropenid;
    wx.navigateTo({
      url: `feedback/feedback?useropenid=${id}`,
    })
  },

  showModal: function (title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      confirmColor: '#1F4BA5',
      cancelColor: '#7F8389',
      success: function (res) {
        if (res.confirm) {
          callback && callback();
        }
      }
    })
  },
  chooseImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        that.setData({
          avatarUrl: tempFilePaths[0]
        });
      }
    })
  },

  //网络状态
  showNetWork: function () {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType
        that.showModal('网络状态', '您当前的网络：' + networkType);
      }
    })
  },
  //获取当前位置经纬度与当前速度
  getLonLat: function (callback) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        callback(res.longitude, res.latitude, res.speed);
      }
    });
  },
  //显示当前位置坐标与当前速度
  showLonLat: function () {
    var that = this;
    this.getLonLat(function (lon, lat, speed) {
      var lonStr = lon >= 0 ? '东经' : '西经',
        latStr = lat >= 0 ? '北纬' : '南纬';
      lon = lon.toFixed(2);
      lat = lat.toFixed(2);
      lonStr += lon;
      latStr += lat;
      speed = (speed || 0).toFixed(2);
      that.showModal('当前位置和速度', '当前位置：' + lonStr + ',' + latStr + '。速度:' + speed + 'm/s');
    });
  },
  //在地图上显示当前位置
  showMap: function () {
    this.getLonLat(function (lon, lat) {
      wx.openLocation({
        latitude: lat,
        longitude: lon,
        scale: 15,
        name: "北大科技园",
        address: "中关村北大街127-1号",
        fail: function () {
          wx.showToast({
            title: "地图打开失败",
            duration: 1000,
            icon: "cancel"
          });
        }
      });
    });
  },
  //显示罗盘
  showCompass: function () {
    var that = this;
    this.setData({
      compassHidden: false
    })
    wx.onCompassChange(function (res) {
      console.log(res)
      if (!that.data.compassHidden) {
        that.setData({ compassVal: res.direction.toFixed(2) });
      }
    });
  },

  //隐藏罗盘
  hideCompass: function () {
    this.setData({
      compassHidden: true
    })
  },
  //扫描二维码
  scanQRCode: function () {
    var that = this;
    wx.scanCode({
      success: function (res) {
        console.log(res)
        that.showModal('扫描二维码', res.result, false);
      },
      fail: function (res) {
        that.showModal('扫描二维码', "扫描失败，请重试", false);
      }
    })
  },


  //设置界面
  setting: function () {
    wx.openSetting({
      success: (res) => {
        //console.log(res);
      }
    })
  },
  //选择收货地址
  chooseAddress: function () {
    wx.chooseAddress({
      success: function (res) {
        //console.log(res);
      }
    })
  },
  showProject: function () {
    wx.navigateTo({
      url: 'setting/others/wx-project/wx-project'
    });
  },
  //显示系统信息
  showSystemInfo: function () {
    wx.navigateTo({
      url: 'setting/device/device'
    });
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


})