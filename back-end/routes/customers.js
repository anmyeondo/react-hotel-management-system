var express = require('express');
var connection = require('../database/database');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//고객 조회
router.get('/informs', (req, res, next) => {
  var startTime = new Date();
  console.log('Customers 테이블 조회를 시작합니다 : ' + startTime);

  const q = `SELECT * FROM Customer Natural Join Membership_Rank Information Natural Join Zip Natural Join Card Card_BIN Natural Join Membership_Validity `;

  connection.query(q, (err, rows, fields) => {
    // console.log(rows);
    res.send(JSON.stringify(rows));
  });
});

//고객 삭제
router.get('/del', async (req, res) => {
  var startTime = new Date();
  console.log('Delete Staff API Start at ' + startTime);
  let infoID = req.query.infoID;
  let customerID = req.query.customerID;
  const q_info = `DELETE FROM Information WHERE Inform_ID=?;`;
  const q_customer = `DELETE FROM Staff WHERE Customer_ID=?;`;

  let dbInsert = async (q, value) => {
    console.log('데이터베이스에 쿼리를 입력합니다');
    connection.query(q, value, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log('삭제완료');
      }
    });
  };
  
  await dbInsert(q_customer, [customerID]);
  await dbInsert(q_info, [infoID]);

  res.send();
});
module.exports = router;
