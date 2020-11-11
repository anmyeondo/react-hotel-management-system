var express = require('express');
var connection = require('../database/database');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 로그인 API
router.get('/login', (req, res, next) => {
  console.log('login start...');
  const tq = req.query; // {id: id, password: password}
  console.log(tq);
  const q = `select * from customer where name = "${tq.id}"`;
  console.log(q);
  connection.query(q, (err, rows, fields) => {
    console.log(rows);
    res.send(rows);
  });
});

module.exports = router;
