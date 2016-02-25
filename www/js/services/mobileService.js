/**
 * Created by henry on 2/20/16.
 */
"use strict"

define([],function(){

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



            // Define a div tag with id="map_canvas"
            var mapDiv = $('#googlemap');
            mapDiv.append('hello world');
//                                  var map = plugin.google.maps.Map.getMap();
//                                  alert(map);


            // Initialize the map plugin
//                                  var map = plugin.google.maps.Map.getMap();
//                                  map.addEventListener(plugin.google.maps.event.MAP_READY, function onMapInit(map) {
//                                                       // The map is initialized, then show a map dialog
//                                                       map.showDialog();
//                                                       });

//
//            // You have to wait the MAP_READY event.
//            map.on(plugin.google.maps.event.MAP_READY, onMapInit);
        });
    };



    return{
        scan:scan,
        googlemaps:googlemaps
    }



});