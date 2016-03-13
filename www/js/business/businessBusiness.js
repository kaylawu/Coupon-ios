"use strict"
/**
 * Created by henry on 2/19/16.
 */
define(['jquery', '../services/businessService','../services/mobileService'], function ($, service, mobile) {

    
    var theApp = service.theApp;
    console.log("business init");
    var $$ = Dom7;


    var scan = function () {
        mobile.scan();
    };

    var scanUser = function() {
        mobile.scanUser();
    };

    var resetPassword = function(){
        theApp.showPreloader();
        var oldPassword = $('#textCurrentPasswordBusiness').val();
        var newPassword = $('#textNewPassowrdBusiness').val();

        if(oldPassword == ''){
            theApp.hidePreloader();
            theApp.alert('Input old password', "Warning");
        }else if(newPassword == ''){
            theApp.hidePreloader();
            theApp.alert('Input new password', "Warning");
        } else {
            service.resetPassword(localStorage.getItem('staffname'),oldPassword,newPassword);
        }
    };

    // var addPoints = function() {
        
    // }

    return {
        theApp: theApp,
        resetPassword:resetPassword,
        scan: scan,
        scanUser: scanUser,
        mainView:service.mainView
    }
});
