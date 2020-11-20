var express = require('express');
var connection = require('../database/database');
var bodyParser = require('body-parser');

// 암호화 모듈
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretObj = require('../jwt');
const ip = require('ip');

// 세션
var session = require('express-session');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET staffs information */
router.get('/informs', (req, res, next) => {
  var startTime = new Date();
  console.log('Staff 테이블 조회를 시작합니다 : ' + startTime);

  const q = `SELECT * FROM Staff Natural Join Hotel Natural Join Information Natural Join Department_Code Natural Join Zip`;

  connection.query(q, (err, rows, fields) => {
    res.send(JSON.stringify(rows));
  });
});

/* Login admin page -> 사용X(아래 세션로그인 사용함) */
router.get('/login', async (req, res, next) => {
  const startTime = new Date();
  console.log('로그인을 시작합니다 : ' + startTime);

  const params = req.query; // {id: id, password: password}
  const q = `SELECT ID, Staff_Password FROM Staff WHERE ID = ${params.id}`;
  let compResult = false;
  let errorcode = 0;

  // DB에서 해당 ID의 (ID, PW)를 불러오는 메소드
  loginApi = async () => {
    console.log('  DB에서 계정 정보를 요청합니다');
    connection.query(q, async (err, rows, fields) => {
      if (err) {
        console.log('    DB에서 계정 정보를 불러오는 도중 에러가 발생하였습니다');
        console.log('  에러 : ' + err);
      } else {
        let queryRes = JSON.stringify(rows);
        queryRes = JSON.parse(queryRes);

        console.log(`    DB에서 ${queryRes.length}개의 계정을 조회했습니다`);
        if (queryRes.length == 0) {
          // 계정 정보 없음
          console.log('    에러 : 계정 정보가 없습니다');
          errorcode = 1;
        } else if (queryRes.length == 1) {
          // 계정 정보 있음
          console.log('    비밀번호 비교를 시작합니다');

          const staffPlainPassword = params.password;
          const staffSaltedPassword = queryRes[0].Staff_Password;

          console.log('    암호화된 비밀번호와 비교합니다');
          compResult = await bcrypt.compare(staffPlainPassword, staffSaltedPassword);
          errorcode = 2;

          if (compResult) {
            console.log('      비밀번호가 일치합니다');
          } else {
            console.log('      비밀번호가 불일치합니다');
          }
        } else {
          // 중복 계정 존재
          console.log('    에러 : 중복 계정이 존재합니다');
          errorcode = 3;
        }

        console.log('  로그인Api 처리 결과를 반환합니다');
        res.json(JSON.stringify({ errorcode, compResult }));
      }
    });
  };

  await loginApi();
});

/* ADD new staff */
router.post('/addStaff', async (req, res, next) => {
  const startTime = new Date();
  console.log('직원 추가를 시작합니다 : ' + startTime);

  let body = req.body;
  const q =
    'INSERT INTO Staff(Hotel_ID, Inform_ID, CODE, Rank, Bank, ACCOUNT, Staff_Password, RegDate, Salary, Is_Available) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

  // 비밀번호 암호화 -> 암호화 비밀번호로 동기화 -> DB에 추가
  let pwEncrpt = async () => {
    console.log(' 비밀번호 암호화를 시작합니다');
    await bcrypt.genSalt(saltRounds, async (err, salt) => {
      await bcrypt.hash(body.staff_pw, salt, async (err, hash) => {
        console.log('  비밀번호가 암호화 되었습니다');
        let value = await makeValue(body, hash);
        let pushDB = await dbInsert(q, value);
        // return pushDB;
      });
    });
  };

  // DB에 추가하는 메소드
  let dbInsert = async (q, value) => {
    console.log('  데이터베이스에 쿼리를 입력합니다');
    connection.query(q, value, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log('등록완료');
        res.send(rows);
      }
    });
  };

  // 암호화 비밀번호 동기화 메소드
  let makeValue = async (body, sp) => {
    console.log('  암호화된 비밀번호로 갱신중입니다');
    body.staff_pw = sp;
    return Object.values(body);
  };

  let ret = await pwEncrpt();
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
        console.log('삭제완료');
      }
    });
  };
  dbInsert(q, [id]);
  res.send('하이염');
});

/* 세션 로그인 정보 받기 */
router.get('/sessionLogin', (req, res) => {
  console.log('세션 정보를 확인합니다.');
  if (req.session.user) {
    console.log('세션이 존재합니다');
    console.log(req.session.user);
    res.send({ permission: true, userID: req.session.user });
  } else {
    console.log('세션이 없습니다');
    res.send({ permission: false });
  }
});

/* 세션 로그인 하기 */
router.post('/sessionLogin', async (req, res) => {
  const startTime = new Date();
  console.log('세션 로그인 테스트를 시작합니다 : ' + startTime);

  const params = req.body; // {id: id, password: password}
  const q = `SELECT ID, Staff_Password FROM Staff WHERE ID = ${params.id}`;
  let compResult = false;
  let errorcode = 0;
  let resData = {};

  console.log('Q', q);

  // DB에서 해당 ID의 (ID, PW)를 불러오는 메소드
  loginApi = async () => {
    console.log('  DB에서 계정 정보를 요청합니다');
    connection.query(q, async (err, rows, fields) => {
      if (err) {
        console.log('    DB에서 계정 정보를 불러오는 도중 에러가 발생하였습니다');
        console.log('    에러 : ' + err);
        res.send({ err: err }); // 에러 전송
      } else {
        let queryRes = JSON.stringify(rows);
        queryRes = JSON.parse(queryRes);

        console.log(`    DB에서 ${queryRes.length}개의 계정을 조회했습니다`);
        if (queryRes.length == 0) {
          // 계정 정보 없음
          console.log('    에러 : 계정 정보가 없습니다');
          errorcode = 1;
        } else if (queryRes.length == 1) {
          // 계정 정보 있음
          console.log('    비밀번호 비교를 시작합니다');

          const staffPlainPassword = params.password;
          const staffSaltedPassword = queryRes[0].Staff_Password;

          console.log('    암호화된 비밀번호와 비교합니다');
          compResult = await bcrypt.compare(staffPlainPassword, staffSaltedPassword);
          errorcode = 2;

          if (compResult) {
            console.log('      비밀번호가 일치합니다');
            console.log('      세션에 로그인 정보를 저장합니다.');
            req.session.user = queryRes;
            console.log('      세션 정보를 출력합니다.');
            console.log(req.session.user);
            console.log('      세션 정보를 response에 추가합니다');
            resData.user = queryRes;
          } else {
            console.log('      비밀번호가 불일치합니다');
          }
        } else {
          // 중복 계정 존재
          console.log('    에러 : 중복 계정이 존재합니다');
          errorcode = 3;
        }

        console.log('  로그인Api 처리 결과를 반환합니다');
        resData.errorcode = errorcode;
        resData.compResult = compResult;
        res.json(resData);
      }
    });
  };

  await loginApi();
});

module.exports = router;
