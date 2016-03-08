"use strict";

define(['jquery', 'framework7','underscore'], function ($, Framework7,_) {


    //AppInit
    var theApp = new window.Framework7({
        swipeBackPage: true,
        init: false
    });

    var $$ = Dom7;

    //Start to write Services
    var baseUrl = "http://47.88.30.91:8080/CouponManagementSystem/";
    var imgBaseUrl = 'http://47.88.30.91:8080';


    //get all Merchant count
    var getMerchantCountAll = function(){
        console.log("merchant count service activated");
        $.ajax({
            url:baseUrl+"user/getmerchantcount",
            type:"GET",
            success:getMerchantCountAllSuccess,
            error:getMerchantCountAllError
        });
    };

    var getMerchantCountAllSuccess = function(data){
        localStorage.setItem("AllMerchants",data.count);
    };

    var getMerchantCountAllError = function(data){
        theApp.alert("System error", "Error");
    };


    var getInitMerchantsAllSuccess = function(data){
            var content = '';
            _.each(data,function(v,k,list){
                content += merchantAllHtmlHtmlHelper(v);
            });
        $('.allMerchants ul').append(content);
        $('.infinite-scroll-preloader').append('<div class="preloader"></div>');

    };

    var getInitMerchantsAllError = function(data){
        console.log("system error");
        if(data.result == 'error'){
            theApp.alert("System error", "Error");
        }else if(data.result == 'out_of_index'){
            theApp.alert("Out of index", "Error");
        }
    };

    var getInitMerchantsAll = function(username,needItemNum,existItemNum){
        $.ajax({
            url:baseUrl+"/user/getmerchants",
            type:"GET",
            data:{username:username,needItemNum:needItemNum,existItemNum:existItemNum},
            success:getInitMerchantsAllSuccess,
            error:getInitMerchantsAllError
        });
    };

    var getFreshMechantsAll = function(username, needItem, existItemNum){
        $.ajax({
            url:baseUrl + "/user/getmerchants",
            type:"GET",
            data:{username:username,needItemNum:needItem,existItemNum:existItemNum},
            success:getFreshMechantsAllSuccess,
            error:getFreshMechantsAllError
        });
    };

    var getFreshMechantsAllSuccess = function(data){
        console.log('into getFreshMechantsAll');
        var content = '';
        _.each(data,function(v,k,list){
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


    var getFreshMechantsAllError = function(data){
        console.log("system error");
        if(data.result == 'error'){
            theApp.alert("System error", "Error");
        }else if(data.result == 'out_of_index'){
            theApp.alert("Out of index", "Error");
        }
        localStorage.setItem("merchantAllScroll",false);
    };

    var merchantAllHtmlHtmlHelper = function(v){
        var content = '<li> <div class="col-100 tablet-50"> <div class="tc-product"><a href="shopdetail.html?shopId=' + v.merchantId + '" class="title">';
        content += '<img src=' + imgBaseUrl + v.logoUrl + '><div class="details"> <div class="head"><h3>' + v.merchantName + '</h3>';
        content += '<h3>Chatswood</h3> </div> <div class="buttons"> <a href="#"><i class="uiicon-web39 color-orange"></i> Your points:' + v.userPoints + '</a>';
        content += '<a href="shopdetail.html?shopId=' + v.merchantId + '><i class="uiicon-web38"></i> Details</a>';
        content += '</div></div></a></div></div></li>';
        return content;
    };

    var getMerchantDetail = function(username,shopID){
        $.ajax({
            url:baseUrl + "user/getmerchantdetails",
            type:"GET",
            data:{merchantId:shopID,username:username},
            success:getMerchantDetailSuccess,
            error:getMerchantDetailError
        });
    };

    var getMerchantDetailSuccess = function(data){
        console.log(data.result.sliders);
        var content = merchantDetailSliderHtmlHelper(data.result.sliders);
        $('#merchantSliders').append(content);
        $('#merchantName').append(data.result.name);
        if(data.result.contact == ''){
            $('#merchantContact').append('Empty');
        }else{
            $('#merchantContact').append(data.result.contact);
        }
        $('#merchantAddress').append(data.result.street + ' ,'+data.result.suburb+' ,'+ data.result.state + ' ' +data.result.postcode);
        if(data.result.merchantDescription == ''){
            $('#merchantDescription').append('Empty');
        }else{
            $('#merchantDescription').append(data.result.merchantDescription);
        }
        if(data.result.email == ''){
            $('#merchantEmail').append('Empty');
        }else{
            $('#merchantDescription').append(data.result.email);
        }
        if(data.result.reedemPoints >= 0){
            $('#reddemPoint').append('<span><i class="uiicon-web39 color-orange"></i><strong>Points to redeem</strong> :</span><span>'+ data.result.reedemPoints +'</span>');
        }else{
            $('#reddemPoint').append('<span><i class="uiicon-web39 color-orange"></i><strong>Merchant do not provide coupon</strong>');
        }
        if(data.result.userPoints >= 0)
        {
            $('#userPoint').append('<span><i class="uiicon-web39 color-orange"></i><strong>Points to redeem</strong> :</span><span>'+ data.result.userPoints +'</span>');
        }else{
            $('#userPoint').append('<span><i class="uiicon-web39 color-orange"></i><strong>You have not gotten point</strong>');
        }
        var mySwiper =  new Swiper('.swiper-container', {
            preloadImages: false,
            lazyLoading: true,
            speed: 500,
            autoplay:2000,
            spaceBetween: 40
        });
    };

    var getMerchantDetailError = function(data){
        console.log(data.message);
    };

    var merchantDetailSliderHtmlHelper = function(sliders){
        var content = '<div class="swiper-container"><div class="swiper-wrapper" id="merchantSliders">';

        if(sliders.length == 0 || sliders == null){
             content += '<div class="swiper-slide"><img src="http://placehold.it/400x293" alt=""/></div>';
        }else{
            _.each(sliders,function(e,i,list){
                content += '<div class="swiper-slide"><img src='+imgBaseUrl+e +' alt=""/></div>'
            });
        }
        content +='</div><div class="swiper-pagination color-white"></div></div>';
        return content;
    };
    return{
        getFreshMechantsAll:getFreshMechantsAll,
        getInitMerchantsAll:getInitMerchantsAll,
        getMerchantCountAll:getMerchantCountAll,
        getMerchantDetail:getMerchantDetail,
        theApp:theApp
    }

});