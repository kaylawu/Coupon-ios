/**
 * Created by henry on 2/20/16.
 */
'use strict';

define(["jquery", '../services/frameworkService', '../services/googlemapService'], function ($, Framework7, service) {

    var theApp = Framework7.theApp;

    var mainView = Framework7.mainView;


    var baseUrl = "http://47.88.30.91:8080/CouponManagementSystem/";
    var imgBaseUrl = 'http://47.88.30.91:8080';
    var $$ = Dom7;
    var scan = function () {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (!result.cancelled) {
                    if (result.format == "QR_CODE") {
                        localStorage.setItem("scanCouponId", result.text);
                        window.location.href = "scanVoucher.html";
                    }
                }
            },
            function (error) {
                theApp.alert("Scanning failed: " + error);
            }
        );
    };

    var scanUser = function () {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (!result.cancelled) {
                    if (result.format == "QR_CODE") {
                        localStorage.setItem("scanUsername", result.text);
                        window.location.href = "scanUser.html";
                    }
                }
            },
            function (error) {
                alert("Scanning failed: " + Error);
            }
        );
    };

    var googlemaps = function () {

        //alert(result);
        var div = document.getElementById("map_canvas");
        var userLocation = new plugin.google.maps.LatLng(localStorage.getItem('userLatitude'), localStorage.getItem('userLongitude'));
        // Initialize the map view
        var map = plugin.google.maps.Map.getMap({

            'mapType': plugin.google.maps.MapTypeId.ROADMAP,
            'controls': {
                'compass': true,
                'myLocationButton': true,
                'zoom': true
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'zoom': true
            }, 'camera': {
                'latLng': userLocation,
                'zoom': 13
            }
        });

        // Wait until the map is ready status.
        map.addEventListener(plugin.google.maps.event.MAP_READY, function (map) {
            map.setBackgroundColor('white');
            map.setDiv(div);
            getInitDataByRadius(map);
            theApp.onPageBack('mapview', function () {
                map.remove();
            });

            $$(".infinite-scroll").on('infinite', refreshPageByRadius(map));
        });
    };

    var getInitDataByRadius = function (map) {

        service.getMerchantCountbyRadius();
        var tid = setInterval(pageLoading, 1000);

        function pageLoading() {

            if (localStorage.getItem("AllMerchantsByRadius") !== null) {
                clearInterval(tid);
                alert('mechants number is :' + localStorage.getItem("AllMerchantsByRadius"));
                if (localStorage.getItem("AllMerchantsByRadius") > 0) {

                    //Init home page mechants
                    if (localStorage.getItem("AllMerchantsByRadius") <= 6) {
                        service.getInitMerchantsAllByRadius(localStorage.getItem("AllMerchantsByRadius"), 0, map);
                        //remove infinite scroll listener
                        theApp.detachInfiniteScroll($$('.infinite-scroll'));
                        $$('.infinite-scroll-preloader').remove();
                    } else {
                        service.getInitMerchantsAllByRadius(6, 0, map);
                    }
                }
            }
        }
    };

    var refreshPageByRadius = function (map) {

        var username = localStorage.getItem("username");

        // Last loaded index
        var lastIndex = $$('.allMerchantsByRadius li').length;

        var maxItems = localStorage.getItem('AllMerchantsByRadius');

        // Append items per load
        var itemsPerLoad = 5;

        // Exit, if loading in progress
        if (JSON.parse(localStorage.getItem("merchantAllScroll"))) return;
        // Set loading flag

        localStorage.setItem("merchantAllScroll", true);

        if (maxItems - lastIndex >= itemsPerLoad) {
            service.getFreshMechantsAll(itemsPerLoad, lastIndex, map);

        } else {
            service.getFreshMechantsAll(maxItems - lastIndex, lastIndex, map);
        }

    };
    var googlemapForShopDetail = function (a, l) {


        document.addEventListener("deviceready", function () {

            var div = document.getElementById("map_canvas1");
            var shopLocation = new plugin.google.maps.LatLng(a, l);
            // Initialize the map view
            var map = plugin.google.maps.Map.getMap();

            // Wait until the map is ready status.
            map.addEventListener(plugin.google.maps.event.MAP_READY, function (map) {
                map.setBackgroundColor('white');
                map.setDiv(div);
                map.moveCamera({
                    'target': shopLocation,
                    'zoom': 15
                });

                map.addMarker({
                    'position': new plugin.google.maps.LatLng(a, l)

                }, function (marker) {
                    marker.showInfoWindow();
                });

                $$('#btnredeem').click(coupon.redeemCoupon);
                $$('#info-tab').on('show', function () {
                    map.setVisible(false);
                });

                $$('#offers-tab').on('show', function () {
                    map.setVisible(false);
                });

                $$('#location-tab').on('show', function () {
                    map.setVisible(true);

                });

                theApp.onPageBack('shopdetail', function () {
                    map.remove();
                });

            });
        });

    };


    var getUserLocation = function () {
        document.addEventListener("deviceready", function () {
            navigator.geolocation.getCurrentPosition(getUserLocationSuccess, getUserLocationError);
        });
    };

    var getUserLocationSuccess = function (position) {

        localStorage.setItem('userLatitude', position.coords.latitude);
        localStorage.setItem('userLongitude', position.coords.longitude);
        googlemaps();

    };

    var getUserLocationError = function (error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    };

    var updateImageFromLibrary = function () {



        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto,
            function (message) {
               console.log('get image fail');
            },
            {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            }
        );

    };

    function uploadPhoto(imageURI) {
        alert('into upload function');
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI(baseUrl+"user/updateprofilepic"), win, fail, options);
    }

    function win(r) {
        //console.log("Code = " + r.responseCode);
        //console.log("Response = " + r.response);
        //console.log("Sent = " + r.bytesSent);
        alert('success');
    }

    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
        //console.log("upload error source " + error.source);
        //console.log("upload error target " + error.target);
    }

    var updateImageFromCamera = function(){

        //// Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto,
            function (message) {
                console.log('get image fail');
            },
            {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.CAMERA
            }
        );
    };


    return {
        scan: scan,
        scanUser: scanUser,
        googlemaps: getUserLocation,
        googlemapForShopDetail: googlemapForShopDetail,
        updateImageFromLibrary: updateImageFromLibrary,
        updateImageFromCamera:updateImageFromCamera
    }


});