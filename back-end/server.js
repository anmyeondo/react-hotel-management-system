// import
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

// 라우터
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customers');
var staffsRouter = require('./routes/staffs');
var reservationRouter = require('./routes/reservations');
var testRouter = require('./routes/test');
var roomsRouter = require('./routes/rooms');
var facilityRouter = require('./routes/facility');

// 포트 정보 설정
var port = process.env.PORT || 5000;

// Express 서버 실행
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', express.static('./image'));
app.use(
  session({
    key: 'userid',
    secret: 'abc',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 500,
    },
  }),
);

// 라우터 정보 등록
app.use('/modules', indexRouter);
app.use('/users', usersRouter);
app.use('/customers', customersRouter);
app.use('/staffs', staffsRouter);
app.use('/reservations', reservationRouter);
app.use('/test', testRouter);
app.use('/rooms', roomsRouter);
app.use('/facility', facilityRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log(`${port}번 포트에 연결되어 있습니다.`));

module.exports = app;
