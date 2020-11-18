var express = require('express');
var connection = require('../database/database');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getInform', (req, res, next) => {
  const startTime = new Date();
  console.log('특정 개인정보를 가진 개인정보 반환을 시작합니다 : ' + startTime);
});

router.post('/addInform', (req, res, next) => {
  const startTime = new Date();
  console.log('개인정보 등록을 시작합니다 : ' + startTime);

  const body = req.body;
  console.log(body);
  const value = Object.values(body);
  console.log(value);
  // E_Mail, Fax : Null 허용
  const q =
    'INSERT INTO Information(Zip, Apt_Num, First_Name, Last_Name, E_Mail, Fax, Birthday, Nationality, Phone_Number, Gender) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
  console.log(q);
  console.log('  데이터베이스에 쿼리를 입력합니다.');
  connection.query(q, value, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log('  데이터베이스 입력 성공');
      res.send(rows);
    }
  });
});

router.post('/test', (req, res, next) => {});

module.exports = router;
