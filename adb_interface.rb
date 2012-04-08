require 'sinatra/base'

module AdbInterface
  class Application < Sinatra::Base
    configure do
      mime_type :json, "application/json"
    end

    before { content_type :json }

    get '/adb/devices' do
      devices.to_json
    end

    def devices
      lines = `adb devices`.split(/\n/)
      lines.delete_at(0)
      lines.inject({}) do |devices, line|
        columns = line.split(/\t/)
        devices[columns[0]] = columns[1]
        devices
      end
    end
  end
end