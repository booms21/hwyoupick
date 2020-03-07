var mysql = require("mysql");
var pool = mysql.createPool({
    host:"120.79.68.178",
    user:"root",
    password:"admin",
    database:"goodsreview_db"
});

function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

exports.query = query;