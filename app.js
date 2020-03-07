var express = require("express");
var https = require("https");
var fs = require("fs");
var app = express();


var options = {
    key: fs.readFileSync("https/1713933_www.youpick.site.key", 'utf8'),
    cert: fs.readFileSync("https/1713933_www.youpick.site.pem", 'utf8')
};
app.get("/", function (req, res) {

    res.send("success!");

});
https.createServer(options, app).listen(8080, function () {
    console.log("completely-https")

});