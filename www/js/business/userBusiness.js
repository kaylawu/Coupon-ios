/**
 * Created by henry on 16/2/10.
 */
"user strict"

define(["jquery", "../services/userService","../services/mobileService"], function ($, service,mobile) {

    var theApp = service.theApp;
    var $$ = Dom7;
    var phoneNumFormat = /04[\d]{8}/g;


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
                    //remove infinite scroll listener
                    theApp.detachInfiniteScroll($$('.infinite-scroll'));
                    $$('.infinite-scroll-preloader').remove();
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
        theApp.showPreloader();
        var address = $('#textUpdateAddress').val();
        if(address == ''){
            $('#textUpdateAddress').val('');
            theApp.hidePreloader();
            theApp.alert('Input your new address', "Warning");
        }else{

            service.updateAddress(localStorage.getItem('username'),address);
        }

    };

    var updatePhone = function(){
        theApp.showPreloader();
        var phone = $('#textUserPhoneNum').val();
        if(phone == ''){
            $('#textUserPhoneNum').val('');
            theApp.hidePreloader();
            theApp.alert('Input your new address', "Warning");
        }else if(phoneNumFormat.test(phone)){
            service.updatePhone(localStorage.getItem('username'),phone);
        }else{
            $('#textUserPhoneNum').val('');
            theApp.hidePreloader();
            theApp.alert('Please input australian phone number', "Warning");
        }
    };

    var resetPassword = function(){
        theApp.showPreloader();
        var oldPassword = $('#textCurrentPassword').val();
        var newPassword = $('#textNewPassowrd').val();
        if(oldPassword == ''){
            theApp.hidePreloader();
            theApp.alert('Input old password', "Warning");
        }else if(newPassword == ''){
            theApp.hidePreloader();
            theApp.alert('Input new password', "Warning");
        }else {
            service.resetPasswrod(localStorage.getItem('username'),oldPassword,newPassword);
        }
    };

    var userProfileInit = function(){
        var userProfile = JSON.parse(localStorage.getItem('userProfile'));

        if(userProfile.address == null)
        {
            $('#currentAddress').append(' Empty ');
        }else{
            $('#currentAddress').append(userProfile.address);
        }
        if(userProfile.phone == null){
            $('#currentPhone').append(' Empty ');
        }else{
            $('#currentAddress').append(userProfile.phone);
        }
};

    var googlemaps = function(){
        
        mobile.googlemaps();
    };



    return {
        theApp: theApp,
        getInitData:getInitData,
        refreshPage:refreshPage,
        updateAddress:updateAddress,
        updatePhone:updatePhone,
        resetPassword:resetPassword,
        userProfileInit:userProfileInit,
        googlemaps:googlemaps
    }
});
