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

// app.get('/api/hello', (req, res) => {
//   connection.query('SELECT * FROM CUSTOMER', (err, rows, fileds) => {
//     res.send(rows);
//   });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
