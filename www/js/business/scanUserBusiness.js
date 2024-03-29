"use strict";
/**
 * Created by henry on 2/19/16.
 */
define(['jquery', '../services/scanUserService','../services/mobileService'], function ($, service, mobile) {

    
    var theApp = service.theApp;

    var $$ = Dom7;

    var addPoints = function() {
        var points = parseFloat($('#textAddPoints').val());
        if ($.isNumeric(points)) {
            service.staffAddPoints(points, localStorage.getItem('scanUsername'), localStorage.getItem('staffname'));
        } else {
            theApp.alert("Invalid points", "Warning");
        }
    };

    var getScanUerFullName = function() {
        service.getUserProfile(localStorage.getItem('scanUsername'));
    };

    return {
        theApp: theApp,
        addPoints: addPoints,
        getScanUerFullName:getScanUerFullName,
        mainView:service.mainView
    }
});