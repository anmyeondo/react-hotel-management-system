var express = require('express');
var connection = require('../database/database');
var router = express.Router();

router.post('/informs', async (req, res) => {
  const startTime = new Date();
  console.log('방 정보 반환을 시작합니다 : ' + startTime);

  var hotel = req.body.hotel;
  var floor = req.body.floor;

  var q = `SELECT * FROM Room NATURAL JOIN Room_Type WHERE Hotel_ID = ${hotel} AND ${floor} <= Room_Num AND Room_Num < ${
    floor + 100
  } ORDER BY Room_Num`;

  let dbInsert = async (q) => {
    console.log('데이터베이스에 쿼리를 입력합니다');
    connection.query(q, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log('방 정보 출력');
        res.send(JSON.stringify(rows));
      }
    });
  };
  await dbInsert(q);
});

router.post('/reservations', async (req, res) => {
  const startTime = new Date();
  console.log('방 예약 정보 반환을 시작합니다 : ' + startTime);

  var hotel = req.body.hotel;
  var floor = req.body.floor;
  console.log(hotel);
  var date = new Date();
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = date.getDate().toString();

  if (mm.length === 1) mm = '0' + mm;
  if (dd.length === 1) dd = '0' + dd;
  today = yyyy + '-' + mm + '-' + dd;

  const q = `SELECT * FROM Reservation WHERE Hotel_ID = ${hotel} AND (Check_In <= '${today}' AND '${today}' <= Check_Out) AND (${floor} <= Room_Num AND Room_Num < ${
    floor + 100
  }) ORDER BY Room_Num`;

  let dbInsert = async (q) => {
    console.log('데이터베이스에 쿼리를 입력합니다');
    connection.query(q, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log('방 예약 정보 출력!');
        res.send(JSON.stringify(rows));
      }
    });
  };
  await dbInsert(q);
});

router.post('/moreInform', async (req, res) => {
  const startTime = new Date();
  console.log('방 상세 정보 반환을 시작합니다 : ' + startTime);

  const q = `SELECT * FROM Reservation NATURAL JOIN Room NATURAL JOIN Customer NATURAL JOIN Information NATURAL JOIN Zip`;

  let dbInsert = async (q) => {
    console.log('데이터베이스에 쿼리를 입력합니다');
    connection.query(q, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log('상세 정보 출력');
        res.send(JSON.stringify(rows));
      }
    });
  };
  await dbInsert(q);
});

module.exports = router;
