/**
 * Created by henry on 16/2/10.
 */
"user strict"

define(["jquery", "../services/userService"], function ($, service) {

    var theApp = service.theApp;
    var $$ = Dom7;



    var getInitData = function(){
        theApp.showPreloader();
        var username = localStorage.getItem("username");
        service.getUserProfile(username);
        service.getMerchantCount(username);
        console.log("Init Data");
        var tid = setInterval(pageLoading,1000);
        function pageLoading(){
            if(localStorage.getItem("userProfile")!== null && localStorage.getItem("userMechants")!==null){
                console.log(JSON.parse(localStorage.getItem("userProfile")));
                console.log(localStorage.getItem("userMechants"));
                clearInterval(tid);
                console.log("stop timer");
                if(localStorage.getItem("userMechants")<=6){
                    service.getMerchants(username,localStorage.getItem("userMechants"),0);
                }else{
                    service.getMerchants(username,6,0);
                }
                theApp.hidePreloader();

            }
        }
    };

    var refreshPage = function(){


        // Loading flag
        var loading = false;

        // Last loaded index
        var lastIndex = $$('.list-block li').length;

        var maxItems = 20;
        // Append items per load
        var itemsPerLoad = 5;

        console.log("refresh activated");
        // Exit, if loading in progress
        if (loading) return;

        // Set loading flag
        loading = true;

        // Emulate 1s loading
        setTimeout(function () {
            // Reset loading flag
            loading = false;

            if (lastIndex >= maxItems) {
                // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                theApp.detachInfiniteScroll($$('.infinite-scroll'));
                // Remove preloader
                $$('.infinite-scroll-preloader').remove();
                return;
            }

            // Generate new items HTML
            var html = '';
            for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
                html += '<li><div class="item-content"><div class="item-media"><img src=../img/logo.png></div><div class="item-inner"><h3>'+i+'</h3><div class="progress-box" data-percent="47">';
                html += '<div class="bar" style="transition-duration: 300ms; width: 47%;"><div class="progress">47%</div></div></div></div> </div></li>';
            }

            // Append new items
            $$('.userPoint ul').append(html);

            // Update last loaded index
            lastIndex = $$('.userPoint li').length;
        }, 1000);


    };
    return {
        theApp: theApp,
        getInitData:getInitData,
        refreshPage:refreshPage
    }
});
