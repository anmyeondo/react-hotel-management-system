const express = require('express');
import { jQuery } from 'jquery';
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

router.get('/informs', (req, res, next) => {
  var startTime = new Date();
  console.log('Customers 테이블 조회를 시작합니다 : ' + startTime);

  const q = `SELECT * FROM Customer Natural Join Membership_Rank Information Natural Join Zip Natural Join Card Card_BIN Natural Join Membership_Validity `;

  connection.query(q, (err, rows, fields) => {
    console.log(rows);
    res.send(JSON.stringify(rows));
  });
});

/* 이미지 추가를 포함한 직원 추가 */
router.post('/addCustomer', multipartMiddleware, async (req, res) => {
  const startTime = new Date();
  console.log('손님 수정을 시작합니다 : ' + startTime);

  const body = req.body;
  table_name = body.table_name;
  primary = body.primary_key;
  data = body.data;

  let queryHeader = `UPDATA ${table.name} SET `;
  let queryChange = ``;
  let queryCondition = ` WHERE ${primary[0]} = ${primary[1]}`;

  for (let key in data) {
    console.log(key + ' : ' + data[key]);
    if (data[key] != '' && data[key] !== undefined) {
      if (queryChange === ``) {
        queryChange = `${key} = ${data[key]}`;
      } else {
        queryChange = queryChange + `, ${key} = ${data[key]}`;
      }
    }
  }

  const q = queryHeader + queryChange + queryCondition;
  connection.query(q, (err, rows, fields) => {
    console.log('  데이터베이스에서 수정을 시작합니다.');
    res.send(JSON.stringify(rows));
  });
});

module.exports = router;
