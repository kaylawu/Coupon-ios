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

        document.addEventListener("deviceready", function() {


            var div = document.getElementById("map_canvas");

            // Initialize the map view
            var map = plugin.google.maps.Map.getMap(div,{
                'backgroundColor': 'black',
                'mapType': plugin.google.maps.MapTypeId.HYBRID,
                'controls': {
                    'compass': true,
                    'myLocationButton': true,
                    'indoorPicker': true,
                    'zoom': true
                },
                'gestures': {
                    'scroll': true,
                    'tilt': true,
                    'rotate': true,
                    'zoom': true
                }
            });

            // Wait until the map is ready status.
            map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
        });

    };

    var onMapReady= function(){

    };



    return{
        scan:scan,
        googlemaps:googlemaps
    }



});