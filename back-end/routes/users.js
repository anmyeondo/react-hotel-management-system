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
  // const data = req.data; // {id: id, password: password}
  const data = { id: 'KSH', password: '1234' };
  const q = `select * from customer where name = "${data.id}"`;
  var numID = 0;
  connection.query(q, (err, rows, fields) => {
    console.log(rows);
    console.log(Object.keys(rows).length);
    numID = numID + Object.keys(rows).length;
  });
  console.log(numID);
});

module.exports = router;
