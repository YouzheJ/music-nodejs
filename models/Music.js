var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var MusicSchema = new Schema({
  name: String,
  alias: [String],
  publish: Date,
  create_date: { type: Date, default: Date.now },
  images: {
    coverSmall: String,
    coverBig: String,
  },
  source: [{
    source: String,
    link: String,
    quality: String,
    size: String,
    version: String,
    create_date: { type: Date, default: Date.now }
  }]
});

var Music = mongodb.mongoose.model("Music", MusicSchema);
var MusicDAO = function() {};

MusicDAO.prototype.save = function(obj, callback) { // 新增
  var instance = new Music(obj);
  instance.save(function(err) {
    callback(err);
  });
}

MusicDAO.prototype.update = function(obj, callback) { // 更新（未实现）
  var instance = new Music(obj);
  instance.save(function(err) {
    callback(err);
  });
}

MusicDAO.prototype.findByName = function(name, callback) { // 按name查找
  Music.findOne({name: name}, function(err, obj) {
    callback(err, obj);
  });
}

MusicDAO.prototype.findAll = function(callback) { // 查找所有
  Music.find({}, function(err, obj) {
    callback(err, obj);
  });
}

module.exports = new MusicDAO();