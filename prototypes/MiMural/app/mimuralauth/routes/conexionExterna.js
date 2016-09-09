var https = require('https');
var fs = require('fs');

var external = {
  publicDataPlanea: function (req, res) {
    var dest = 'datospublicos/planea_basica_2015.xlsx';
    var url = 'https://datos.jalisco.gob.mx/sites/default/files/recursos/archivos/planea_basica_2015_-_escuelas_primarias_y_secundarias.xlsx';
    var download = function (url, dest, cb) {
      var file = fs.createWriteStream(dest);
      var request = https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
          file.close(cb);
        });
      }).on('error', function (err) { 
        fs.unlink(dest);
        if (cb)
          cb(err.message);
      });
    };
    var muralResponse = function (err) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.download(dest, 'planea-loshs.xlsx', function (err) {
          if (err) {
            if (!res.headersSent) {
              res.sendStatus(500);
            }
          }
        });
      }
    };
    download(url, dest, muralResponse);
  }
};
module.exports = external;