(function($) {

    var initMap = function (id) {
        var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        return new google.maps.Map(document.getElementById(id), mapOptions);
    };

    var lastestLocation;

    var displayCurrentPosition = function(latLng) {
        lastestLocation = latLng;
        $('#longitude_info').text(latLng.lng());
        $('#latitude_info').text(latLng.lat());
    };

    var updateMapByCurrentPosition = function (map, position) {
        var coordinates = position.coords;
        var currentLocation = new google.maps.LatLng(
            coordinates.latitude, coordinates.longitude);
        map.setCenter(currentLocation);
        displayCurrentPosition(currentLocation);
        var marker = new google.maps.Marker({
            position: currentLocation,
            draggable: true,
            map: map
        });

        google.maps.event.addListener(map, 'rightclick', function(event) {
            marker.setPosition(event.latLng);
        });

        google.maps.event.addListener(marker, 'position_changed', function() {
            displayCurrentPosition(marker.getPosition());
        });
    }

    var showCurrentLocation = function(map, callback) {
        var gl = navigator.geolocation;
        gl.getCurrentPosition(function(p){
            callback(map,p)
        });
    };

    var initRefreshDeviceListButton = function (btn) {
        btn.click(function () {
            btn.button('loading');
            $('#device_list').parent().hide();
            $('#device_list').empty();

            $.getJSON('/adb/devices', function(data) {
                var hasEmulators = false;
                if (data.devices) {
                    var html = $.map(data.devices, function(e,i){
                        if (e.name.indexOf('emulator-') == 0) {
                            hasEmulators = true;
                            return ['<li><a>', e.name, '</a></li>'].join('');
                        } else {
                            return '';
                        }
                    }).join('');
                    $('#device_list').append(html);
                    $('#device_list li:eq(0) a').click();
                }
                $('#send_to_device').attr('disabled', !hasEmulators);
                $('#device_list').parent().show();
                btn.button('reset');
            });
        });
    };

    var initSendToDeviceButton = function (btn) {
        btn.click(function () {
            btn.button('loading');
            var device_name = $('#device_list li.active a').text();

            if (!lastestLocation || device_name.length <= 0) {
                return;
            }

            var data = {
                latitude: lastestLocation.lat(),
                longitude: lastestLocation.lng()
            };

            $.post('/adb/device/' + device_name + '/geo_location', data,
                function() { btn.button('reset'); });
        });
    };

    var initialize = function () {
        var map = initMap("map_canvas");

        showCurrentLocation(map, updateMapByCurrentPosition);

        $('#device_list').on('click', 'li a', function (event) {
            $('#device_list li').removeClass('active');
            $(this).parent().addClass('active');
        });

        initRefreshDeviceListButton($("#refresh_device_list"));
        $("#refresh_device_list").click();

        initSendToDeviceButton($("#send_to_device"));
    };

    $(initialize);

})(window.jQuery);