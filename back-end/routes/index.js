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

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/hotelselect', (req, res, next) => {
  console.log('go');
  const q = 'SELECT Hotel_ID as value, Hotel_Name as label From Hotel';
  connection.query(q, (err, rows, fields) => {
    console.log('호텔 정보를 불러왔습니다.');
    res.json(rows);
  });
});

module.exports = router;
