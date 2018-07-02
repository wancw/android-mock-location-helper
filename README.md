**This project is no longer maintained. Use at your own risk.**

## Android Mock Location Helper

A Web interface sends mock GPS location to Android emulator.

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
