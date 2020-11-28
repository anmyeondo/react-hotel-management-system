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

// router.post('/searchOrder', (req, res) => {
//   var startTime = new Date();
//   console.log('필터링된 Order 정보를 불러옵니다 : ' + startTime);

//   console.log('HOTEL');
//   var Hotel_ID = req.body.Hotel_ID;
//   var Is_Done = req.body.Is_Done ? 1 : 0;
//   var Is_Assigned = req.body.IsAssigned;

//   var q =
//     `SELECT * FROM Room_Service NATURAL JOIN Room NATURAL JOIN Staff NATURAL JOIN Information NATURAL JOIN Zip NATURAL JOIN Hotel ` +
//     `WHERE Hotel_ID = ${Hotel_ID} AND Is_Done = ${Is_Done}`;

//   if (!Is_Assigned) {
//     q += ' AND Staff_ID = 0';
//   }

//   console.log(q);
// });

/* 주문 정보 검색 API */
router.post('/searchOrder', (req, res) => {
  const startTime = new Date();
  console.log('주문 검색을 시작합니다 : ' + startTime);

  const data = req.body;
  console.log(data);

  let queryHeader = `SELECT * FROM Room_Service NATURAL JOIN Room NATURAL JOIN Staff NATURAL JOIN Information NATURAL JOIN Zip NATURAL JOIN Hotel`;
  let queryCondition = ` WHERE `;

  for (let key in data) {
    console.log(key + ' : ' + data[key]);
    if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
      if (key === 'IsAssigned') {
        if (!data[key]) {
          if (queryCondition === ` WHERE `) {
            queryCondition += `Staff_ID = 0`;
          } else {
            queryCondition += ` AND Staff_ID = 0`;
          }
        } else {
          if (queryCondition === ` WHERE `) {
            queryCondition += `Staff_ID > 0`;
          } else {
            queryCondition += ` AND Staff_ID > 0`;
          }
        }
      } else {
        if (queryCondition === ` WHERE `) {
          queryCondition += `${key} = ${data[key]}`;
        } else {
          queryCondition = queryCondition + ` AND ${key} = ${data[key]}`;
        }
      }
    }
  }

  const q = queryHeader + queryCondition;
  console.log(q);

  connection.query(q, (err, rows, fields) => {
    // console.log(JSON.stringify(rows));
    res.send(JSON.stringify(rows));
  });
});

module.exports = router;
