# Weatherme

Weatherme is a simple command line tool to show weather from forecast.io

## Installation

    npm install -g weatherme

## Usage

Set a forecast.io token and a long / lat with environment variables

    export KEY=17b1e3cae7b68e290654b438553def7e
    export LATLON=51.8498698,-0.6637842

Then get the weather with

    weatherme

## Options

    -h --help # show help
    -c        # show temperature in Celsius

For more see `man weatherme`.
