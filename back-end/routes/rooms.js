var express = require('express');
var connection = require('../database/database');
var router = express.Router();

router.post('/informs', async (req, res) => {
  const startTime = new Date();
  console.log('방 정보 반환을 시작합니다 : ' + startTime);

  var floor = req.body.floor;
  console.log("body", req.body)
  var q = `SELECT * FROM Room NATURAL JOIN Room_Type WHERE ${floor} <= Room_Num AND Room_Num < ${floor + 100} ORDER BY Room_Num`;

  let dbInsert = async (q) => {
    console.log('데이터베이스에 쿼리를 입력합니다');
    connection.query(q, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log('정보 출력');
        res.send(JSON.stringify(rows));
      }
    });

  };
  await dbInsert(q);
});


module.exports = router;
