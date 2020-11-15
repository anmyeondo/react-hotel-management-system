var express = require('express');
var connection = require('../database/database');
var bodyParser = require('body-parser');

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
    console.log(JSON.stringify(rows));
  });

  console.log('Staff information API End');
});

module.exports = router;
