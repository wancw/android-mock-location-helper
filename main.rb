require 'sinatra/base'

module Main
  class Application < Sinatra::Base
    get '/' do
      redirect "/index.html"
    end
  end
end