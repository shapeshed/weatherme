#!/usr/bin/env node

var request = require('./lib/request'),
  unit = '°F',
  args = process.argv.splice(2),
  key = process.env.KEY || null,
  latLon = process.env.LATLON || null;

if ((args.indexOf('--help') !== -1) || (args.indexOf('-h') !== -1)) {
  var help = "Usage: weatherme [OPTION]\n\
  Show weather from forecast.io based on [OPTION].\n\
  -c\tDisplay temperature in Celsius";

  console.log(help);
  process.exit(0);
}

if ((key === null) || latLon === null)  {
  console.error('Missing forecast.io API key and lat/lon co-ordinates');
  console.error('Usage: KEY=17b1e3cae7b68e290654b438553def7e LATLON=51.8498698,-0.6637842 weatherme');
  process.exit(1);
}

var options = {
  host: 'api.forecast.io',
  path: '/forecast/' + key + '/' + latLon
};

if (args.indexOf('-c') !== -1) {
  options.path = options.path + '?units=si';
  unit = '°C';
}

request.get(options, function(err, res, body) {
  if (err) { throw err; }

  if (res.statusCode !== 200) {
    console.error('Unexpected status code from forecast.io -> ' + res.statusCode);
    process.exit(1);
  }

  try {
    var data = JSON.parse(body);
    console.log("It is currently " + data.currently.temperature + unit + ' and ' + data.currently.summary);
    process.exit(0);

  } catch (e) {
    console.error('unabled to parse weather data');
    process.exit(1);
  }

});
