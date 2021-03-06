// Generated by CoffeeScript 1.9.3
var Album, _, cozydb, log;

cozydb = require('cozydb');

_ = require('lodash');

log = require('printit')({
  date: true,
  prefix: 'model:album'
});

module.exports = Album = cozydb.getModel('Album', {
  id: String,
  title: String,
  description: String,
  date: Date,
  orientation: Number,
  coverPicture: String,
  clearance: function(x) {
    return x;
  },
  folderid: String
});

Album.beforeSave = function(data, callback) {
  if (data.title != null) {
    data.title = data.title.replace(/<br>/g, "").replace(/<div>/g, "").replace(/<\/div>/g, "");
  }
  data.date = new Date();
  return callback();
};

Album.createIfNotExist = function(album, callback) {
  return Album.request('byTitle', {
    key: album.title
  }, function(err, albums) {
    var exist;
    if (err != null) {
      return callback(err);
    }
    log.debug(album.title + " check if exist");
    exist = _.find(albums, function(fetchedAlbum) {
      return album.description === fetchedAlbum.description;
    });
    log.debug("exist ? " + (exist != null));
    if (exist != null) {
      log.info(album.title + " already imported");
      return callback(null, exist);
    } else {
      log.info("importing album " + album.title);
      return Album.create(album, callback);
    }
  });
};
