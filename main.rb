require 'sinatra/base'
require 'adb_interface'

module Main
  class Application < Sinatra::Base
    use AdbInterface::Application
  end
end