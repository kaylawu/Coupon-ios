"use strict"

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
        $.ajax({
            url:baseUrl+"/user/getmerchantcount",
            type:"GET",
            success:getMerchantCountAllSuccess,
            error:getMerchantCountAllError
        });
    };

    var getMerchantCountAllSuccess = function(data){
        localStorage.setItem("userMechantsAll",data.count);
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
        theApp.hidePreloader();
    };

    var getInitMerchantsAllError = function(data){
        console.log("system error");
        if(data.result == 'error'){
            theApp.alert("System error", "Error");
        }else if(data.result == 'out_of_index'){
            theApp.alert("Out of index", "Error");
        }
    };

    var getInitMerchantsAll = function(username, needItemNum, existItemNum){
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
            data:{username:username,needItemNum:needItemNum,existItemNum:existItemNum},
            success:getFreshMechantsAllSuccess,
            error:getFreshMechantsAllError
        });
    };

    var getFreshMechantsAllSuccess = function(data){
        var content = '';
        _.each(data,function(v,k,list){
            if (k == localStorage.getItem("userMechantsAll")) {
                content += merchantAllHtmlHtmlHelper(v);
                theApp.detachInfiniteScroll($$('.infinite-scroll'));

                $$('.infinite-scroll-preloader').remove();
            } else {
                content += merchantAllHtmlHtmlHelper(v).remove();
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

    return{
        getFreshMechantsAll:getFreshMechantsAll,
        getInitMerchantsAll:getInitMerchantsAll,
        getMerchantCountAll:getMerchantCountAll,
        theApp:theApp
    }

});