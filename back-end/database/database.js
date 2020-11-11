// import
const fs = require('fs');
const bodyParser = require('body-parser');
var mysql = require('mysql');

const data = fs.readFileSync('./database/database.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

connection.connect(function (err) {
  if (err) {
    console.error(err.stack);
    return;
  }
  console.log('DB');
});

module.exports = connection;
