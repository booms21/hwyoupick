// pages/goods_detail/goods_detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    followtext: "十 关注",
    bgc: "",
    followimghidden:false,
    fs: "",
    info: {},
    commentlist: [],
    dzimg: "../images/ding.png",
    coltiontext: "收藏",
    coltionimg: "../images/collection.png",

    userinfo: {
      'Comment_content':"",
      'Comment_time1':"",
      'GoodsInfo_ID':'',
      'wx_nickname':"",
      'wx_openid': '',
      'GoodsInfo_title':"",
      'wx_imgPath':''
    }



  },
  comment_Input(e) {
    this.setData({
      ['userinfo.Comment_content']: e.detail.value

    })
  },
  onLoad: function (option) {

    console.log(option)
    this.setData({
      ['userinfo.GoodsInfo_ID']: option.goodsid,
      ['userinfo.wx_openid']: wx.getStorageSync('useropenid')
         })

    var that = this

    wx.request({
      url: getApp().globalData.urlPath + '/goodsInfo/getDetail',
      data: {
        goodsid: option.goodsid,
        openid: that.data.userinfo.wx_openid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          info: res.data.info[0],
          loadingHidden: true,
          commentlist: res.data.commentlist
       

        })
        if (that.data.userinfo.wx_openid == res.data.info[0].release_openid) {
          that.setData({
         followimghidden :true
          });
        }else{

          if (res.data.isFollow.length > 0) {

            that.setData({
              bgc: "#40bcd0",
              fs: "#fff",
              followtext: "取消关注"
            })

          }
        }
   
     

        if (res.data.isCollection.length > 0) {
          that.setData({
            coltionimg: "../images/collectioned.png"
            , coltiontext: "取消收藏"

          });
        }
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })


    //调用应用实例的方法获取全局数据
    /* app.getUserInfo(function (userInfo) {
       //更新数据
       that.setData({
         userInfo: userInfo
       })
     })*/
  },
  tohomePage() {
 
    var id = this.data.info.release_openid;
    wx.navigateTo({
      url: `../personal_homepage/personal_homepage?useropenid=${id}`,
    })
  },

  //事件处理函数
  submitcomment() {
    var that = this
    this.setData({
      ['userinfo.Comment_time1']: new Date().toDateString(),
      
      ['userinfo.wx_nickname']: getApp().globalData.userInfo.nickName,
     
      ['userinfo.GoodsInfo_title']: this.data.info.review_title,
      ['userinfo.wx_imgPath']: getApp().globalData.userInfo.avatarUrl,

    })

    wx.request({
      url: getApp().globalData.urlPath + '/goodsInfo/addComment',
      data:  that.data.userinfo
      ,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
 
        var commentlist = that.data.commentlist;
        var userinfo = [{
          'Comment_content': that.data.userinfo.Comment_content,
          'Comment_time1': res.data.Comment_time1,
          'wx_nickname': that.data.userinfo.wx_nickname,
          'wx_imgPath': that.data.userinfo.wx_imgPath
        }];

        that.setData({
          commentlist: userinfo.concat(commentlist)
        })
        wx.showToast({
          title: '评论成功',
          icon: 'none',
          duration: 2000//持续的时间
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    //console.log(this.data.commentlist)
  },
  dianzan() {
    var that = this
    var  goods_likenum=this.data.info.goods_likes+1;
wx.request({
  url: getApp().globalData.urlPath + '/goodsInfo/like',
  data: {
    goods_likes: goods_likenum,
    GoodsInfo_ID: that.data.userinfo.GoodsInfo_ID
      },
  method: 'GET', 
  success: function (res) {

    wx.showToast({
      title: '已点赞',
      icon: 'none',
      duration: 2000//持续的时间

    })
    that.setData({
      dzimg: "../images/dinged.png",
      ['info.goods_likes']: goods_likenum

    });

  }
})

  },


  collection() {
    var that = this
    wx.request({
      url: getApp().globalData.urlPath + '/goodsInfo/collection',
      data: {
        wx_openid: that.data.userinfo.wx_openid,
        GoodsInfo_ID: that.data.userinfo.GoodsInfo_ID
      },
      method: 'GET',
      success: function (res) {

    
   
  

        if (that.data.coltiontext == "取消收藏") {
       
          that.setData({
            coltionimg: "../images/collection.png",
            coltiontext: "收藏"
          });
        } else {
          wx.showToast({
            title: '已收藏',
            icon: 'none',
            duration: 2000//持续的时间
          })
          that.setData({
            coltionimg: "../images/collectioned.png"
            , coltiontext: "取消收藏"

          });

        }
      }
    })
  },

  


  changetext() {
    var that = this
    wx.request({
      url: getApp().globalData.urlPath + '/users/follow',
      data: {
        wx_openid: that.data.userinfo.wx_openid,
        release_openid: that.data.info.release_openid
      },
      method: 'GET',
      success: function (res) {



        if (that.data.followtext == "取消关注") {

          that.setData({
            bgc: "#fff",
            fs: "#40bcd0",
            followtext: "十 关注"
          })
        } else {
          that.setData({
            bgc: "#40bcd0",
            fs: "#fff",
            followtext: "取消关注"
          })
        }
      }
    })

  },

  goReportPage(){
    var id = this.data.userinfo.wx_openid;
    var goodsid = this.data.userinfo.GoodsInfo_ID;
    wx.navigateTo({
      url: `../report/report?useropenid=${id}&goodsid=${goodsid}`,
    })
  }
,
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
    return {
      title: this.data.info.review_title};
  }
})