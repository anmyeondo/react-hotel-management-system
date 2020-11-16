const express = require('express');
const connection = require('../database/database');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const secretObj = require('../jwt');
const ip = require('ip');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET staffs information */
router.get('/t1', (req, res, next) => {
  const startTime = new Date();
  console.log('TEST Start at ' + startTime);

  const params = req.query;
  const myPlainPassword = params.PW;
  let mySaltedPassword = ' ';
  console.log('암호화전 : ' + myPlainPassword);

  if (myPlainPassword != '' && myPlainPassword != undefined) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      console.log('소금 : ' + salt);
      bcrypt.hash(myPlainPassword, salt, (err, hash) => {
        // hash 작업 후 패스워드
        mySaltedPassword = hash;
        console.log(mySaltedPassword);
      });
    });
  }

  console.log('TEST END');
});

router.get('/comp', (req, res, next) => {
  const startTime = new Date();
  console.log('comp Start at ' + startTime);

  const params = req.query;
  const myPlainPassword = params.PP;
  const mySaltedPassword = params.SP;

  bcrypt.compare(myPlainPassword, mySaltedPassword, (err, res) => {
    console.log(res);
  });
});

module.exports = router;
