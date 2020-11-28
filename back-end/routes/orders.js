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
    if (err) {
      console.log(err);
    } else {
      console.log('Order 정보 출력 완료');
      res.send(JSON.stringify(rows));
    }
  });
});

// 모든 부서 정보 불러 오기
router.get('/departments', (req, res) => {
  var startTime = new Date();
  console.log('부서 정보를 불러옵니다 : ' + startTime);

  const q = `SELECT * FROM Department_Code`;
  connection.query(q, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Order 정보 출력 완료');
      res.send(JSON.stringify(rows));
    }
  });
});

router.post('/staffInforms', (req, res) => {
  var startTime = new Date();
  console.log('부서별 직원 정보를 불러옵니다 : ' + startTime);

  var code = req.body.code;
  var q = `SELECT * FROM Staff NATURAL JOIN Information WHERE Is_Available = 1`;
  if (code) {
    q += ` AND Code = ${code}`;
  }

  connection.query(q, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log('부서별 Order 정보 출력 완료');
      res.send(JSON.stringify(rows));
    }
  });
});

router.post('/assign', (req, res) => {
  const startTime = new Date();
  console.log('직원 배정을 시작합니다 : ' + startTime);

  var order_id = req.body.order_id;
  var staff_id = req.body.staff_id;
  var is_done = req.body.is_done ? 1 : 0;

  var date = new Date();
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = date.getDate().toString();

  if (mm.length === 1) mm = '0' + mm;
  if (dd.length === 1) dd = '0' + dd;
  today = yyyy + '-' + mm + '-' + dd;

  var q1 = `UPDATE Room_Service SET Assigned_Time = '${today}' WHERE Order_ID = ${order_id}`;
  var q2 = `UPDATE Room_Service SET Is_Done = '${is_done}' WHERE Order_ID = ${order_id}`;
  var q3 = `UPDATE Staff SET Is_Available = 0 WHERE Staff_ID = ${staff_id}`;

  connection.query(q1, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Order assined time update 완료');
      res.send();
    }
  });

  connection.query(q2, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Order Is_done update 완료');
      res.send();
    }
  });

  connection.query(q3, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Staff Assign 완료');
      res.send();
    }
  });
});

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
