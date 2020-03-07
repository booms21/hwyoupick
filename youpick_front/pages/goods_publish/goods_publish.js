// pages/goods_publish/goods_publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    array: ['潮牌', '配件', '优品', '周边'],
   images:[],
    goods: {
      title: '',
      detail: '',
      openid: wx.getStorageSync('useropenid'),
      disprice:'',
      price:'',
      platform:'',
      link:'',
      buycode:'',
      sortid:0,
      images: [],
      imageurl:''
    }
  },
  title_Input(e) {
    this.setData({
      ['goods.title']: e.detail.value
      
    })
  },
  detail_Input(e) {
    this.setData({
      ['goods.detail']: e.detail.value

    })
  },
  dispriceInput(e) {
    this.setData({
      ['goods.disprice']: e.detail.value
      
    })
  },
  priceInput(e) {
    this.setData({
     ['goods.price']: e.detail.value
      
    })
  },
  platformInput(e) {
    this.setData({
      ['goods.platform']: e.detail.value
      
    })
  },
  linkInput(e) {
    this.setData({
      ['goods.link']: e.detail.value
      
    })
  },
  buycodeInput(e) {
    this.setData({
     ['goods.buycode']: e.detail.value
      
    })
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      ['goods.sortid']: parseInt(e.detail.value)+1
    })
  },
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images = res.tempFilePaths;
        // 限制最多只能留下3张照片
       // this.data.images = images.length <= 1 ? images : images.slice(0, 1)
        this.setData({
          ['goods.images']: this.data.images[0],
             images: this.data.images
        })

      }
    })
  },





  submit() {//提交

  var that=this;
    console.log(this.data.goods)
    var goodsinfo = this.data.goods;
    if (goodsinfo.title==''){
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 3000,
        mask: true
      })
      return;
    }

    if (goodsinfo.detail == 0) {
      wx.showToast({
        title: '点评内容不能为空',
        icon: 'none',
        duration: 3000,
        mask: true
      })
      return;
    }

    if (goodsinfo.sortid == '') {
      wx.showToast({
        title: '请选择商品的分类',
        icon: 'none',
        duration: 3000,
        mask: true
      })
      return;
    }
    if (goodsinfo.link == '') {
      wx.showToast({
        title: '商品的购买链接不能为空',
        icon: 'none',
        duration:3000,
        mask: true
      })
      return;
    }
    if (this.data.images.length==0){
      this.addinfo();
      return ;
    }
    this.setData({
      loadingHidden:false
    })
    wx.uploadFile({
      url:  'https://youpick.site:3000/goodsInfo/UploadImg', 
      filePath: this.data.goods.images,
      name: 'path',
      success(res) {
        var json = JSON.parse(res.data)
        that.setData({
          ['goods.imageurl']: json.imgUrl
        })
  
     that.addinfo();
        // do something


      }
    })


  },

addinfo(){

var that=this;
  wx.request({
    url: getApp().globalData.urlPath + '/goodsInfo/add',
    data: this.data.goods,
    method: "POST",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      that.setData({
        loadingHidden: true
      })
      console.log("发布成功");
      wx.showToast({
        title: '发布成功',
        icon: 'succes',
        duration: 2000,
        mask: true
      })
      wx.showTabBarRedDot({
        index: 1,
      })
      that.onLoad();
    }
  })
},

  removeImage(e) {
    const idx = e.target.dataset.idx
   // this.data.images.splice(idx, 1)
    this.setData({
      ['goods.images']:'',
      images:[]
    })
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

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