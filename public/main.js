(function($) {

    var initMap = function (id) {
        var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        return new google.maps.Map(document.getElementById(id), mapOptions);
    };

    var updateMapByCurrentPosition = function (map, position) {
        var coordinates = position.coords;
        var currentLocation = new google.maps.LatLng(
            coordinates.latitude, coordinates.longitude);
        map.setCenter(currentLocation);
        var marker = new google.maps.Marker({
            position: currentLocation,
            map: map
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
            $('#device_list li').not('.nav-header').remove();

            $.getJSON('/adb/devices', function(data) {
                if (data.devices) {
                    var html = $.map(data.devices, function(e,i){
                        if (e.name.indexOf('emulator-') == 0) {
                            return ['<li><a>', e.name, '</a></li>'].join('');
                        } else {
                            return '';
                        }
                    }).join('');
                    $('#emulators-header').after(html);
                    $('#device_list li[class!="nav-header"]:eq(0) a').click();
                }
                $('#device_list').parent().show();
                btn.button('reset');
            });
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
    };

    $(initialize);

})(window.jQuery);