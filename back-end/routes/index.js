var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(JSON.stringify({ message: 'respond with a resource' }));
});

module.exports = router;
