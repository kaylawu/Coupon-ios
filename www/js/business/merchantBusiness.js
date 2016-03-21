"use strict"
define(["jquery", "../services/merchantService", "../services/mobileService"], function ($, service, mobile) {

    var theApp = service.theApp;

    var $$ = Dom7;
    var getInitData = function (filterType) {


        service.getMerchantCountAll(filterType);
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
                    if (localStorage.getItem("AllMerchants") < 7) {
                        service.getInitMerchantsAll(localStorage.getItem("username"), localStorage.getItem("AllMerchants"), 0,filterType);
                        //remove infinite scroll listener
                        theApp.detachInfiniteScroll($$('.infinite-scroll'));
                        $$('.infinite-scroll-preloader').remove();
                    } else {
                        service.getInitMerchantsAll(localStorage.getItem("username"), 6, 0,filterType);
                    }
                }
            }
        }
    };

    var getshopDetail = function (shopID) {
        var username = localStorage.getItem("username");
        service.getMerchantDetail(username, shopID);

    };
    var refreshPage = function (filterType) {

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
            service.getFreshMechantsAll(username, itemsPerLoad, lastIndex,filterType);

        } else {
            service.getFreshMechantsAll(username, maxItems - lastIndex, lastIndex,filterType);
        }

    };

    var getInitDataByRadius = function () {
        console.log('into getInitDataByRadius');
        service.getMerchantCountbyRadius();

        if (localStorage.getItem("AllMerchantsByRadius") > 0) {
            //Init home page mechants
            if (localStorage.getItem("AllMerchantsByRadius") < 7) {
                service.getInitMerchantsAllByRadius(localStorage.getItem("AllMerchantsByRadius"), 0);
                //remove infinite scroll listener
                theApp.detachInfiniteScroll($$('.infinite-scroll'));
                $$('.infinite-scroll-preloader').remove();
            } else {
                service.getInitMerchantsAllByRadius(6, 0);
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
            service.getFreshMechantsAllByRadius(itemsPerLoad, lastIndex, map);

        } else {
            service.getFreshMechantsAllByRadius(maxItems - lastIndex, lastIndex, map);
        }

    };

    var userSearchMerchantByName = function() {
        var username = localStorage.getItem("username");
        var keyword = $('#shopName').val();
        service.userSearchMerchantByName(username, keyword);
    };

    return {
        getInitData: getInitData,
        refreshPage: refreshPage,
        getShopDetail: getshopDetail,
        getInitDataByRadius: getInitDataByRadius,
        refreshPageByRadius: refreshPageByRadius,
        userSearchMerchantByName: userSearchMerchantByName
    }

});