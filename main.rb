require 'bundler/setup'
require 'sinatra'

get "/" do
  INDEX
end

INDEX=<<INDEX
  <html>
    <head>
      <title>Android Emulator Mock Location Helper</title>
    </head>
    <body>
      <h1>Start here!</h1>
    </body>
  </heml>
INDEX
