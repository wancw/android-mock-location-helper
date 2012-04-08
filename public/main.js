function initialize() {

    function updateMapByCurrentPosition(map, position) {
        var coordinates = position.coords;
        var currentLocation = new google.maps.LatLng(
            coordinates.latitude, coordinates.longitude);
        map.setCenter(currentLocation);
        var marker = new google.maps.Marker({
            position: currentLocation,
            map: map
        });
    }

    function getCurrentLocation(map) {
        if (navigator.geolocation) {
            var gl = navigator.geolocation;
            gl.getCurrentPosition(function(p){
                updateMapByCurrentPosition(map,p)});
        }
    }

    var myOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    getCurrentLocation(map);
}
