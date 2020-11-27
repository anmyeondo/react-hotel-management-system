var express = require('express');
var connection = require('../database/database');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

// 암호화 모듈
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretObj = require('../jwt');
const ip = require('ip');

// FormData parser
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var router = express.Router();

// 모든 Reservation 정보 불러오기
router.get('/informs', (req, res, next) => {
  var startTime = new Date();
  console.log('Reservation 정보를 불러옵니다 : ' + startTime);

  const q = `SELECT * FROM Reservation NATURAL JOIN Room NATURAL JOIN Customer NATURAL JOIN Information NATURAL JOIN Zip NATURAL JOIN Card NATURAL JOIN Card_BIN`;
  console.log(q);
  connection.query(q, (err, rows, fields) => {
    console.log(rows);
    res.send(JSON.stringify(rows));
  });
});

module.exports = router;
