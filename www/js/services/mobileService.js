/**
 * Created by henry on 2/20/16.
 */
'use strict';

define(["jquery",'../services/frameworkService'],function($,Framework7){

    var theApp = Framework7.theApp;

    var mainView = Framework7.mainView;

    var $$ = Dom7;
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

    var scanUser = function()
    {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (!result.cancelled) 
                {
                    if (result.format == "QR_CODE") 
                    {
                        var username = result.text;
                        getUserProfile(username);
                        window.location.replace("scanUser.html");
                    };
                };
            }

            function (error) {
                alert("Scanning failed: " + Error);
            }
        );
    };

    var getUserProfile = function(username){
        $.ajax({
            url:baseUrl+"/user/getprofile",
            type:"POST",
            data:{username:username},
            success:getUserProfileSuccess,
            error:getUserProfileError
    });

    var getUserProfileSuccess = function(data){
        localStorage.setItem("userProfile",JSON.stringify(data));
        theApp.hidePreloader();
    };

    var getUserProfileError = function(data){
        theApp.hidePreloader();
        theApp.alert("System Error", "Warning");
        console.log(data);
    };

    var googlemaps = function()
    {
            //alert(result);
            var div = document.getElementById("map_canvas");
            var userLocation = new plugin.google.maps.LatLng(localStorage.getItem('userLatitude'),localStorage.getItem('userLongitude'));
            // Initialize the map view
            var map = plugin.google.maps.Map.getMap(div,{

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
                    'zoom':13
                }
            });

            // Wait until the map is ready status.
            map.addEventListener(plugin.google.maps.event.MAP_READY, function(map){
                //map.setDiv(div);
                theApp.onPageBack('mapview',function(){

                    map.remove();
                });
            });

    };


    var googlemapForShopDetail = function(a,l){
        //alert(result);
        alert(a+l);
        document.addEventListener("deviceready", function() {

            var div = document.getElementById("map_canvas1");
            var shopLocation = new plugin.google.maps.LatLng(a, l);
            // Initialize the map view
            var map = plugin.google.maps.Map.getMap();

            // Wait until the map is ready status.
            map.addEventListener(plugin.google.maps.event.MAP_READY, function(map){
                map.setDiv(div);
                map.setBackgroundColor('white');
                map.moveCamera({
                    'target':shopLocation,
                    'zoom':15
                });

                map.addMarker({
                    'position': new plugin.google.maps.LatLng(a, l)

                }, function(marker) {
                    marker.showInfoWindow();
                });
                $$('#info-tab').on('show', function () {
                    map.setVisible(false);
                });

                $$('#offers-tab').on('show', function () {
                    map.setVisible(false);
                });

                $$('#location-tab').on('show', function () {
                    map.setVisible(true);
                    mao.refreshLayout();
                });

                theApp.onPageBack('shopdetail',function(){

                    map.remove();
                });

            });
        });

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
        scanUser:scanUser,
        getUserProfile:getUserProfile,
        googlemaps:getUserLocation,
        googlemapsForShopDetail:googlemapForShopDetail

    }



});