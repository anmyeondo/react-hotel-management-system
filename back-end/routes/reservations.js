var express = require('express');
var connection = require('../database/database');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

// FormData parser
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var router = express.Router();

// 모든 Reservation 정보 불러오기
router.get('/informs', (req, res, next) => {
  var startTime = new Date();
  console.log('Reservation 정보를 불러옵니다 : ' + startTime);

  const q = `SELECT * FROM Reservation NATURAL JOIN Room NATURAL JOIN Customer NATURAL JOIN Information NATURAL JOIN Zip NATURAL JOIN Card NATURAL JOIN Card_BIN NATURAL JOIN Hotel`;
  console.log(q);
  connection.query(q, (err, rows, fields) => {
    // console.log(rows);
    res.send(JSON.stringify(rows));
  });
});

// 예약정보 검색
router.post('/searchReservation', multipartMiddleware, (req, res) => {
  const startTime = new Date();
  console.log('예약 정보 검색을 시작합니다 : ' + startTime);

  const body = req.body; // { Check_In, Check_Out, Room_Type }
  console.log(body);

  let q = `SELECT * FROM Reservation NATURAL JOIN Room NATURAL JOIN Customer NATURAL JOIN Information NATURAL JOIN Zip NATURAL JOIN Card NATURAL JOIN Card_BIN NATURAL JOIN Hotel`;
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

// 예약정보 수정
router.post('/modifyReservation', multipartMiddleware, (req, res) => {
  const startTime = new Date();
  console.log('예약 수정을 시작합니다 : ' + startTime);

  const body = req.body; // { Check_In, Check_Out, Room_Type }
  const data = JSON.parse(req.body.data);
  console.log(body);
  console.log(data);

  let queryHeader = `UPDATE ${body.table_name} SET`;
  let queryChange = ``;
  let queryCondition = ` WHERE ${body.pk} = ${body.pk_value}`;

  for (let key in data) {
    if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
      if (queryChange !== '') queryChange = queryChange + ',';
      queryChange = queryChange + ` ${key} = '${data[key]}'`;
    }
  }

  const q = queryHeader + queryChange + queryCondition;
  console.log(q);

  connection.query(q, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

module.exports = router;
