# Weatherme

Weatherme is a simple command line tool to show weather from forecast.io

## Installation

    npm install -g weatherme

## Usage

You need a forecast.io token. You can get one from the forecast.io [developer site][1].

You need the latitude and longitude co-ordinates for the location you want.

    curl "http://maps.googleapis.com/maps/api/geocode/json?address=Cheddington,UK&sensor=true"

If you prefer a GUI for this you can also use [Get Lat Lon][2].

With a token and lat lon co-ordinates you do 

    KEY=17b1e3cae7b68e290654b438553def7e LATLON=51.8498698,-0.6637842 weatherme

If you don't want to type these each time add them as permanent environment variables to your shell. 

## Options

    -h --help # show help
    -c        # show temperature in Celsius

For more see `man weatherme`.
    
[1]: https://developer.forecast.io/
[2]: http://dbsgeo.com/latlon/
