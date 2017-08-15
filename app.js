var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var music = require('./routes/music');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/imgs', express.static(path.join(__dirname, 'uploads')));

app.use('/', index);
app.use('/users', users);

app.get('/music/add', music.musicAdd); // 增加
app.post('/music/add', music.postMusicAdd); // 提交增加
app.get('/music/list', music.musicList); // 获取列表
app.post('/music/upload', music.musicUpload); // 上传文件
app.get('/music/get/:name', music.musicGet); // 获取单个
app.get('/music/:name', music.musicAdd); // 修改(要放到最好，否则会影响上面的路由)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
