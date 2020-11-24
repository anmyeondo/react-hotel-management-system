var express = require('express');
var connection = require('../database/database');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/informs', (req, res, next) => {
  var startTime = new Date();
  console.log('Customers 테이블 조회를 시작합니다 : ' + startTime);

  const q = `SELECT * FROM Customer Natural Join Membership_Rank Natural Join Information Natural Join Membership_Validity Natural Join Zip Natural Join Card Natural Join Card_BIN`;

  connection.query(q, (err, rows, fields) => {
    // console.log(rows);
    res.send(JSON.stringify(rows));
  });
});

module.exports = router;
