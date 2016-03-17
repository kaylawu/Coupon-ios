"use strict"
define(["jquery", "../services/merchantService", "../services/mobileService"], function ($, service, mobile) {

    var theApp = service.theApp;

    var $$ = Dom7;
    var getInitData = function () {


        service.getMerchantCountAll();
        console.log(localStorage.getItem("AllMerchants"));

        var tid = setInterval(pageLoading, 1000);
        console.log("Init Data");
        function pageLoading() {
            console.log("into pageloading function");
            if (localStorage.getItem("AllMerchants") !== null) {
                clearInterval(tid);
                if (localStorage.getItem("AllMerchants") > 0) {
                    console.log('into the initDATA firest if');
                    //Init home page mechants
                    if (localStorage.getItem("AllMerchants") <= 6) {
                        service.getInitMerchantsAll(localStorage.getItem("username"), localStorage.getItem("AllMerchants"), 0);
                        //remove infinite scroll listener
                        theApp.detachInfiniteScroll($$('.infinite-scroll'));
                        $$('.infinite-scroll-preloader').remove();
                    } else {
                        service.getInitMerchantsAll(localStorage.getItem("username"), 6, 0);
                    }
                }
            }
        }
    };

    var getshopDetail = function (shopID) {
        var username = localStorage.getItem("username");
        service.getMerchantDetail(username, shopID);

    };
    var refreshPage = function () {

        console.log("refresh activated");
        var username = localStorage.getItem("username");
        // Loading flag


        console.log(localStorage.getItem("merchantAllScroll"));
        // Last loaded index
        var lastIndex = $$('.allMerchants li').length;
        console.log(lastIndex);
        var maxItems = localStorage.getItem('AllMerchants');
        console.log(maxItems);
        // Append items per load
        var itemsPerLoad = 5;

        // Exit, if loading in progress
        if (JSON.parse(localStorage.getItem("merchantAllScroll"))) return;
        // Set loading flag

        localStorage.setItem("merchantAllScroll", true);

        if (maxItems - lastIndex >= itemsPerLoad) {
            service.getFreshMechantsAll(username, itemsPerLoad, lastIndex);

        } else {
            service.getFreshMechantsAll(username, maxItems - lastIndex, lastIndex);
        }

    };

    var getInitDataByRadius = function (map) {
        console.log('into getInitDataByRadius');
        service.getMerchantCountbyRadius();
        var tid = setInterval(pageLoading(map), 1000);
    };


    var pageLoading = function (map) {
        if (localStorage.getItem("AllMerchantsByRadius") !== null) {
            clearInterval(tid);
            alert('mechants number is :' + localStorage.getItem("AllMerchantsByRadius"));
            if (localStorage.getItem("AllMerchantsByRadius") > 0) {

                //Init home page mechants
                if (localStorage.getItem("AllMerchantsByRadius") <= 6) {
                    service.getInitMerchantsAllByRadius(localStorage.getItem("AllMerchantsByRadius"), 0,map);
                    //remove infinite scroll listener
                    theApp.detachInfiniteScroll($$('.infinite-scroll'));
                    $$('.infinite-scroll-preloader').remove();
                } else {
                    service.getInitMerchantsAllByRadius(6, 0,map);
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
            service.getFreshMechantsAllByRadius(itemsPerLoad, lastIndex,map);

        } else {
            service.getFreshMechantsAllByRadius(maxItems - lastIndex, lastIndex,map);
        }

    };

    return {
        getInitData: getInitData,
        refreshPage: refreshPage,
        getShopDetail: getshopDetail,
        getInitDataByRadius: getInitDataByRadius,
        refreshPageByRadius: refreshPageByRadius

    }

})
;