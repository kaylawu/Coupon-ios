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
                //Stop timer(localStorage stored all profile)
                clearInterval(tid);

                //Init home page mechants
                if(localStorage.getItem("userMechants")<=6){
                    service.getInitMerchants(username,localStorage.getItem("userMechants"),0);
                }else{
                    service.getInitMerchants(username,6,0);
                }


            }
        }
    };

    var refreshPage = function(){

        console.log("refresh activated");
        var username = localStorage.getItem("username");
        // Loading flag
        localStorage.setItem("mechantsScroll",false);
        // Last loaded index
        var lastIndex = $$('.userPoint li').length;

        var maxItems = localStorage.getItem('userMechants');
        // Append items per load
        var itemsPerLoad = 5;
        // Exit, if loading in progress
        if (localStorage.getItem("mechantsScroll") ==true) return;
        // Set loading flag

        localStorage.setItem("mechantsScroll",true);

        if(maxItems - lastIndex >= itemsPerLoad){
            service.getFreshMechants(username,itemsPerLoad,lastIndex);

        }else{
            service.getFreshMechants(username,maxItems - lastIndex,lastIndex);
        }

        //// Emulate 1s loading
        //setTimeout(function () {
        //    // Reset loading flag
        //    loading = false;
        //
        //    if (lastIndex >= localStorage.getItem("userMechants")) {
        //        // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
        //        theApp.detachInfiniteScroll($$('.infinite-scroll'));
        //        // Remove preloader
        //        $$('.infinite-scroll-preloader').remove();
        //        return;
        //    }
        //
        //    // Generate new items HTML
        //    var html = '';
        //    for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
        //        html += '<li><div class="item-content"><div class="item-media"><img src=../img/logo.png></div><div class="item-inner"><h3>'+i+'</h3><div class="progress-box" data-percent="47">';
        //        html += '<div class="bar" style="transition-duration: 300ms; width: 47%;"><div class="progress">47%</div></div></div></div> </div></li>';
        //    }
        //
        //    // Append new items
        //    $$('.userPoint ul').append(html);
        //
        //    // Update last loaded index
        //    lastIndex = $$('.userPoint li').length;
        //}, 1000);


    };
    return {
        theApp: theApp,
        getInitData:getInitData,
        refreshPage:refreshPage
    }
});
