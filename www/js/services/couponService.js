"use strict"

define(['jquery', '../services/frameworkService','underscore'], function ($, Framework7,_) {

        //AppInit
        var theApp = Framework7.theApp;


        var $$ = Dom7;



    //Start to write Services
    var baseUrl = 'http://47.88.30.91:8080/CouponManagementSystem';
    var imgBaseUrl = 'http://47.88.30.91:8080';

    var getCouponCount = function(username, status){
        console.log('into get Coupon Count sERVICE');
        $.ajax({
            url:baseUrl+"/user/getcouponcount",
            type:"POST",
            data:{username:username,status:status},
            success:getCouponCountSuccess,
            error:getCouponCountError
        });
    };

    var getCouponCountSuccess = function(data){
        localStorage.setItem("AllUserCoupons",data.count);
        console.log('coupons count '+ data.count);
    };

    var getCouponCountError = function (data) {
        theApp.alert("System Error", "Error");
    };

    var getInitCoupons = function(username,needItemNum,existItemNum){
        $.ajax({
            url:baseUrl+"/user/getcoupons",
            type:"POST",
            data:{username:username,needItemNum:needItemNum,existItemNum:existItemNum},
            success:getInitCouponsSuccess,
            error:getInitCouponsError
        });
    };

    var getInitCouponsSuccess = function(data){
        console.log("into Coupon init success");
        var content = '';
        _.each(data,function(v,k,list) {
            console.log(v);
            content += couponHtmlHelper(v);
        });

        $('.userCoupon ul').append(content);
        $('.aUseVocher').click(function(){
            console.log('user covher trigger');
            var userCouponId = $(this).parent().find('.userCoupon').val();
            console.log(userCouponId);
        });
        $('.infinite-scroll-preloader').append('<div class="preloader"></div>');
    };

    var getInitCouponsError = function(data){
        if (data.result == 'error') {
            theApp.alert("System Error", "Error");
        } else if (data.result == 'out_of_index') {
            theApp.alert("Out of index", "Error")
        }
    };

    var couponHtmlHelper = function(v) {
        var content = '';
        content = '<li><div class="card facebook-card"> <div class="card-header no-border center"> <h3>' + v.merchantName + '</h3></div>';
        content += '<div class="card-content"> <img src="'+imgBaseUrl+ v.couponImageUrl+'" width="100%"></div>';
        content += '<div class="card-footer no-border"><a href="userQRCode.html?userCouponId='+v.userCouponId+'">Use Voucher</a>';
        content += '<p><a href="#" data-popup=".popup-terms" class = "open-popup">Terms</a></p><p>Expire: ' + v.expiredDate + '</p>';
        content += '</div></div></li>';
        return content;
    };

    var getFreshCoupons = function(username,needItemNum,existItemNum){
        $.ajax({
            url:baseUrl+"/user/getcoupons",
            type:"POST",
            data:{username:username,needItemNum:needItemNum,existItemNum:existItemNum},
            success:getFreshCouponsSuccess,
            error:getFreshCouponsError
        });
    };

    var getFreshCouponsSuccess = function(data){
        var content = '';
        _.each(data,function(v,k,list){

            if (k == localStorage.getItem("AllUserCoupons")) {
                content += couponHtmlHelper(v);
                theApp.detachInfiniteScroll($$('.infinite-scroll'));

                $$('.infinite-scroll-preloader').remove();
            } else {
                content += couponHtmlHelper(v);
            }
        });
        $('.userCoupon ul').append(content);
        localStorage.setItem("couponsScroll",false);
    };

    var getFreshCouponsError = function(data){
        if (data.result == 'error') {
            theApp.alert("System Error", "Error");
        } else if (data.result == 'out_of_index') {
            theApp.alert("Out of index", "Error")
        }
        localStorage.setItem("couponsScroll",false);
    };

    var userRedeemCoupon = function (username, couponId) {
        theApp.alert(username +'+'+ couponId);
        $.ajax({
            url:baseUrl+"/user/redeemcoupon",
            type:"POST",
            data:{username:username, couponId:couponId},
            success:userRedeemCouponSuccess,
            error:userRedeemCouponError
        });
    };

    var userRedeemCouponSuccess = function (data) {
        if (data.result == 'success') {
            theApp.alert("Success received the coupon!", "Congratulation");
        }
    };

    var userRedeemCouponError = function (data) {
        if (data.result == 'fail') {
            theApp.alert("Fail to recived the coupoon", "System Error");
        }
    };


    var userGetCouponTerms = function (couponId) {
        $.ajax({
            url:baseUrl+"/user/getcouponterms",
            type:"GET",
            data:{couponId:couponId},
            success:userGetCouponTermsSuccess,
            error:userGetCouponTermsError
        });
    };

    var userGetCouponTermsSuccess = function (data) {
        //
    };

    var userGetCouponTermsError = function () {
        theApp.alert("Fail to get coupon terms!", "System Error");
    };

    var searchCouponByMerchant = function(username, keyword) {
        $.ajax({
            url:baseUrl + "/user/searchcouponbymerchant",
            type:"GET",
            data:{username:username,keyword:keyword},
            success:searchCouponByMerchantSuccess,
            error:searchCouponByMerchantError
        });
    };

    var searchCouponByMerchantSuccess = function(data) {
        if (data.result != "no_result" && data.result != "error") {
            var content = '';
            _.each(data,function(v,k,list) {
                console.log(v);
                content += couponHtmlHelper(v);
            });
    
            $('.userCoupon ul').empty().append(content);
            $('.aUseVocher').click(function(){
                console.log('user covher trigger');
                var userCouponId = $(this).parent().find('.userCoupon').val();
                console.log(userCouponId);
            });
            $('.infinite-scroll-preloader').empty();
        } else if (data.result == "no_result") {
            theApp.alert("No matching result", "Sorry");
        } else if (data.result == "error") {
            theApp.alert("Search Error", "Error");
        } else {
            theApp.alert("Fail to search coupon", "Warning");
        }
    };

    var searchCouponByMerchantError = function() {
        theApp.alert("Fail to search coupon", "System Error");
    }

    return{
        theApp:theApp,
        getCouponCount:getCouponCount,
        getInitCoupons:getInitCoupons,
        getFreshCoupons:getFreshCoupons,
        userRedeemCoupon:userRedeemCoupon,
        userGetCouponTerms:userGetCouponTerms,
        searchCouponByMerchant:searchCouponByMerchant
    }
});
