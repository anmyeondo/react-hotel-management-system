const fs = require('fs'); // for reading file
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect db
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect(); // connect db

// 라우터
const router = express.Router();

app.get('/api/adminpage/login', (req, res) => {
  const q = 'SELECT * FROM customer WHERE name = ' + '"KSH"';
  console.log(q);
  connection.query(q, (err, rows, fileds) => {
    res.send(rows);
    console.log(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
