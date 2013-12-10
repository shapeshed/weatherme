# Weatherme

[![Build Status](https://secure.travis-ci.org/shapeshed/weatherme.png)](http://travis-ci.org/shapeshed/weatherme)
[![Code Climate](https://codeclimate.com/repos/52813f607e00a4097e0f98de/badges/a9ac9377fa3fb672affa/gpa.png)](https://codeclimate.com/repos/52813f607e00a4097e0f98de/feed)

Weatherme is a simple command line tool to show weather from forecast.io

## Installation

    npm install -g weatherme

## Options

    --help    # show help
    -u        # set forecast.io units - us, uk, ca, si or auto
    -m        # display minutely data
    -h        # display hourly data
    -d        # display daily data
    -s        # display only a summary
    -k apikey # the forecast.io api key. This may also be set by the WEATHERME_KEY environment variable
    -l latlog # the long lat co-ordinates for the location. This may also be set by the WEATHERME_LATLON environment
    variable

    you can set the default temperature by setting the WEATHERME_UNITS to one of: us, si, ca, uk, auto

For more see `man weatherme`.

## Usage

Get a [forecast.io api key][1] and the [lat-long co-ordinates][2] for the location you want.

    ♣ weatherme -k 17b1e3cae7b68e290654b438553def7e -l 51.8498698,-0.6637842

Data is separated by the pipe symbol allowing formatting by a range of UNIX tools. In this example the API key and lat long co-ordinates are set as environment variables and piped to the [column][3] command.

    ♣ export WEATHERME_KEY=17b1e3cae7b68e290654b438553def7e
    ♣ export WEATHERME_LATLON=51.8498698,-0.6637842
    ♣ weatherme -cd | column -s '|' -t
    Date      Max °C    Min °C    Summary
    28 Oct    15        8         Windy in the morning, with rain until afternoon.
    29 Oct    10        6         Partly cloudy in the morning.
    30 Oct    12        4         Mostly cloudy starting in the afternoon.
    31 Oct    12        9         Mostly cloudy throughout the day.
    01 Nov    12        8         Light rain starting in the afternoon.
    02 Nov    13        8         Light rain in the evening.
    03 Nov    12        8         Drizzle in the evening.
    04 Nov    9         6         Light rain until afternoon.

## Examples

These examples assume the environment variables WEATHERME_KEY and WEATHERME_LATLON have been set.

### Show a summary of current weather

    ♣ weatherme
    It is currently 53°F and Partly Cloudy

### Show a summary of current weather in Celsius

    ♣ weatherme -c
    It is currently 11°C and Partly Cloudy

### Show a table of minutely data

    ♣  weatherme -m | column -s '|' -t
    Time     Precipitation Intensity %    Precipitation Probability %
    1501     11                           2
    1502     12                           3
    1503     10                           1
    1504     12                           2
    1505     13                           2
    1506     15                           2
    1507     19                           2

### Show a minutely summary

    ♣  weatherme -ms                  
    Drizzle starting in 45 min., stopping 11 min. later.

### Show a table of hourly data

    ♣  weatherme -h | column -s '|' -t 
    Time     °F    Summary
    15:00    53    Partly Cloudy
    16:00    52    Drizzle
    17:00    51    Partly Cloudy
    18:00    49    Partly Cloudy
    19:00    48    Clear
    20:00    47    Partly Cloudy
    21:00    47    Partly Cloudy
    22:00    47    Partly Cloudy

### Show an hourly summary

    ♣  weatherme -hs
    Partly cloudy until tomorrow morning.

### Show a table of daily data

    ♣  weatherme -d | column -s '|' -t
    Date      Max °F    Min °F    Summary
    28 Oct    60        46        Windy in the morning, with rain until afternoon.
    29 Oct    51        43        Partly cloudy in the morning.
    30 Oct    55        40        Mostly cloudy starting in the afternoon.
    31 Oct    55        49        Mostly cloudy throughout the day.
    01 Nov    54        46        Light rain starting in the afternoon.
    02 Nov    56        47        Light rain in the evening.
    03 Nov    53        47        Drizzle in the evening.
    04 Nov    49        43        Light rain until afternoon.

### Show an daily summary

    ♣  weatherme -ds
    Light rain off-and-on throughout the week; temperatures falling to 51° tomorrow.

[1]: https://developer.forecast.io/
[2]: http://dbsgeo.com/latlon/
[3]: http://linux.die.net/man/1/column
