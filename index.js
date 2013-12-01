#!/usr/bin/env node

var request = require('request'),
  argv = require('optimist').argv,
  parser = require('./lib/parser'),
  unit = (process.env.WEATHERME_UNITS !== 'us' || argv.c) ? '°C' : '°F',
  key = argv.k || process.env.KEY || null,
  latLon = argv.l || process.env.LATLON || null;

var help = "Usage: weatherme [OPTION]\n\
Show weather from forecast.io based on [OPTION].\n\
  -c\t\t\tDisplay temperature in Celsius\n\
  -m\t\t\tDisplay minutely data\n\
  -h\t\t\tDisplay hourly data\n\
  -d\t\t\tDisplay daily data\n\
  -s\t\t\tDisplay only a summary\n\
  -k=KEY\t\tThe forecast.io api key\n\
  -l=LATLON\t\tThe long lat co-ordinates for the location";

if (argv.help) {
  console.log(help);
  process.exit(0);
}

if ((key === null) || latLon === null)  {
  console.error('Missing forecast.io API key and lat/lon co-ordinates');
  console.error(help);
  process.exit(1);
}

var apiEndPoint = 'https://api.forecast.io/forecast/' + key + '/' + latLon;

if (argv.c) {
  apiEndPoint += '?units=si';
} else if (process.env.WEATHERME_UNITS) {
  apiEndPoint += '?units=' + process.env.WEATHERME_UNITS;
}

request.get(apiEndPoint, function(err, res, body) {
  if (err) { throw err; }

  if (res.statusCode !== 200) {
    console.error('Unexpected status code from forecast.io -> ' + res.statusCode);
    process.exit(1);
  }

  try {
    var data = JSON.parse(body);
    if (argv.m) {
      console.log(parser.minutely(data, unit, argv));
    } else if (argv.h) {
      console.log(parser.hourly(data, unit, argv));
    } else if (argv.d) {
      console.log(parser.daily(data, unit, argv));
    } else {
      console.log(parser.currently(data, unit, argv));
    }
    process.exit(0);
  } catch (e) {
    console.log(e);
    console.error('unabled to parse weather data');
    process.exit(1);
  }

});
