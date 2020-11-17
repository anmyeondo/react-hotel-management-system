var express = require('express');
var connection = require('../database/database');
var bodyParser = require('body-parser');

// 암호화 모듈
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretObj = require('../jwt');
const ip = require('ip');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET staffs information */
router.get('/informs', (req, res, next) => {
  var startTime = new Date();
  console.log('Staff information API Start at ' + startTime);

  const params = req.query;
  const q = `SELECT * FROM Staff`;

  connection.query(q, (err, rows, fields) => {
    res.send(JSON.stringify(rows));
  });

  console.log('Staff information API End');
});

/* ADD new staff */
router.post('/addStaff', async (req, res, next) => {
  var startTime = new Date();
  console.log('Add Staff API Start at ' + startTime);

  let body = req.body;
  const q =
    'INSERT INTO Staff(Hotel_ID, Inform_ID, CODE, Rank, Bank, ACCOUNT, Staff_Password, RegDate, Salary, Is_Available) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

  let pwEncrpt = async () => {
    console.log('비밀번호 암호화를 시작합니다');
    await bcrypt.genSalt(saltRounds, async (err, salt) => {
      await bcrypt.hash(body.staff_pw, salt, async (err, hash) => {
        console.log('비밀번호가 암호화 되었습니다');
        let value = await makeValue(body, hash);
        let pushDB = await dbInsert(q, value);
        return pushDB;
      });
    });
  };

  let dbInsert = async (q, value) => {
    console.log('데이터베이스에 쿼리를 입력합니다');
    connection.query(q, value, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log("등록완료");
      }
    });
  };

  let makeValue = async (body, sp) => {
    console.log('암호화된 비밀번호로 갱신중입니다');
    body.staff_pw = sp;
    return Object.values(body);
  };

  let ret = await pwEncrpt();
  res.send(ret);
});

/* Delete new staff */
router.get('/del', async (req, res) => {
  var startTime = new Date();
  console.log('Delete Staff API Start at ' + startTime);
  let id = req.query.id;
  const q = `DELETE FROM Staff WHERE id=?;`;
  
  let dbInsert = async (q, value) => {
    console.log('데이터베이스에 쿼리를 입력합니다');
    connection.query(q, value, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log("삭제완료");
      }
    });
  };
  dbInsert(q, [id])
  res.send("하이염");
})

module.exports = router;
