## Android Mock Location Helper (AMLH)

AMLH is a tool sends mock GPS location to Android emulator.

![screenshot](http://f.cl.ly/items/1J2y080G2b2P3D0E1R0a/Screen%20shot%202012-04-12%20at%20%E4%B8%8A%E5%8D%8811.42.38.png "screenshot")

## Requirements

Server:

  * Ruby 1.9.3+
  * Sinatra (will be installed by Bundler)
  
Client:

  * Browser supports HTML5

## Install

    git clone https://github.com/wancw/android-mock-location-helper.git
    cd android-mock-location-helper
    bundle install

## Usage

    # Make sure that <android_sdk>/platform-tools is in your PATH.

    cd <root of android-mock-location-helper>
    bundle exec rackup

    # Open http://localhost:9292/ in your browser.
