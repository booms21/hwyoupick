var express = require('express');
var router = express.Router();
var https = require("https");
var db = require("../config/db");
var moment = require('moment')
/* GET users listing. */
router.post('/add', function (req, res1, next) {

  console.log("++++++++" + req.body.code)
  var APPID = "wx8f906144de3c2486";
  var SECRET = "d91a4fc32ee63787cf5f46815b4c41ba";
  var JSCODE = req.body.code;
  var usernickname = req.body.nickName;
  var userimgpath = req.body.avatarUrl;


  var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + JSCODE + '&grant_type=authorization_code';

  var req = https.get(url, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (data) {
      console.log('BODY: ' + data);
      var useropenid = JSON.parse(data).openid;
      var session_key = JSON.parse(data).session_key;

      var now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

      var sql1 = "select id from wxuser_tb where wx_openid='" + useropenid + "'";
      db.query(sql1, function (err, rows) {
        if (err) {
          console.log("查询失败" + err)

        } else {
          console.log("查询成功")
          if (rows.length <= 0) {

            var sql = "insert into wxuser_tb(wx_openid,wx_nickname,user_tel,wx_imgPath,wx_motto,wx_authorizeTime) values('" +
              useropenid + "','" + usernickname + "','','" + userimgpath + "','','" + now + "')";
            db.query(sql, function (err, rows) {
              if (err) {

                res1.send("注册失败" + err);
              } else {
                res1.send({
                  msg: "注册成功",
                  openid: useropenid
                });
              }
            });
          } else {

            res1.send({
              msg: "用户已注册过",
              openid: useropenid
            });
          }
        }
      });

    });

    req.on('error', function (e) {
      console.log('problem with request: ' + e.message);
    });

    req.end();

    // res1.send('respond with a resource000');
  });


});


router.get('/getActivity', function (req, res) {
  var openid = req.query.openid;


  var sql = "select review_title,goods_imgPath,goods_discountPrice,goods_likes,id FROM goodsinfo_tb where release_openid ='" + openid + "' ORDER BY release_time DESC";
  var sql1 = "select GoodsInfo_ID,Comment_content,DATE_FORMAT(Comment_time, '%Y-%m-%d %H:%m')as Comment_time1,review_title,goods_imgPath,review_detail FROM commentinfo_tb,goodsinfo_tb where goodsinfo_tb.id=GoodsInfo_ID and  Wx_openid ='" +
    openid + "' ORDER BY Comment_time DESC"
  var sql2 = "select SUM(goods_likes)as likesnum FROM goodsinfo_tb where release_openid = '" + openid + "'";

  db.query(sql, function (err, goodslist) {
    if (err) {
      res.send("查询用户发布历史失败" + err);
    } else {
      db.query(sql1, function (err, CommentList) {
        if (err) {
          res.send("查询用户评论历史失败" + err);
        } else {
          db.query(sql2, function (err, likesnum) {
            if (err) {
              res.send("查询用户总获赞数失败" + err);
            } else {

              res.send({
                msg: "查询用户历史动态成功,获赞数成功",
                goodslist: goodslist,
                CommentList: CommentList,
                likesnum: likesnum[0].likesnum
              });
            }
          });
        }
      });

    }
  });

});


router.get('/follow', function (req, res) {
  var wx_openid = req.query.wx_openid;
  var release_openid = req.query.release_openid;

  var now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  var sql = "select id from followinfo_tb where  fan_wxopenid = '" + wx_openid + "' and followed_wxopenid = '" + release_openid + "'";
  var sql1 = "insert into followinfo_tb(fan_wxopenid,followed_wxopenid,follow_time) values('" + wx_openid + "','" + release_openid + "','" + now + "')";
  var sql2 = "delete from followinfo_tb where  fan_wxopenid = '" + wx_openid + "' and followed_wxopenid = '" + release_openid + "'";


  db.query(sql, function (err, rows1) {
    if (err) {
      res.send("查询失败" + err);
    } else {
      if (rows1.length <= 0) {
        db.query(sql1, function (err, rows) {
          if (err) {
            res.send("关注失败" + err);
          } else {

            res.send("关注成功" + rows);
          }
        });
      } else {
        //取消关注
        db.query(sql2, function (err, rows3) {
          if (err) {
            res.send("关注失败" + err);
          } else {
            res.send("取消关注成功" + rows3);
          }
        });
      }
    }
  });

});

router.get("/getUserInfo", function (req, res) {
  var useropenid = req.query.openid;


  var sql = "select * FROM wxuser_tb where wx_openid='" + useropenid + "'";
  var sql1 = "select count(id)as flednum FROM followinfo_tb where fan_wxopenid='" + useropenid + "'";
  var sql2 = "select count(id)as fansnum FROM followinfo_tb where followed_wxopenid='" + useropenid + "'";

  db.query(sql, function (err, userinfo) {
    if (err) {
      res.send("查询失败" + err);
    } else {
      db.query(sql1, function (err, floedsnum) {
        if (err) {
          res.send("查询失败" + err);
        } else {
          db.query(sql2, function (err, fansnum) {
            if (err) {
              res.send("查询失败" + err);
            } else {

              res.send({
                msg: "查询用户信息成功",
                userinfo: userinfo[0],
                floedsnum: floedsnum[0].flednum,
                fansnum: fansnum[0].fansnum
              });
            }
          });
        }
      });

    }
  });

});

router.get("/getMyfollow", function (req, res) {
  var useropenid = req.query.useropenid;

  var sql = "select wx_nickname,wx_imgPath,followed_wxopenid from followinfo_tb,wxuser_tb where followed_wxopenid=wx_openid and fan_wxopenid = '"+
  useropenid +"' ORDER BY follow_time DESC";

  db.query(sql, function (err, myfollowlist) {
    if (err) {
      res.send("查询我的关注失败" + err);
    } else {

      res.send({
        msg: "查询我的关注成功",
        list: myfollowlist
      });
    }
  });

});

router.get("/getmyfans", function (req, res) {
  var useropenid = req.query.useropenid;

  var sql = "select wx_nickname,wx_imgPath,fan_wxopenid from followinfo_tb,wxuser_tb where fan_wxopenid=wx_openid and followed_wxopenid = '"+
  useropenid+"' ORDER BY follow_time DESC";
  
  db.query(sql, function (err, myfanslist) {
    if (err) {
      res.send("查询我的粉丝失败" + err);
    } else {

      res.send({
        msg: "查询我的粉丝成功",
        list: myfanslist
      });
    }
  });

});

router.get("/getMyCollection", function (req, res) {
  var useropenid = req.query.useropenid;

  var sql = "SELECT GoodsInfo_ID,review_title,goods_discountPrice,goods_likes,goods_imgPath from collectioninfo_tb,goodsinfo_tb where GoodsInfo_ID=goodsinfo_tb.id and user_openid = '"+
  useropenid+"' ORDER BY collectioninfo_tb.id DESC";
  
  db.query(sql, function (err, mycollectionlist) {
    if (err) {
      res.send("查询我的收藏失败" + err);
    } else {

      res.send({
        msg: "查询我的收藏成功",
        list: mycollectionlist
      });
    }
  });

});


router.post("/setUserMotto", function (req, res) {
  var useropenid = req.body.useropenid;
  var motto = req.body.motto;

  var sql = "UPDATE  wxuser_tb set wx_motto='"+motto+"' where wx_openid='"+useropenid+"'";

  db.query(sql, function (err, rows) {
    if (err) {
      res.send("保存用户签名失败" + err);
    } else {
      res.send("保存用户签名成功"+rows);
    }
  });
});

router.post("/setUserTel", function (req, res) {
  var useropenid = req.body.useropenid;
  var tel = req.body.user_tel;

  var sql = "UPDATE  wxuser_tb set user_tel='"+tel+"' where wx_openid='"+useropenid+"'";

  db.query(sql, function (err, rows) {
    if (err) {
      res.send("保存用户手机号码失败" + err);
    } else {
      res.send("保存用户手机号码成功"+rows);
    }
  });
});

module.exports = router;