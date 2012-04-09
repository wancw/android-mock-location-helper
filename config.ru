require 'bundler/setup'

$LOAD_PATH << '.'

require 'adb_interface'
require 'main'

map '/adb' do
  run AdbInterface::Application
end

run Main::Application
