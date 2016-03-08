/**
 * Created by henry on 2/20/16.
 */
'use strict'

define(["jquery"],function($){

    var scan = function()
    {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if(!result.cancelled)
                {
                    if(result.format == "QR_CODE")
                    {
                        alert(result.text);
                    }
                }
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    };


    var googlemaps = function()
    {

            //alert(result);
            var div = document.getElementById("map_canvas");
            var userLocation = new plugin.google.maps.LatLng(localStorage.getItem('userLatitude'),localStorage.getItem('userLongitude'));
            // Initialize the map view
            var map = plugin.google.maps.Map.getMap(div,{
                'backgroundColor': 'black',
                'mapType': plugin.google.maps.MapTypeId.ROADMAP,
                'controls': {
                    'compass': true,
                    'myLocationButton': true,
                    'indoorPicker': true,
                    'zoom': true
                },
                'gestures': {
                    'scroll': true,
                    'tilt': true,
                    'zoom': true
                },'camera': {
                    'latLng': userLocation,
                    'zoom':15
                }
            });

            // Wait until the map is ready status.
            map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);


    };

    var onMapReady= function(){

    };

    var getUserLocation = function(){
        document.addEventListener("deviceready", function() {
            navigator.geolocation.getCurrentPosition(getUserLocationSuccess, getUserLocationError);
        });
    };

    var getUserLocationSuccess = function(position){

        localStorage.setItem('userLatitude',position.coords.latitude);
        localStorage.setItem('userLongitude',position.coords.longitude);
        googlemaps();

    };

    var getUserLocationError = function(error){
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    };
    return{
        scan:scan,
        googlemaps:getUserLocation
    }



});