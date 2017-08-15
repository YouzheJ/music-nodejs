var Music = require('./../models/Music');
var multiparty = require('multiparty');

exports.musicAdd = function(req, res) { // 增加或修改
  // console.log(req.params.name)
  if(req.params.name) { // 修改
    Music.findByName(req.params.name, (err, obj) => {
      // console.log(err, obj)
      return res.render('music', {
        title: req.params.name,
        data: JSON.stringify(obj)
      });
    });
  }else { // 增加
    return res.render('music', {
      title: '添加',
      data: JSON.stringify({"name":"xxxx"})
    });
  }
}

exports.postMusicAdd = function(req, res) { // 
  try {
    var json = JSON.parse(req.body.content);
    // console.log(json, typeof json)
    if(json._id) { // 更新
      Music.update(json, function(err) {
        if(err) {
          res.send({'success': false, 'msg': err});
        }else {
          res.send({'success': true});
        }
      });
    }else { // 添加
      Music.save(json, function(err) {
        if(err) {
          res.send({'success': false, 'msg': err});
        }else {
          res.send({'success': true});
        }
      });
    }
  }catch(err) {
    console.log(err)
    res.send({'success': false, 'msg': err});
  }
} 

exports.musicList = function(req, res) { // 
  Music.findAll(function(err, obj) {
    if(err) {
      res.send({'success': false, 'msg': err});
    }else {
      // console.log('succ', obj)
      res.send({'success': true, 'data': obj});
    }
  });
} 

exports.musicGet = function(req, res) { // 从文件服务器中获取资源
  console.log('musicGet: name ',req.params.name)
  if(req.params.name) {
    Music.findByName(req.params.name, (err, obj) => {
      console.log(err, obj)
      if(obj) {
        res.send({'success': true, 'data': obj.source});
      }else {
        res.send({'success': true, 'msg': 'not found'});
      }
    });
  }else {
    res.send({'success': false, 'msg': 'name is null'});
  }
} 


exports.musicUpload = function(req, res) { // 上传文件
  var form = new multiparty.Form({uploadDir: './uploads/'});

  form.parse(req, function(err, fields, files) {
    console.log("files: ", files)
    if(err) {
      res.send({'success': false, 'url': 'upload error'});
    }else {
      var url = files.file ? files.file[0].path : '';
      res.send({'success': true, 'msg': 'upload success', url: url.replace('uploads', 'imgs')})
    }
  })
} 