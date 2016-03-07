"use strict"
define(["jquery", "../services/merchantService","../services/mobileService"], function ($, service,mobile) {

    var getInitData = function(){
        theApp.showPreloader();
        var username = localStorage.getItem("username");
        service.getMerchantCountAll(username);
        console.log("Init Data");
        var tid = setInterval(pageLoading,1000);
        function pageLoading(){
                //Init home page mechants
                if(localStorage.getItem("userMechants")<=6){
                    service.getInitMerchants(username,localStorage.getItem("userMechants"),0);
                    //remove infinite scroll listener
                    theApp.detachInfiniteScroll($$('.infinite-scroll'));
                    $$('.infinite-scroll-preloader').remove();
                }else{
                    service.getInitMerchants(username,6,0);
                }
            }

    };

});