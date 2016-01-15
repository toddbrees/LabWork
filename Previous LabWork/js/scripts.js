angular.module('geolocation', [])
    .controller('googlemapoutput', function ($scope) {

            var map;
            var mapOptions;
            var directionsDisplay = new google.maps.DirectionsRenderer({
                draggable: true
            });
            var directionsService = new google.maps.DirectionsService();

            $scope.initialize = function () {
                navigator.geolocation.getCurrentPosition(function (position) {

                    var pos = new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude);

                    var mapOptions = {
                        zoom: 16,
                        center: pos
                    };
                    document.getElementById('startlocation')=pos.toString;

                    map = new google.maps.Map(document.getElementById('map-canvas'),
                        mapOptions);

                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map
                    });

                });
                //intialize weather here

            };
            //here
            $scope.calcRoute = function () {
                var end = document.getElementById('endlocation').value;
                var start = document.getElementById('startlocation').value;

                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setMap(map);
                        directionsDisplay.setDirections(response);
                        console.log(status);
                    }

                });

            };

  
            $scope.getWeather = function () {
                var origin = document.getElementById('startlocation').value;
                var destination = document.getElementById('endlocation').value;
                $http.get('http://api.wunderground.com/api/36b799dc821d5836/conditions/q/' + origin + '.json').success(function (sourcedata) {
                    console.log(sourcedata);
                    originTemp = sourcedata.current_observation.temp_f;
                    originIcon = sourcedata.current_observation.icon_url;
                    originWeather = sourcedata.current_observation.weather;
                    console.log(originTemp);
                    $scope.originWeather = $sce.trustAsHtml("<p><b>At starting point</b><br>Currently " + originTemp + "&deg; F and " + originWeather + "</p>");
                    $scope.originIcon = $sce.trustAsHtml("<img src='" + originIcon + "'/>");
                })
                $http.get('http://api.wunderground.com/api/36b799dc821d5836/conditions/q/' + destination + '.json').success(function (destinationdata) {
                    console.log(destinationdata);
                    destTemp = destinationdata.current_observation.temp_f;
                    destIcon = destinationdata.current_observation.icon_url;
                    destWeather = destinationdata.current_observation.weather;
                    console.log(destTemp);
                    $scope.destinationWeather = $sce.trustAsHtml("<p><b>At destination point</b><br>Currently " + destTemp + " &deg; F and " + destWeather + "</p>")
                    $scope.destIcon = $sce.trustAsHtml("<img src='" + destIcon + "'/>")
                });
            };
        
        google.maps.event.addDomListener(window, 'load', $scope.initialize);

    });

function check() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username.length >= 1 && password.length >= 1) {
        localStorage.setItem("Name", username);
        document.getElementById("demo").innerHTML = "<center><b>WELCOME" + " <h1>" + username + "</h1></b></center>";

        location.href = "main.html";
    } else {
        alert("username or password is empty");
    }
}

function register() {

    location.href = "register.html";

}