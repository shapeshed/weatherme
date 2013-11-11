var parser = require('../lib/parser'),
  response = require('./fixtures/response'),
  assert = require('assert');

describe('currently method', function () {

  it('should return the correct string', function () {
    assert.strictEqual(parser.currently(response, '°F'), 'It is currently 62°F and Mostly Cloudy');
  });

  it('should set celcius correctly if this is passed in', function () {
    assert.strictEqual(parser.currently(response, '°C'), 'It is currently 62°C and Mostly Cloudy');
  });

});

describe('minutely method', function () {

  it('should return the correct string if the summary argument is set', function () {
    var argv = {};
    argv.s = true;
    assert.strictEqual(parser.minutely(response, '°F', argv), 'Drizzle for the hour.');
  });

});

describe('hourly method', function () {

  it('should return the correct string if the summary argument is set', function () {
    var argv = {};
    argv.s = true;
    assert.strictEqual(parser.hourly(response, '°F', argv), 'Light rain until later this afternoon, starting again tonight.');
  });

  it('should return the correct string ', function () {
    var argv = {};
    console.log(parser.hourly(response, '°F', argv));
    assert.strictEqual(parser.hourly(response, '°F', argv), 'Light rain until later this afternoon, starting again tonight.');
  });

});

describe('daily method', function () {

  it('should return the correct string if the summary argument is set', function () {
    var argv = {};
    argv.s = true;
    assert.strictEqual(parser.daily(response, '°F', argv), 'Light rain off-and-on throughout the week; temperatures falling to 55° on Sunday.');
  });

});
