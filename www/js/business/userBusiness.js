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


        console.log(localStorage.getItem("mechantsScroll"));
        // Last loaded index
        var lastIndex = $$('.userPoint li').length;

        var maxItems = localStorage.getItem('userMechants');
        // Append items per load
        var itemsPerLoad = 5;

        // Exit, if loading in progress
        if (JSON.parse(localStorage.getItem("mechantsScroll"))) return;
        // Set loading flag

        localStorage.setItem("mechantsScroll",true);

        if(maxItems - lastIndex >= itemsPerLoad){
            service.getFreshMechants(username,itemsPerLoad,lastIndex);

        }else{
            service.getFreshMechants(username,maxItems - lastIndex,lastIndex);
        }

    };

    var updateAddress = function(){

        service.updateAddress(localStorage.getItem('username'),address);
    };

    var updatePhone = function(){

        service.updatePhone(localStorage.getItem('username'),phone);
    };

    var resetPassword = function(){

        service.resetPasswrod(localStorage.getItem('username'),oldPassword,newPassword);
    };

    var userProfileInit = function(){

    };
    return {
        theApp: theApp,
        getInitData:getInitData,
        refreshPage:refreshPage,
        updateAddress:updateAddress,
        updatePhone:updatePhone,
        resetPassword:resetPassword,
        userProfileInit:userProfileInit
    }
});
