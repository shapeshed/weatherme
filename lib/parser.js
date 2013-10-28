var dateUtils = require('date-utils');

var parser = {

  currently: function (data, unit, argv) {
    var out = "It is currently " + Math.round(data.currently.temperature) + unit + ' and ' + data.currently.summary;
    return out;
  },

  minutely: function (data, unit, argv) {
    var out = '';
    if (argv.s) {
      out = data.minutely.summary;
    } else {
      out += 'Time  | Precipitation Intensity % | Precipitation Probability %\n';
      for (var i = 0; i < data.minutely.data.length; i++) {
        var dataObject = data.minutely.data[i];
        var date = new Date(dataObject.time*1000);
        out += date.toFormat("HH24MI") + ' | ' + Math.round(dataObject.precipIntensity * 100) + ' | ' + Math.round(dataObject.precipProbability * 100) + '\n';
      }
    }
    return out;
  },

  hourly: function (data, unit, argv) {
    var out = '';
    if (argv.s) {
      out = data.hourly.summary;
    } else {
      out += 'Time  | ' + unit + ' | Summary\n';
      for (var i = 0; i < data.hourly.data.length; i++) {
        var dataObject = data.hourly.data[i];
        var date = new Date(dataObject.time*1000);
        out += date.toFormat("HH24:SS") + ' | ' + Math.round(dataObject.temperature) + ' | ' + dataObject.summary + '\n';
      }
    }
    return out;
  },

  daily: function (data, unit, argv) {
    var out = '';
    if (argv.s) {
      out = data.daily.summary;
    } else {
      out += 'Date | Max ' + unit + ' | Min ' + unit + ' | Summary\n';
      for (var i = 0; i < data.daily.data.length; i++) {
        var dataObject = data.daily.data[i];
        var date = new Date(dataObject.time*1000);
        out += date.toFormat("DD MMM") + ' | ' + Math.floor(dataObject.temperatureMax) + ' | ' + Math.floor(dataObject.temperatureMin) + ' | ' + dataObject.summary + '\n';
      }
    }
    return out;
  }


};
 
module.exports = parser;
