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

// 세션
var session = require('express-session');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// multer middleware 선언
const upload = multer({ dest: './image' });

/* GET staffs information */
router.get('/informs', (req, res, next) => {
  var startTime = new Date();
  console.log('Staff 테이블 조회를 시작합니다 : ' + startTime);

  const q = `SELECT * FROM Staff Natural Join Hotel Natural Join Information Natural Join Department_Code Natural Join Zip WHERE Staff_ID > 0`;

  connection.query(q, (err, rows, fields) => {
    res.send(JSON.stringify(rows));
  });
});

/* Delete staff */
router.get('/del', async (req, res) => {
  var startTime = new Date();
  console.log('Delete Staff API Start at ' + startTime);
  let infoID = req.query.infoID;
  let staffID = req.query.staffID;
  const q_info = `DELETE FROM Information WHERE Inform_ID=?;`;
  const q_staff = `DELETE FROM Staff WHERE Staff_ID=?;`;

  // 이미지 삭제
  const q = `SELECT Staff_Image FROM Staff WHERE Staff_ID = ${req.query.staffID}`;
  let imageDir = '/image/basicImage';
  let ImageDelete = () => {
    console.log(q);
    connection.query(q, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log('  이미지 경로 검색이 완료되었습니다.');
        imageDir = JSON.stringify(rows);
        imageDir = JSON.parse(imageDir);
        imageDir = imageDir[0].Staff_Image;
        console.log(imageDir);
        if (imageDir !== '/image/basicImage') {
          fs.unlink('.' + imageDir, (err) => {
            if (err) {
              console.log('  이미지가 이미 없습니다.');
            }
            console.log('  이미지 파일 삭제 완료');
          });
        }
      }
    });
  };

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
  await ImageDelete();
  await dbInsert(q_staff, [staffID]);
  await dbInsert(q_info, [infoID]);

  res.send();
});

/* 세션 로그인 정보 받기 */
router.get('/sessionLogin', (req, res) => {
  console.log('세션 정보를 확인합니다.');
  if (req.session.user) {
    console.log('세션이 존재합니다');
    // console.log(req.session.user);
    res.send({ permission: true, user: req.session.user });
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
  const q = `SELECT Staff_ID, Staff_Password FROM Staff WHERE Staff_ID = ${params.id}`;
  let compResult = false;
  let errorcode = 0;
  let resData = {};

  // console.log('Q', q);

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
            // console.log('      세션 정보를 출력합니다.');
            // console.log(req.session.user);
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

router.get('/sessionLogout', async (req, res) => {
  let msg = '';
  let logoutApi = () => {
    if (req.session.user) {
      console.log('로그아웃을 시작합니다.');
      req.session.destroy((err) => {
        if (err) {
          console.log('에러 발생: ', err);
          msg = 'ERROR';
        } else {
          console.log('세션 삭제 완료');
          msg = 'Deleted session!';
        }
      });
    } else {
      console.log('로그인 되지 않았습니다.');
      msg = 'Not Logined';
    }
  };

  await logoutApi();
  res.send(msg);
});

/* 이미지 추가를 포함한 직원 추가 */
router.post('/addStaff', upload.any(), async (req, res) => {
  const startTime = new Date();
  console.log('직원 추가를 시작합니다 : ' + startTime);

  let image = '/image/' + 'basicImage';
  let body = req.body;

  if (Object(req.files).length > 0) {
    console.log('  이미지가 존재합니다. 경로를 설정합니다.');
    image = '/image/' + req.files[0].filename;
  } else {
    console.log('  이미지가 없습니다. 기본 이미지로 설정합니다.');
    delete body.staff_image;
  }

  // Staff 테이블에 데이터를 삽입하는 쿼리
  const q = `INSERT INTO Staff(Hotel_ID, Inform_ID, CODE, Rank, Bank, Account, Staff_Password, RegDate, Salary, Is_Available, Staff_Image) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '${image}');`;

  // 비밀번호 암호화 -> 암호화 비밀번호로 동기화 -> DB에 추가
  let pwEncrpt = async () => {
    console.log(' 비밀번호 암호화를 시작합니다');
    await bcrypt.genSalt(saltRounds, async (err, salt) => {
      await bcrypt.hash(body.staff_pw, salt, async (err, hash) => {
        console.log('  비밀번호가 암호화 되었습니다');
        let value = await makeValue(hash);
        let pushDB = await dbInsert(q, value);
        // return pushDB;
      });
    });
  };

  // DB에 추가하는 메소드
  let dbInsert = async (q, value) => {
    console.log('  데이터베이스에 쿼리를 입력합니다');
    // console.log(value);
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
  let makeValue = async (sp) => {
    console.log('  암호화된 비밀번호로 갱신중입니다');
    body.staff_pw = sp;
    return Object.values(body);
  };

  let ret = await pwEncrpt();
});

/* 검색 기능 */
router.post('/search', (req, res) => {
  const startTime = new Date();
  console.log('검색 시작합니다 : ' + startTime);

  const body = req.body; // {h_id, i_id, code, rank} 입력, 없으면 ""
  // console.log(body);

  // 쿼리문 만드는 부분
  let q =
    'SELECT * FROM Staff Natural Join Hotel Natural Join Information Natural Join Department_Code Natural Join Zip';
  let addq = ' WHERE';

  for (let key in body) {
    // console.log(body[key]);
    if (body[key] != '' && body[key] != undefined) {
      if (addq !== ' WHERE') {
        addq = addq + ' and';
      }
      let x = body[key];
      if (key != 'Other') {
        x = '"' + x + '"';
      }
      addq = addq + ' ' + key + ' = ' + x;
    } else {
      continue;
    }
  }

  // console.log('큐 : ' + addq);

  if (addq != ' WHERE') {
    q = q + addq;
    console.log(q);
    connection.query(q, (err, rows, fields) => {
      // console.log(JSON.stringify(rows));
      res.send(JSON.stringify(rows));
    });
  }
});

/* 직원 정보 수정 API */
router.post('/modifyStaff', multipartMiddleware, async (req, res) => {
  const startTime = new Date();
  console.log('정보 수정을 시작합니다 : ' + startTime);

  const body = req.body;
  table_name = body.table_name;
  primary = JSON.parse(body.primary_key);
  data = JSON.parse(body.data);

  console.log('초기화 완료');

  // console.log(primary);
  // console.log(data);

  let queryHeader = `UPDATE ${table_name} SET `;
  let queryChange = ``;
  let queryCondition = ` WHERE ${primary.primary_key} = ${primary.primary_value};`;

  // console.log(queryHeader);
  // console.log(queryCondition);

  for (let key in data) {
    // console.log(key + ' : ' + data[key]);
    if (data[key] != '' && data[key] !== undefined) {
      if (queryChange === ``) {
        queryChange = `${key} = '${data[key]}'`;
      } else {
        queryChange = queryChange + `, ${key} = '${data[key]}'`;
      }
    }
  }

  // console.log(queryChange);

  const q = queryHeader + queryChange + queryCondition;
  console.log(q);

  connection.query(q, (err, rows, fields) => {
    console.log('  데이터베이스에서 수정을 시작합니다.');
    // console.log(JSON.stringify(rows));
    res.send(JSON.stringify(rows));
  });
});

module.exports = router;
