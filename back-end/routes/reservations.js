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

router.post('/searchReservation', multipartMiddleware, (req, res) => {
  const startTime = new Date();
  console.log('예약 정보 검색을 시작합니다 : ' + startTime);

  const body = req.body; // { Check_In, Check_Out, Room_Type }
  console.log(body);

  let q = `SELECT * FROM Reservation NATURAL JOIN Room NATURAL JOIN Customer NATURAL JOIN Information NATURAL JOIN Zip NATURAL JOIN Card NATURAL JOIN Card_BIN`;
  // let q = `SELECT * FROM Reservation NATURAL JOIN Room`;
  let addq = ' WHERE';

  for (let key in body) {
    if (body[key] != '' && body[key] != undefined && body[key] != null) {
      if (key === 'Check_In' || key === 'Check_Out') {
        let values = JSON.parse(body[key]); // { Check, Start, End }
        // console.log(!values.Check);
        if (!values.Check) {
          if (addq !== ' WHERE') {
            addq = addq + ' and';
          }
          addq = addq + ` (${key} BETWEEN '${values.Start}' AND '${values.End}')`;
        } else continue;
      } else {
        if (addq !== ' WHERE') {
          addq = addq + ' and';
        }
        let x = body[key];
        x = '"' + x + '"'; // 문자열 처리
        addq = addq + ' ' + key + ' = ' + x;
      }
    } else {
      continue;
    }
  }

  if (addq != ' WHERE') {
    q = q + addq;
  }
  console.log(q);

  connection.query(q, (err, rows, fields) => {
    // console.log(JSON.stringify(rows));
    res.send(JSON.stringify(rows));
  });
});

module.exports = router;
