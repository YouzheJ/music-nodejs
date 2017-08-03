import mongodb from 'mongodb'
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
module.exports = new MusicDAO();