## Android Mock Location Helper (AMLH)

AMLH is a tool sends mock GPS location to Android emulator.

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

    rackup

    # Open http://localhost:9292/ in browser.
