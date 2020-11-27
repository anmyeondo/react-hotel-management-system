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

// multer middleware 선언
const upload = multer({ dest: './image' });

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

/* 이미지 추가를 포함한 레스토랑 추가 */
router.post('/addRestaurant', upload.any(), async (req, res) => {
  const startTime = new Date();
  console.log('레스토랑 추가를 시작합니다 : ' + startTime);

  let image = '/facility_image/' + 'basicImage';
  let body = req.body;

  if (Object(req.files).length > 0) {
    console.log('  이미지가 존재합니다. 경로를 설정합니다.');
    image = '/facility_image/' + req.files[0].filename;
  } else {
    console.log('  이미지가 없습니다. 기본 이미지로 설정합니다.');
    delete body.Restaurant_Img;
  }

  const value = Object.values(body);

  // 레스토랑 추가 쿼리
  // (Restaurant_Name, Hotel_ID, Open_Time, Close_Time, Available, Restaurant_Img)
  const q = `INSERT INTO Restaurant VALUES(?, ?, ?, ?, ?, ?);`;

  connection.query(q, value, (err, rows, fields) => {
    res.json(rows);
  });
});

module.exports = router;
