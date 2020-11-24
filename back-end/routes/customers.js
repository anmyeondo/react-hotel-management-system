var express = require('express');
var connection = require('../database/database');
var bodyParser = require('body-parser');

// FormData parser
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//고객 조회
router.get('/informs', (req, res, next) => {
  var startTime = new Date();
  console.log('Customers 테이블 조회를 시작합니다 : ' + startTime);

  const q = `SELECT * FROM Customer Natural Join Membership_Rank Natural Join Information Natural Join Zip Natural Join Card Card_BIN Natural Join Membership_Validity
  `;

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

//고객 조회
router.post('/search', (req, res) => {
  const startTime = new Date();
  console.log('검색 시작합니다 : ' + startTime);

  const body = req.body; // {h_id, i_id, code, rank} 입력, 없으면 ""
  console.log(body);

  // 쿼리문 만드는 부분
  let q =
    'SELECT * FROM Customer Natural Join Membership_Rank Natural Join Information Natural Join Zip Natural Join Card Card_BIN Natural Join Membership_Validity';
  let addq = ' WHERE';

  for (let key in body) {
    console.log(body[key]);
    if (body[key] != '' && body[key] != undefined) {
      if (addq !== ' WHERE') {
        addq = addq + ' and';
      }
      let x = body[key];
      if (key != 'Other') {
        x = '"' + x + '"';
      }
      addq = addq + ' ' + key + ' = ' + x;
    } else {
      continue;
    }
  }

  console.log('큐 : ' + addq);

  if (addq != ' WHERE') {
    q = q + addq;
    console.log(q);
    connection.query(q, (err, rows, fields) => {
      console.log(JSON.stringify(rows));
      res.send(JSON.stringify(rows));
    });
  }
});

//고객 수정
router.post('/modifyCustomer', multipartMiddleware, async (req, res) => {
  const startTime = new Date();
  console.log('정보 수정을 시작합니다 : ' + startTime);

  const body = req.body;
  table_name = body.table_name;
  primary = JSON.parse(body.primary_key);
  data = JSON.parse(body.data);

  console.log('초기화 완료');

  console.log(primary);
  console.log(data);

  let queryHeader = `UPDATE Customer NATURAL JOIN Information SET `;
  let queryChange = ``;
  let queryCondition = ` WHERE ${primary.primary_key} = ${primary.primary_value};`;

  console.log(queryHeader);
  console.log(queryCondition);

  for (let key in data) {
    console.log(key + ' : ' + data[key]);
    if (data[key] != '' && data[key] !== undefined) {
      if (queryChange === ``) {
        queryChange = `${key} = '${data[key]}'`;
      } else {
        queryChange = queryChange + `, ${key} = '${data[key]}'`;
      }
    }
  }

  console.log(queryChange);

  const q = queryHeader + queryChange + queryCondition;
  console.log(q);

  connection.query(q, (err, rows, fields) => {
    console.log('  데이터베이스에서 수정을 시작합니다.');
    console.log(JSON.stringify(rows));
    res.send(JSON.stringify(rows));
  });
});

module.exports = router;
