var https = require('https');

var request = {

  get: function (options, callback) {

    https.get(options, function(res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        callback(null, res, data);
      });

    }).on('error', function(err) {
      callback(err, null, null);
    });
  }

};

module.exports = request;
