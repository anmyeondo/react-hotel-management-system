const express = require('express');
const connection = require('../database/database');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const secretObj = require('../jwt');
const ip = require('ip');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const multipartMiddleware = multipart();

router.get('/', (req, res, next) => {
  const q = 'SELECT Hotel_ID, Hotel_Name From Hotel';
  connection.query(q, (err, rows, fields) => {
    console.log('호텔 정보를 불러왔습니다.');
    res.json(rows);
  });
});

router.get('/informs', (req, res, next) => {
  var startTime = new Date();
  console.log('Customers 테이블 조회를 시작합니다 : ' + startTime);

  const q = `SELECT * FROM Customer Natural Join Membership_Rank Information Natural Join Zip Natural Join Card Card_BIN Natural Join Membership_Validity `;

  connection.query(q, (err, rows, fields) => {
    console.log(rows);
    res.send(JSON.stringify(rows));
  });
});

/* 손님 정보 수정 API */
router.post('/test', multipartMiddleware, async (req, res) => {
  const startTime = new Date();
  console.log('손님 수정을 시작합니다 : ' + startTime);

  const body = req.body;
  table_name = body.table_name;
  primary = JSON.parse(body.primary_key);
  data = JSON.parse(body.data);

  console.log('초기화 완료');

  console.log(primary);
  console.log(data);

  let queryHeader = `UPDATE ${table_name} SET `;
  let queryChange = ``;
  let queryCondition = ` WHERE ${primary.primary_key} = ${primary.primary_value};`;

  console.log(queryHeader);
  console.log(queryCondition);

  for (let key in data) {
    console.log(key + ' : ' + data[key]);
    if (data[key] != '' && data[key] !== undefined) {
      if (queryChange === ``) {
        queryChange = `${key} = '${data[key]}'`;
      } else {
        queryChange = queryChange + `, ${key} = '${data[key]}'`;
      }
    }
  }

  console.log(queryChange);

  const q = queryHeader + queryChange + queryCondition;
  console.log(q);

  connection.query(q, (err, rows, fields) => {
    console.log('  데이터베이스에서 수정을 시작합니다.');
    console.log(JSON.stringify(rows));
    res.send(JSON.stringify(rows));
  });
});

module.exports = router;
