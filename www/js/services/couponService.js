'user strict'

define(['jquery', 'framework7','underscore'], function ($, Framework7,_) {

    var couponPreloader = function(){

        //AppInit
        var theApp = new window.Framework7({
            swipeBackPage: true,
            init: false
        });

        var $$ = Dom7;
    };

    //Start to write Services
    var baseUrl = 'http://47.88.30.91:8080/CouponManagementSystem';
    var imgBaseUrl = 'http://47.88.30.91:8080';

    var getCouponCount = function(username){
        $.ajax({
            url:baseUrl+"/user/getcouponcount",
            type:"GET",
            data:{username:username},
            success:getCouponCountSuccess,
            error:getCouponCountError
        });
    };

    var getCouponCountSuccess = function(){

    };

    var getCouponCountError = function () {

    };

    var couponPreloader = function(){



    };

});
