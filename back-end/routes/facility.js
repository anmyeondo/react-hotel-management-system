var express = require('express');
var connection = require('../database/database');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

// FormData parser
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/asd', (req, res) => {
  console.log('hi');
  res.send({ hi: 'hi' });
});

// 모든(혹은 특정한) 레스토랑 정보 불러오기
router.post('/restaurantInforms', multipartMiddleware, (req, res) => {
  const startTime = new Date();
  console.log('레스토랑 검색을 시작합니다 : ' + startTime);

  const Hotel_ID = req.body.Hotel_ID;
  // const Hotel_ID = undefined;
  let q = '';
  console.log(Hotel_ID);
  if (Hotel_ID === '' || Hotel_ID === null || Hotel_ID === undefined) {
    q = 'SELECT * FROM Restaurant';
  } else {
    q = `SELECT * FROM Restaurant WHERE Hotel_ID = ${Hotel_ID}`;
  }

  console.log(q);

  connection.query(q, (err, rows, fields) => {
    console.log(rows);
    res.json(rows);
  });
});

// 호텔 정보 검색
router.post('/restaurantSearch', multipartMiddleware, (req, res) => {
  const startTime = new Date();
  console.log();
});

// /* 이미지 추가를 포함한 레스토랑 추가 */
// router.post('/addRestaurant', upload.any(), async (req, res) => {
//   const startTime = new Date();
//   console.log('레스토랑 추가를 시작합니다 : ' + startTime);

//   let image = '/image/' + 'basicImage';
//   let body = req.body;

//   if (Object(req.files).length > 0) {
//     console.log('  이미지가 존재합니다. 경로를 설정합니다.');
//     image = '/image/' + req.files[0].filename;
//   } else {
//     console.log('  이미지가 없습니다. 기본 이미지로 설정합니다.');
//     delete body.staff_image;
//   }

//   // Staff 테이블에 데이터를 삽입하는 쿼리
//   const q = `INSERT INTO Staff(Hotel_ID, Inform_ID, CODE, Rank, Bank, Account, Staff_Password, RegDate, Salary, Is_Available, Staff_Image) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '${image}');`;

//   // 비밀번호 암호화 -> 암호화 비밀번호로 동기화 -> DB에 추가
//   let pwEncrpt = async () => {
//     console.log(' 비밀번호 암호화를 시작합니다');
//     await bcrypt.genSalt(saltRounds, async (err, salt) => {
//       await bcrypt.hash(body.staff_pw, salt, async (err, hash) => {
//         console.log('  비밀번호가 암호화 되었습니다');
//         let value = await makeValue(hash);
//         let pushDB = await dbInsert(q, value);
//         // return pushDB;
//       });
//     });
//   };

//   // DB에 추가하는 메소드
//   let dbInsert = async (q, value) => {
//     console.log('  데이터베이스에 쿼리를 입력합니다');
//     // console.log(value);
//     connection.query(q, value, (err, rows, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('등록완료');
//         res.send(rows);
//       }
//     });
//   };

//   // 암호화 비밀번호 동기화 메소드
//   let makeValue = async (sp) => {
//     console.log('  암호화된 비밀번호로 갱신중입니다');
//     body.staff_pw = sp;
//     return Object.values(body);
//   };

//   let ret = await pwEncrpt();
// });

module.exports = router;
