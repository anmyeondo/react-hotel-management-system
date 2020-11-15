var express = require('express');
var connection = require('../database/database');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 로그인 API
router.get('/login', (req, res, next) => {
  var startTime = new Date();
  console.log('Login API Start' + startTime);
  const params = req.query; // {id: id, password: password}
  const q = `SELECT * FROM Customer WHERE ID = ${params.id}`;
  console.log(q);
  connection.query(q, (err, rows, fields) => {
    res.send(rows);
  });
  console.log('Login API End');
});

module.exports = router;
