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

    var initialCoupon = function() {
        service.getUserCouponDetails(localStorage.getItem('scanCouponId'));
    }

    return {
        theApp: theApp,
        useCoupon: useCoupon,
        initialCoupon:initialCoupon,
        mainView:service.mainView
    }
});