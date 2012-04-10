require 'sinatra/base'
require 'json'

module AdbInterface
  class Application < Sinatra::Base
    configure do
      mime_type :json, "application/json"
    end

    before { content_type :json }

    get '/devices' do
      {
        :status => 'OK',
        :devices => devices
      }.to_json
    end

    post '/device/:name/geo_location' do
      device_name = params[:name]
      longitude = params[:longitude]
      latitude = params[:latitude]

      output = `adb -s #{device_name} emu geo fix #{longitude} #{latitude} 2>&1`

      if output.length > 0
        {
          :status => 'ERROR',
          :error => output.split(/\n/)[0].sub('error: ', '') }.to_json
      end
    end

    def devices
      lines = `adb devices`.split(/\n/)
      lines.delete_at(0)
      lines.map do |line|
        columns = line.split(/\t/)
        { :name => columns[0], :status => columns[1] }
      end
    end
  end
end