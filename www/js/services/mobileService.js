/**
 * Created by henry on 2/20/16.
 */
'use strict';

define(["jquery", '../services/frameworkService', '../services/couponService'], function ($, Framework7, coupon) {

    var theApp = Framework7.theApp;

    var mainView = Framework7.mainView;


    var baseUrl = "http://47.88.30.91:8080/CouponManagementSystem/";
    var imgBaseUrl = 'http://47.88.30.91:8080/';
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

    //var googlemapInit = function(){
    //
    //    var userLocation = new plugin.google.maps.LatLng(localStorage.getItem('userLatitude'), localStorage.getItem('userLongitude'));
    //    var map = plugin.google.maps.Map.getMap();
    //    theApp.onPageBack('mapview', function () {
    //        alert('delete map');
    //        map.remove();
    //    });
    //
    //        map.setBackgroundColor('white');
    //        map.setDiv(div);
    //
    //};
    var googlemaps = function (a, l, map) {

        // Initialize the map view


        map.addMarker({
            'position': new plugin.google.maps.LatLng(a, l)

        }, function (marker) {
            marker.showInfoWindow();
        });

    };

    //var getInitDataByRadius = function (map) {
    //
    //    service.getMerchantCountbyRadius();
    //    var tid = setInterval(pageLoading, 1000);
    //
    //    function pageLoading() {
    //
    //        if (localStorage.getItem("AllMerchantsByRadius") !== null) {
    //            clearInterval(tid);
    //            alert('mechants number is :' + localStorage.getItem("AllMerchantsByRadius"));
    //            if (localStorage.getItem("AllMerchantsByRadius") > 0) {
    //
    //                //Init home page mechants
    //                if (localStorage.getItem("AllMerchantsByRadius") <= 6) {
    //                    service.getInitMerchantsAllByRadius(localStorage.getItem("AllMerchantsByRadius"), 0, map);
    //                    //remove infinite scroll listener
    //                    theApp.detachInfiniteScroll($$('.infinite-scroll'));
    //                    $$('.infinite-scroll-preloader').remove();
    //                } else {
    //                    service.getInitMerchantsAllByRadius(6, 0, map);
    //                }
    //            }
    //        }
    //    }
    //};

    //var refreshPageByRadius = function (map) {
    //
    //    var username = localStorage.getItem("username");
    //
    //    // Last loaded index
    //    var lastIndex = $$('.allMerchantsByRadius li').length;
    //
    //    var maxItems = localStorage.getItem('AllMerchantsByRadius');
    //
    //    // Append items per load
    //    var itemsPerLoad = 5;
    //
    //    // Exit, if loading in progress
    //    if (JSON.parse(localStorage.getItem("merchantAllScroll"))) return;
    //    // Set loading flag
    //
    //    localStorage.setItem("merchantAllScroll", true);
    //
    //    if (maxItems - lastIndex >= itemsPerLoad) {
    //        service.getFreshMechantsAll(itemsPerLoad, lastIndex, map);
    //
    //    } else {
    //        service.getFreshMechantsAll(maxItems - lastIndex, lastIndex, map);
    //    }
    //
    //};
    var googlemapForShopDetail = function (a, l) {


        document.addEventListener("deviceready", function () {

            var div = document.getElementById("map_canvas1");
            var shopLocation = new plugin.google.maps.LatLng(a, l);
            // Initialize the map view
            var map = plugin.google.maps.Map.getMap();
            theApp.onPageBack('shopdetail', function () {
                map.remove();
            });

            // Wait until the map is ready status.
            map.addEventListener(plugin.google.maps.event.MAP_READY, function (map) {
                map.setDiv(div);
                map.setBackgroundColor('white');
                map.moveCamera({
                    'target': shopLocation,
                    'zoom': 15
                });

                map.addMarker({
                    'position': new plugin.google.maps.LatLng(a, l)

                }, function (marker) {
                    marker.showInfoWindow();
                });

                $$('#btnredeem').click(coupon.userRedeemCoupon);

                $$('#info-tab').on('show', function () {
                    map.setVisible(false);
                });

                $$('#offers-tab').on('show', function () {
                    map.setVisible(false);
                });

                $$('#location-tab').on('show', function () {
                    map.setVisible(true);

                });


            });
        });

    };


    var updateImageFromLibrary = function () {



        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto,
            function (message) {
                console.log('get image fail');
            },
            {
                quality: 1,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            }
        );

    };

    function uploadPhoto(imageURI) {
        theApp.showPreloader();
        var options = new FileUploadOptions();
        options.fileKey = "photoPath";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        var params = {};
        params.username = localStorage.getItem('username');
        options.params = params;
        var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI(baseUrl + "user/updateprofilepic"), win, fail, options);
    }

    function win(data) {
        theApp.hidePreloader();
        if (data.response.result == 'error') {
            theApp.alert('upload image failed, please try again');
        } else {
            var result = JSON.parse(data.response);
            var userprofile = JSON.parse(localStorage.get('userProfile'));
            userprofile.profilePicUrl = result.result;
            localStorage.setItem('userProfile', JSON.stringify(userprofile));
            mainView.router.loadPage('uploadImage.html');
        }

    }

    function fail(data) {
        theApp.hidePreloader();
        alert("An error has occurred: Code = " + data.response);
    }

    var updateImageFromCamera = function () {

        //// Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto,
            function (message) {
                console.log('get image fail');
            },
            {
                quality: 1,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.CAMERA
            }
        );
    };


    return {
        scan: scan,
        scanUser: scanUser,
        googlemaps: googlemaps,
        googlemapForShopDetail: googlemapForShopDetail,
        updateImageFromLibrary: updateImageFromLibrary,
        updateImageFromCamera: updateImageFromCamera
    }


});