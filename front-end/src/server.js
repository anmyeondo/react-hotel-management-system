const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE와 연동
const data = fs.readFileSync('./database.json'); // 해당 파일 읽어옴
const conf = JSON.parse(data); // 해당 파일 파싱
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect();

app.listen(port, () => console.log(`Listening on port ${port}`));
