"use strict";

define(['jquery', '../services/frameworkService', 'underscore', '../services/mobileService'], function ($, Framework7, _, mobile) {


    //AppInit
    var theApp = Framework7.theApp;

    var $$ = Dom7;

    //Start to write Services
    var baseUrl = "http://47.88.30.91:8080/CouponManagementSystem/";
    var imgBaseUrl = 'http://47.88.30.91:8080';

    //get all Merchant count
    var getMerchantCountAll = function (filterType) {
        console.log("merchant count service activated");
        $.ajax({
            url: baseUrl + "user/getmerchantcount",
            type: "GET",
            Data:{filterType: filterType},
            success: getMerchantCountAllSuccess,
            error: getMerchantCountAllError
        });
    };

    var getMerchantCountAllSuccess = function (data) {
        localStorage.setItem("AllMerchants", data.count);
    };

    var getMerchantCountAllError = function (data) {
        theApp.alert("System error", "Error");
    };


    var getInitMerchantsAll = function (username, needItemNum, existItemNum,filterType) {
        $.ajax({
            url: baseUrl + "/user/getmerchants",
            type: "GET",
            data: {username: username, needItemNum: needItemNum, existItemNum: existItemNum,filterType:filterType},
            success: getInitMerchantsAllSuccess,
            error: getInitMerchantsAllError
        });
    };
    var getInitMerchantsAllSuccess = function (data) {
        var content = '';
        _.each(data, function (v, k, list) {
            content += merchantAllHtmlHtmlHelper(v);
        });
        $('.allMerchants ul').empty().append(content);
        $('.infinite-scroll-preloader').append('<div class="preloader"></div>');

    };

    var getInitMerchantsAllError = function (data) {
        console.log("system error");
        if (data.result == 'error') {
            theApp.alert("System error", "Error");
        } else if (data.result == 'out_of_index') {
            theApp.alert("Out of index", "Error");
        }
    };

    var getFreshMechantsAll = function (username, needItem, existItemNum,filterType) {
        $.ajax({
            url: baseUrl + "/user/getmerchants",
            type: "GET",
            data: {username: username, needItemNum: needItem, existItemNum: existItemNum,filterType:filterType},
            success: getFreshMechantsAllSuccess,
            error: getFreshMechantsAllError
        });
    };

    var getFreshMechantsAllSuccess = function (data) {
        console.log('into getFreshMechantsAll');
        var content = '';
        _.each(data, function (v, k, list) {
            console.log(v);
            if (k == localStorage.getItem("AllMerchants")) {
                content += merchantAllHtmlHtmlHelper(v);
                theApp.detachInfiniteScroll($$('.infinite-scroll'));
                $$('.infinite-scroll-preloader').remove();
            } else {
                content += merchantAllHtmlHtmlHelper(v);
            }
        });
        $('.allMerchants ul').append(content);
        localStorage.setItem("merchantAllScroll", false);
    };

    var getFreshMechantsAllError = function (data) {
        console.log("system error");
        if (data.result == 'error') {
            theApp.alert("System error", "Error");
        } else if (data.result == 'out_of_index') {
            theApp.alert("Out of index", "Error");
        }
        localStorage.setItem("merchantAllScroll", false);
    };

    var merchantAllHtmlHtmlHelper = function (v) {

        var points;

        if (v.userPoints == -1) {
            points = 0
        } else {
            points = v.userPoints;
        }

        var content = '<li> <div class="col-100 tablet-50"> <div class="tc-product"><a href="shopdetail.html?shopId=' + v.merchantId + '" class="title">';
        content += '<img src=' + imgBaseUrl + v.logoUrl + '><div class="details"> <div class="head"><h3>' + v.merchantName + '</h3>';
        content += '<h3>Chatswood</h3> </div> <div class="buttons"> <a href="#"><i class="uiicon-web39 color-orange"></i> Your points:' + points + '</a>';
        content += '<a href="shopdetail.html?shopId=' + v.merchantId + '"><i class="uiicon-web38"></i> Details</a>';
        content += '</div></div></a></div></div></li>';
        return content;
    };

    var getMerchantDetail = function (username, shopID) {

        console.log(username, shopID);
        $.ajax({
            url: baseUrl + "user/getmerchantdetails",
            type: "GET",
            data: {merchantId: shopID, username: username},
            success: getMerchantDetailSuccess,
            error: getMerchantDetailError
        });
    };

    var getMerchantDetailSuccess = function (data) {

        console.log(data);
        console.log(data.result.sliders);
        if (data.result == 'error') {
            theApp.alert('System get error', 'ERROR');
        } else {
            var content = merchantDetailSliderHtmlHelper(data.result.sliders);
            $('#merchantSliders').append(content);
            $('#merchantName').append(data.result.name);
            if (data.result.contact == '') {
                $('#merchantContact').append('Empty');
            } else {
                $('#merchantContact').append(data.result.contact);
            }
            $('#merchantAddress').append(data.result.street + ' ,' + data.result.suburb + ' ,' + data.result.state + ' ' + data.result.postcode);
            if (data.result.merchantDescription == '') {
                $('#merchantDescription').append('Empty');
            } else {
                $('#merchantDescription').append(data.result.merchantDescription);
            }
            if (data.result.email == '') {
                $('#merchantEmail').append('Empty');
            } else {
                $('#merchantEmail').append(data.result.email);
            }


            if (data.result.userPoints >= 0) {
                $('#userPointInShopDetail').append('<span><i class="uiicon-web39 color-orange"></i><strong>Points to redeem</strong> :</span><span>' + data.result.userPoints + '</span>');
            } else {
                $('#userPointInShopDetail').append('<span><i class="uiicon-web39 color-orange"></i></span><strong>You have not gotten point</strong>');
            }

            if (data.result.reedemPoints >= 0) {
                $('#reddemPoint').append('<span><i class="uiicon-web39 color-orange"></i><strong>Points to redeem</strong> :</span><span>' + data.result.reedemPoints + '</span>');
            } else {
                $('#reddemPoint').append('<span><i class="uiicon-web39 color-orange"></i><strong>No vaild voucher</strong>');
            }

            if (data.result.couponId > 0) {
                $('#couponID').val(data.result.couponId);
                console.log('couponID' + $('#couponID').val());
                $('#couponImageInShopDetial').append('<img data-src="' + imgBaseUrl + data.result.couponImageUrl + '" class="lazy lazy-fadein"/>');

            } else {
                $('#couponImageInShopDetial').append('<img data-src="../img/voucher-default.png" class="lazy lazy-fadein"/>');
                $('#redeem').addClass('disabled');
            }
            var mySwiper = new Swiper('.swiper-container', {
                preloadImages: false,
                lazyLoading: true,
                speed: 500,
                autoplay: 2000,
                spaceBetween: 40
            });
            console.log('before google maps' + data.result.latitude + data.result.longtitude);

            mobile.googlemapForShopDetail(data.result.latitude, data.result.longtitude);
        }
    };


    var getMerchantDetailError = function (data) {
        console.log(data.message);
    };

    var merchantDetailSliderHtmlHelper = function (sliders) {
        var content = '<div class="swiper-container"><div class="swiper-wrapper" id="merchantSliders">';

        if (sliders.length == 0 || sliders == null) {
            content += '<div class="swiper-slide"><img src="http://placehold.it/400x293" alt=""/></div>';
        } else {
            _.each(sliders, function (e, i, list) {
                content += '<div class="swiper-slide"><img src=' + imgBaseUrl + e + ' alt=""/></div>'
            });
        }
        content += '</div><div class="swiper-pagination color-white"></div></div>';
        return content;
    };

    var getMerchantCountbyRadius = function () {

        var userlatitude = localStorage.getItem('userLatitude');
        var userLongitude = localStorage.getItem('userLongitude');
        var radius = localStorage.getItem('radius');
        $.ajax({
            url: baseUrl + "user/getmerchantcountbyradius",
            type: "GET",
            data: {latitude: userlatitude, longtitude: userLongitude, radius: radius},
            success: getMerchantCountbyRadiusSuccess,
            error: getMerchantCountbyRadiusError
        });
    };

    var getMerchantCountbyRadiusSuccess = function (data) {
        if (data.count >= 0) {
            localStorage.setItem("AllMerchantsByRadius", data.count);
        } else {
            theApp.alert("System error", "Error");
        }
    };

    var getMerchantCountbyRadiusError = function (data) {
        theApp.alert("System error", "Error");
    };


    var getInitMerchantsAllByRadiusSuccess = function (data) {

        var content = '';
        //mobile.googleInit();
        _.each(data, function (v, k, list) {
            content += merchantAllByRadiusHtmlHelper(v);
        });
        $('.allMerchantsByRadius ul').empty().append(content);
        $('.infinite-scroll-preloader').append('<div class="preloader"></div>');
        localStorage.setItem("merchantAllScroll", false);

    };

    var getInitMerchantsAllByRadiusError = function (data) {
        console.log("system error");
        if (data.result == 'error') {
            theApp.alert("System error", "Error");
        } else if (data.result == 'out_of_index') {
            theApp.alert("Out of index", "Error");
        }
        localStorage.setItem("merchantAllScroll", false);
    };

    var getInitMerchantsAllByRadius = function (needItemNum, existItemNum) {

        var userlatitude = localStorage.getItem('userLatitude');
        var userLongitude = localStorage.getItem('userLongitude');
        var radius = localStorage.getItem('radius');
        var username = localStorage.getItem('username');
        $.ajax({
            url: baseUrl + "/user/getmerchantsbyradius  ",
            type: "GET",
            data: {latitude:userlatitude,longtitude:userLongitude,radius:radius, username: username, needItemNum: needItemNum, existItemNum: existItemNum},
            success: getInitMerchantsAllByRadiusSuccess,
            error: getInitMerchantsAllByRadiusError
        });
    };

    var merchantAllByRadiusHtmlHelper = function(v){
        mobile.googlemaps(v.latitude, v.longtitude);
        var content = '<a href="shopdetail.html?shopId='+ v.merchantId + '" class="item-link item-content"><div class="item-media"><img src="'+imgBaseUrl+ v.logoUrl+'" width="100"></div>';
        content+= '<div class="item-inner"><div class="item-title-row"><div class="item-title">'+ v.merchantName+ '</div><div class="item-after">Open</div>';
        content+='</div><div class="item-subtitle">';
        if(v.newShop == true)
        {
            content+='New Shop';
        }else if(v.newCoupon){
            content += 'New Coupon';
        }
        content += '</div><div class="item-text">Suburb:'+ v.surburb +'</div></div></a>';
        return content;
    };

    var getFreshMechantsAllByRadius = function(needItem, existItemNum){
        var userlatitude = localStorage.getItem('userLatitude');
        var userLongitude = localStorage.getItem('userLongitude');
        var radius = localStorage.getItem('radius');
        var username = localStorage.getItem('username');
        $.ajax({
            url: baseUrl + "/user/getmerchantsbyradius  ",
            type: "GET",
            data: {latitude:userlatitude,longtitude:userLongitude,radius:radius, username: username, needItemNum: needItemNum, existItemNum: existItemNum},
            success: getFreshMerchantsAllByRadiusSuccess,
            error: getFreshMerchantsAllByRadiusError
        });
    };

    var getFreshMerchantsAllByRadiusSuccess = function(data){
        var content = '';
        alert('success into mechants radius');
        _.each(data, function (v, k, list) {
            console.log(v);
            if (k == localStorage.getItem("AllMerchantsByRadius")) {
                content += merchantAllHtmlHtmlHelper(v);
                theApp.detachInfiniteScroll($$('.infinite-scroll'));
                $$('.infinite-scroll-preloader').remove();
            } else {
                content += merchantAllHtmlHtmlHelper(v);
            }
        });
        $('.allMerchants ul').append(content);
        localStorage.setItem("merchantAllScroll", false);
    };


    var getFreshMerchantsAllByRadiusError = function(data){
        console.log("system error");
        if (data.result == 'error') {
            theApp.alert("System error", "Error");
        } else if (data.result == 'out_of_index') {
            theApp.alert("Out of index", "Error");
        }
        localStorage.setItem("merchantAllScroll", false);
    };
    return {
        getFreshMechantsAll: getFreshMechantsAll,
        getInitMerchantsAll: getInitMerchantsAll,
        getMerchantCountAll: getMerchantCountAll,
        getMerchantDetail: getMerchantDetail,
        theApp: theApp,
        getMerchantCountbyRadius:getMerchantCountbyRadius,
        getFreshMechantsAllByRadius:getFreshMechantsAllByRadius,
        getInitMerchantsAllByRadius:getInitMerchantsAllByRadius
    }

});
