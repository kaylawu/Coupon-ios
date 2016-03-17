"use strict";
/**
 * Created by henry on 2/19/16.
 */
define(['jquery', '../services/scanVoucherService','../services/mobileService'], function ($, service, mobile) {

    
    var theApp = service.theApp;

    var $$ = Dom7;

    var useCoupon = function() {
        service.staffUseCoupon(localStorage.getItem('scanCouponId'));
    };

    return {
        theApp: theApp,
        useCoupon: useCoupon,
        mainView:service.mainView
    }
});