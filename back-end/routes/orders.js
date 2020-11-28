var express = require('express');
var connection = require('../database/database');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

// FormData parser
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var router = express.Router();

// 모든 Order 정보 불러오기
router.get('/informs', (req, res, next) => {
  var startTime = new Date();
  console.log('Order 정보를 불러옵니다 : ' + startTime);

  const q = `SELECT * FROM Room_Service NATURAL JOIN Room NATURAL JOIN Staff NATURAL JOIN Information NATURAL JOIN Zip NATURAL JOIN Hotel`;
  console.log(q);
  connection.query(q, (err, rows, fields) => {
     console.log(rows);
    res.send(JSON.stringify(rows));
  });
});

module.exports = router;