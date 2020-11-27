var express = require('express');
var connection = require('../database/database');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

// FormData parser
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var router = express.Router();

// 모든(혹은 특정한) 레스토랑 정보 불러오기
router.post('/restaurantInforms', multipartMiddleware, (res, req) => {
  const startTime = new Date();
  console.log('레스토랑 검색을 시작합니다 : ' + startTime);

  const Hotel_ID = req.body.Hotel_ID;
  if (Hotel_ID === '' || Hotel_ID === null || Hotel_ID === undefined) {
    const q = 'SELECT * FROM Restaurant NATURAL JOIN Hotel NATURAL JOIN Course_Menu';
  } else {
    const q = `SELECT * FROM Restaurant NATURAL JOIN Hotel NATURAL JOIN Course_Menu WHERE Hotel_ID = ${Hotel_ID}`;
  }

  connection.query(q, (err, rows, fields) => {
    res.json(rows);
  });
});

// 호텔 정보 검색
router.post('/restaurantSearch', multipartMiddleware, (res, req) => {
  const startTime = new Date();
  console.log();
});
