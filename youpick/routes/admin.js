var express = require('express');
var router = express.Router();
var db = require("../config/db");
var moment = require('moment');

router.get("/getAdminList", function (req, res) {
});
router.get("/addAdminUser", function (req, res) {
});
router.get("/updateAdminUser", function (req, res) {
});


router.post("/addFeedbackInfo", function (req, res) {
    var content = req.body.content;
    var useremail = req.body.email;
    var openid = req.body.openid;
    var nikename = req.body.nikename;
 
    var now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    var sql = "insert into feedbackinfo_tb(feedbackInfo_content,wx_openid,userEmail,wx_nikename,feedbackInfo_createtime) VALUES('"+
    content+"','"+openid+"','"+useremail+"','"+nikename+"','"+now+"')";

    db.query(sql, function (err, rows) {
        if (err) {
          res.send("添加意见反馈失败" + err);
        } else {
          res.send("添加意见反馈成功"+rows);
        }
      });

});
router.get("/delFeedbackInfo", function (req, res) {


});
router.post("/addReportInfo", function (req, res) {
    var sort = req.body.sort;
    var title = req.body.title;
    var content = req.body.content;
    var goodsinfoid = req.body.goodsinfoid;
    var openid = req.body.openid;
    var nikename = req.body.nikename;

    var now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    
var sql ="insert into reportinfo_tb(reportInfo_violationSort,reportInfo_content,reportInfo_title,reportInfo_createtime,goodsInfo_ID,wx_openid,wx_nikename) VALUES('"+
sort+"','"+content+"','"+title+"','"+now+"',"+goodsinfoid+",'"+openid+"','"+nikename+"')";


db.query(sql, function (err, rows) {
    if (err) {
      res.send("添加举报信息失败" + err);
    } else {
      res.send("添加举报信息成功"+rows);
    }
  });

});
router.get("/delReportInfo", function (req, res) {


});
router.get("/xxx", function (req, res) {


});


module.exports = router;