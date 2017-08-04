var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/music');

var db = mongoose.connection;

db.on('open', () => {
  console.log('db open');
});

db.on('connected', () => {
  console.log('db connected');
});

db.on('error', () => {
  console.log('db error');
});

exports.mongoose = mongoose;