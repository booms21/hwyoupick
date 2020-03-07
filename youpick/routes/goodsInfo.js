var express = require('express');
var router = express.Router();
var db = require("../config/db");
var moment = require('moment');
var fs = require("fs");
var formidable = require("formidable");
var path = require("path");
/* GET users listing. */
router.post('/add', function (req, res, next) {

    var openid = req.body.openid;
    var title = req.body.title;
    var detail = req.body.detail;
    var disprice = req.body.disprice;
    var price = req.body.price;
    var platform = req.body.platform;
    var link = req.body.link;
    var buycode = req.body.buycode;
    var sortid = req.body.sortid;
    var images = req.body.imageurl;

    var now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    var sql = "insert into goodsinfo_tb(release_openid,release_time,review_title,review_detail,goods_imgPath,goods_price,goods_discountPrice,goods_link,goods_sortID,goods_comments,goods_likes,goods_share,goods_buycode,goods_platform) values('" +
        openid + "','" + now + "','" + title + "','" + detail + "','" + images + "','" + price + "','" + disprice + "','" + link + "'," + sortid + ",0,0,0,'" + buycode + "','" + platform + "')";
    db.query(sql, function (err, rows) {
        if (err) {
            console.log(err)
            res.send("添加失败" + err);
        } else {
            res.send("添加成功");
        }
    });


});

router.post("/addComment", function (req, res) {

    var GoodsInfo_ID = req.body.GoodsInfo_ID;
    var wx_nickname = req.body.wx_nickname;
    var Comment_content = req.body.Comment_content;
    var wx_openid = req.body.wx_openid;
    var GoodsInfo_title = req.body.GoodsInfo_title;


    var now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    var sql = "insert into commentinfo_tb(Comment_content,Comment_time,Wx_openid,Wx_nikename,GoodsInfo_ID,GoodsInfo_title) values('" +
        Comment_content + "','" + now + "','" + wx_openid + "','" + wx_nickname + "'," + GoodsInfo_ID + ",'" + GoodsInfo_title + "')"


    db.query(sql, function (err, rows) {
        if (err) {
            res.send("添加失败" + err);
        } else {

            res.send({
                msg: "添加成功",
                Comment_time1: now
            });
        }
    });
});

router.get("/getList", function (req, res) {


    var goods_sortID = req.query.goods_sortID;

    var limit = req.query.limit;
    var sql = "select goodsinfo_tb.id,wx_nickname,wx_imgPath,DATE_FORMAT(release_time, '%Y-%m-%d %H:%m')as release_time,release_openid,review_title,goods_imgPath,goods_discountPrice,goods_price," +
        "goods_sortID,goods_comments,goods_likes,goods_share from wxuser_tb,goodsinfo_tb  where wx_openid=goodsinfo_tb.release_openid ORDER BY release_time DESC LIMIT " + limit
   
        if (!isNaN(goods_sortID)) { //goods_sortID需为数值
        sql = "select goodsinfo_tb.id,wx_nickname,wx_imgPath,DATE_FORMAT(release_time, '%Y-%m-%d %H:%m')as release_time,review_title,goodsSort_describe,goods_imgPath,goods_discountPrice,goods_price,goods_comments,goods_likes,goods_share,goodsSort_name from wxuser_tb,goodsinfo_tb,goodssort_tb  where wx_openid=goodsinfo_tb.release_openid and goodssort_tb.id=goodsinfo_tb.goods_sortID AND goods_sortID = " +
            goods_sortID + " ORDER BY release_time DESC LIMIT " + limit
    }

    db.query(sql, function (err, rows) {
        if (err) {
            res.send("查询失败" + err);
        } else {

            res.send({
                msg: "查询成功",
                list: rows
            });
        }
    });
});


router.get("/like", function (req, res) {
    var goods_likes = req.query.goods_likes;
    var GoodsInfo_ID = req.query.GoodsInfo_ID;
    var sql = "UPDATE goodsinfo_tb SET goods_likes = '" + goods_likes + "' WHERE id = " + GoodsInfo_ID


    db.query(sql, function (err, rows) {
        if (err) {
            res.send("点赞失败" + err);
        } else {

            res.send("点赞成功" + rows);
        }
    });
});


router.get("/collection", function (req, res) {
    var wx_openid = req.query.wx_openid;
    var GoodsInfo_ID = req.query.GoodsInfo_ID;


    var sql3 = "delete from collectioninfo_tb  where  user_openid = '" + wx_openid + "' and GoodsInfo_ID =" + GoodsInfo_ID;
    var sql1 = "select id from collectioninfo_tb where  user_openid = '" + wx_openid + "' and GoodsInfo_ID =" + GoodsInfo_ID;
    var sql = "INSERT into collectioninfo_tb(user_openid,GoodsInfo_ID) VALUES('" + wx_openid + "'," + GoodsInfo_ID + ")";

    db.query(sql1, function (err, rows1) {
        if (err) {
            res.send("查询失败" + err);
        } else {
            if (rows1.length <= 0) {
                db.query(sql, function (err, rows) {
                    if (err) {
                        res.send("收藏失败" + err);
                    } else {

                        res.send("收藏成功" + rows);
                    }
                });
            } else {
                //取消收藏
                db.query(sql3, function (err, rows3) {
                    if (err) {
                        res.send("收藏失败" + err);
                    } else {
                        res.send("取消收藏成功" + rows3);
                    }
                });
            }
        }
    });

});


router.get("/getDetail", function (req, res) {
    var goodsid = req.query.goodsid;
    var openid = req.query.openid;

    var sql2 = "select id from collectioninfo_tb where  user_openid = '" + openid + "' and GoodsInfo_ID =" + goodsid;
    var sql3 = "select id from followinfo_tb where  fan_wxopenid = '" + openid + "' and followed_wxopenid = '";



    var sql = "SELECT  *,DATE_FORMAT(release_time, '%Y-%m-%d %H:%m')as release_time1 from goodsinfo_tb,wxuser_tb where  wxuser_tb.wx_openid=release_openid and goodsinfo_tb.id = " + goodsid
    var sql1 = "SELECT  *,DATE_FORMAT(Comment_time, '%Y-%m-%d %H:%m')as Comment_time1 from commentinfo_tb,wxuser_tb where  commentinfo_tb.Wx_openid=wxuser_tb.wx_openid and DATE_FORMAT(Comment_time, '%Y-%m-%d %H:%m') and GoodsInfo_ID = " + goodsid + " ORDER BY Comment_time DESC";

    db.query(sql, function (err, rows) {
        if (err) {
            res.send("查询失败" + err);
        } else {
            db.query(sql1, function (err1, rows1) {
                if (err) {
                    res.send("查询失败" + err1);
                } else {
                    db.query(sql2, function (err, rows2) {
                        if (err) {
                            res.send("获取是否收藏信息失败" + err);
                        } else {

                            db.query(sql3 + rows[0].release_openid + "'", function (err, rows3) {
                                if (err) {
                                    res.send("获取是否关注发布者失败" + err);
                                } else {

                                    res.send({
                                        msg: "查询成功,获取是否收藏信息成功，获取是否关注发布者成功",
                                        info: rows,
                                        commentlist: rows1,
                                        isCollection: rows2,
                                        isFollow: rows3
                                    });
                                }
                            });
                        }
                    });


                }
            });
        }

    });
});





router.get("/getHotList", function (req, res) {

    var sql = "select goods_imgPath,review_title,goods_platform,goods_discountPrice,goodsinfo_tb.id,goodsSort_name from goodsinfo_tb,goodssort_tb where goodssort_tb.id=goods_sortID  ORDER BY goods_likes desc LIMIT 5"

    db.query(sql, function (err, rows) {
        if (err) {
            res.send("热门商品获取失败" + err);
        } else {

            res.send({
                msg: "热门商品获取成功",
                hotList: rows
            });
        }
    });
});

router.post('/UploadImg', function (req, res) {

    var form = new formidable.IncomingForm();//既处理表单，又处理文件上传
       //设置文件上传文件夹/路径，__dirname是一个常量，为当前路径
     let uploadDir = path.join(__dirname, "../../upload/");
     form.uploadDir = uploadDir;//本地文件夹目录路径
  
     form.parse(req, (err, fields, files) => {   
         let oldPath = files.path.path;//这里的路径是图片的本地路径
              console.log(files.path.name)//图片传过来的名字
          let newPath = path.join(path.dirname(oldPath), files.path.name);
            //这里我传回一个下载此图片的Url
            var downUrl = "https://youpick.site/upload/" + files.path.name;//这里是想传回图片的链接
            fs.rename(oldPath, newPath, () => {//fs.rename重命名图片名称
                res.json({ imgUrl: downUrl })
            })
        })
    
 })
module.exports = router;