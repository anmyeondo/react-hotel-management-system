var express = require('express');
var connection = require('../database/database');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

// FormData parser
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// multer middleware 선언
const upload = multer({ dest: './facilityImage' });

// 코스 삭제
router.post('/delCourse', (req, res) => {
  console.log('delCourse 실행');
  const body = req.body;
  const q = `DELETE FROM Course_Menu WHERE Hotel_ID = ${body.Hotel_ID} AND Restaurant_Name = '${body.Restaurant_Name}' AND Course_Name = '${body.Course_Name}'`;

  console.log(q);
  connection.query(q, (err, rows, fields) => {
    // console.log(rows);
    res.json(rows);
  });
});

// 레스토랑 삭제
router.post('/delRestaurant', (req, res) => {
  console.log('delRestaurant 실행');
  const body = req.body;

  const q = `DELETE FROM Restaurant WHERE Hotel_ID = ${body.Hotel_ID} AND Restaurant_Name = '${body.Restaurant_Name}'`;
  const imageDir = body.Restaurant_Img;

  console.log(imageDir);
  if (imageDir !== '/facilityImage/basicImage') {
    fs.unlink('.' + imageDir, (err) => {
      if (err) {
        console.log('  이미지가 이미 없습니다.');
      }
      console.log('  이미지 파일 삭제 완료');
    });
  } else {
    console.log('  기본 이미지입니다.');
  }

  console.log(q);
  connection.query(q, (err, rows, fields) => {
    // console.log(rows);
    res.json(rows);
  });
});

// 레스토랑의 코스 반환
router.post('/getCourse', (req, res) => {
  console.log('레스토랑 세부 코스 반환');
  const body = req.body;
  // console.log(body);
  const q = `SELECT * FROM Course_Menu WHERE Hotel_ID = ${body.Hotel_ID} AND Restaurant_Name = '${body.Restaurant_Name}'`;

  connection.query(q, (err, rows, fields) => {
    // console.log('레스토랑 삭제완료');
    // console.log(rows);
    res.json(rows);
  });
});

// 레스토랑의 영업시간 반환
router.post('/getOthers', (req, res) => {
  console.log('레스토랑 세부정보 반환');
  const body = req.body;
  // console.log(body);
  const q = `SELECT Open_Time, Close_Time, Available FROM Restaurant WHERE Hotel_ID = ${body.Hotel_ID} AND Restaurant_Name = '${body.Restaurant_Name}'`;

  console.log(q);
  connection.query(q, (err, rows, fields) => {
    // console.log(rows);
    res.json(rows);
  });
});

// 모든(혹은 특정한) 레스토랑 정보 불러오기
router.post('/restaurantInforms', multipartMiddleware, (req, res) => {
  const startTime = new Date();
  console.log('레스토랑 검색을 시작합니다 : ' + startTime);

  const Hotel_ID = req.body.Hotel_ID;
  // const Hotel_ID = undefined;
  let q = '';
  console.log(Hotel_ID);
  if (Hotel_ID === '' || Hotel_ID === null || Hotel_ID === undefined) {
    q = 'SELECT * FROM Restaurant NATURAL JOIN Hotel';
  } else {
    q = `SELECT * FROM Restaurant NATURAL JOIN Hotel WHERE Hotel_ID = ${Hotel_ID}`;
  }

  console.log(q);

  connection.query(q, (err, rows, fields) => {
    // console.log(rows);
    res.json(rows);
  });
});

// 호텔 정보 검색
router.post('/restaurantSearch', multipartMiddleware, (req, res) => {
  const startTime = new Date();
  console.log();
});

/* 이미지 추가를 포함한 레스토랑 추가 */
router.post('/addRestaurant', upload.any(), async (req, res) => {
  const startTime = new Date();
  console.log('레스토랑 추가를 시작합니다 : ' + startTime);

  let image = '/facilityImage/' + 'basicImage';
  let body = req.body;

  if (Object(req.files).length > 0) {
    console.log('  이미지가 존재합니다. 경로를 설정합니다.');
    image = '/facilityImage/' + req.files[0].filename;
  } else {
    console.log('  이미지가 없습니다. 기본 이미지로 설정합니다.');
    delete body.Restaurant_Img;
  }

  // console.log(image);
  body['img'] = image;
  const value = Object.values(body);
  // console.log(value);

  // 레스토랑 추가 쿼리
  // (Restaurant_Name, Hotel_ID, Open_Time, Close_Time, Available, Restaurant_Img)
  const q = `INSERT INTO Restaurant VALUES(?, ?, ?, ?, ?, ?);`;
  console.log(q);

  connection.query(q, value, (err, rows, fields) => {
    // console.log(rows);
    res.json(rows);
  });
});

// 레스토랑 수정
router.post('/modifyRestaurant', (req, res) => {
  const startTime = new Date();
  console.log('레스토랑 변경을 시작합니다 : ' + startTime);

  const body = req.body;

  let queryHeader = `UPDATE Restaurant SET`;
  let queryChange = ``;
  let queryCondition = ` WHERE Hotel_ID = ${body.Hotel_ID} AND Restaurant_Name = '${body.Restaurant_Name}'`;

  // console.log(body);

  if (body.Open_Time !== null && body.Open_Time !== undefined && body.Open_Time !== '') {
    queryChange = queryChange + ` Open_Time = '${body.Open_Time}'`;
  }
  if (body.Close_Time !== null && body.Close_Time !== undefined && body.Close_Time !== '') {
    if (queryChange === ``) {
      queryChange = queryChange + ` Close_Time = '${body.Close_Time}'`;
    } else {
      queryChange = queryChange + ` , Close_Time = '${body.Close_Time}'`;
    }
  }
  if (body.Available !== null && body.Available !== undefined && body.Available !== '') {
    if (queryChange === ``) {
      queryChange = queryChange + ` Available = ${body.Available}`;
    } else {
      queryChange = queryChange + ` , Available = ${body.Available}`;
    }
  }

  if (queryChange === ``) {
    res.send([]);
  } else {
    const q = queryHeader + queryChange + queryCondition;
    console.log(q);
    connection.query(q, (err, rows, fields) => {
      // console.log(rows);
      res.json(rows);
    });
  }
});

router.post('/addCourse', (req, res) => {
  const body = req.body;
  // console.log(body);

  const q = `INSERT INTO Course_Menu VALUES('${body.Course_Name}', ${body.Hotel_ID}, '${body.Restaurant_Name}', ${body.Price_Won},'${body.Appetizer}','${body.Main1}' ,'${body.Main2}', '${body.Dessert}')`;
  console.log(q);
  connection.query(q, (err, rows, fields) => {
    // console.log(rows);
    res.json(rows);
  });
});

// 주차장 검색하기
router.post('/parkinglotInforms', multipartMiddleware, (req, res) => {
  const startTime = new Date();
  console.log('주차장 검색을 시작합니다 : ' + startTime);

  const Hotel_ID = req.body.Hotel_ID;
  // const Hotel_ID = undefined;
  let q = '';
  console.log(Hotel_ID);
  if (Hotel_ID === '' || Hotel_ID === null || Hotel_ID === undefined) {
    q = 'SELECT * FROM Parking_Lot natural join Hotel';
  } else {
    q = `SELECT * FROM Parking_Lot natural join Hotel WHERE Hotel_ID = ${Hotel_ID}`;
  }

  console.log(q);

  connection.query(q, (err, rows, fields) => {
    // console.log(rows);
    res.json(rows);
  });
});

/* 주차장 추가 쿼리 */
router.post('/addParkinglot', multipartMiddleware, async (req, res) => {
  const startTime = new Date();
  console.log('주차장 추가를 시작합니다 : ' + startTime);

  let body = req.body;
  // console.log(image);
  const value = Object.values(body);

  // 주차장 추가 쿼리
  // (ZONE, Hotel_ID, Capacity, Max_Height_in_Meter, Valet_Parking_is_Able)
  const q = `INSERT INTO Parking_Lot VALUES(?, ?, ?, ?, ?);`;

  connection.query(q, value, (err, rows, fields) => {
    // console.log(rows);
    res.json(rows);
  });
});

//고객 삭제
router.get('/parkingdel', async (req, res) => {
  var startTime = new Date();
  console.log('Delete Parking API Start at ' + startTime);
  let ZONE = req.query.ZONE;
  let Hotel_ID = req.query.Hotel_ID;
  const q_parking = `DELETE FROM Parking_Lot WHERE ZONE=? AND Hotel_ID=?;`;

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

  await dbInsert(q_parking, [ZONE, Hotel_ID]);

  res.send();
});

// 주차장 수정
router.post('/modifyParkinglot', (req, res) => {
  var startTime = new Date();
  console.log('주차장을 수정합니다 : ' + startTime);

  const body = req.body;
  const queryHeader = `UPDATE Parking_Lot SET`;
  let queryChange = ``;
  const queryCondition = ` WHERE Hotel_ID = ${body.Hotel_ID} AND ZONE = ${body.ZONE}`;

  delete body.Hotel_ID;
  delete body.ZONE;

  for (let key in body) {
    if (body[key] !== '' && body[key] !== undefined && body[key] !== null) {
      if (queryChange !== ``) {
        queryChange += ` ,`;
      }
      queryChange += ` ${key} = ${body[key]}`;
    }
  }

  const q = queryHeader + queryChange + queryCondition;
  if (queryChange !== ``) {
    console.log(q);
    connection.query(q, (err, rows, fields) => {
      res.send(rows);
    });
  } else {
    console.log('변화가 없습니다.');
    res.send([]);
  }
});

module.exports = router;
