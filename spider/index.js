const cheerio = require('cheerio');
const originRequest = require('request');
const iconv = require('iconv-lite');
const Promise = require('bluebird');

var headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Inter Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

function request (url, callback) {
  var options = {
    url: url,
    encoding: null,
    haders: headers
  }
  originRequest(options, callback);
}

function getWYMuisc () {
  request('http://music.163.com', function (err, res, body) {
    if(err) {
      console.log('Error: ' + err);
      return false;
    }
    const result = body.toString('utf8');
    const $ = cheerio.load(result);
    let itemList = $('#discover-module .m-cvrlst').find('.dec');
  console.log(itemList);
    itemList.map(function (idx, el) {
      console.log($(el).text());
    });

  });
}

getWYMuisc();

