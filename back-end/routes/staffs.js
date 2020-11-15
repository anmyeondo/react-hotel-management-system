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
router.post('/addStaff', (req, res, next) => {
  var startTime = new Date();
  console.log('Add Staff API Start at ' + startTime);

  let body = req.body;
  const q = 'INSERT INTO Staff VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(body.PW, salt, (err, hash) => {
      body.PW = hash;
      console.log('패스워드가 암호화되었습니다.');
    });
  });

  connection.query(q, body, (err, rows, fields) => {
    res.send(JSON.stringify(rows));
  });

  console.log('Add Staff API END');
});

module.exports = router;
