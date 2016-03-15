/**
 * Created by henry on 3/15/16.
 */

define(['jquery', '../services/frameworkService', 'underscore', '../services/mobileService'], function ($, Framework7, _, mobile) {



    //AppInit
    var theApp = Framework7.theApp;

    var $$ = Dom7;

    //Start to write Services
    var baseUrl = "http://47.88.30.91:8080/CouponManagementSystem/";
    var imgBaseUrl = 'http://47.88.30.91:8080';




//get all Merchant count
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
        _.each(data, function (v, k, list) {
            content += merchantAllHtmlHtmlByRadiusHelper(v);
        });
        $('.allMerchantsByRadius ul').empty().append(content);
        $('.infinite-scroll-preloader').append('<div class="preloader"></div>');

    };

    var getInitMerchantsAllByRadiusError = function (data) {
        console.log("system error");
        if (data.result == 'error') {
            theApp.alert("System error", "Error");
        } else if (data.result == 'out_of_index') {
            theApp.alert("Out of index", "Error");
        }
    };

    var getInitMerchantsAllByRadius = function (needItemNum, existItemNum,map) {
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

    var merchantAllHtmlHtmlByRadiusHelper = function(v){
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

    var getFreshMechantsAllByRadius = function(needItem, existItemNum,map){
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
    return{
        getMerchantCountbyRadius:getMerchantCountbyRadius,
        getFreshMechantsAllByRadius:getFreshMechantsAllByRadius,
        getInitMerchantsAllByRadius:getInitMerchantsAllByRadius
    }

});