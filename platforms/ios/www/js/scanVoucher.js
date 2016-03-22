"use strict";


// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({

    "paths": {
        jquery          : 'lib/jquery-1.11.3.min',
        framework7      : 'lib/framework7.min',
        dpanels         : 'lib/3d.panels.min',
        isotope         : 'lib/isotope.min',
        imagesLoaded    : 'lib/imagesLoaded.min',
        countdown       : 'lib/countdown.min',

        async           : 'lib/require/async',
        propertyParser  : 'lib/require/propertyParser',
        font            : 'lib/require/font',
        domReady        : 'lib/require/domReady',
        underscore:'lib/underscore-min'
    }
});


require(['jquery', 'business/scanVoucherBusiness'], function ($, business) {
    require(['dpanels'], function (dpanels) {
            console.log("init-app");

                var theApp = business.theApp;
                // Export selectors engine
                var $$ = Dom7;
                // Add view
                var mainView = theApp.addView('.view-main', {
                    dynamicNavbar: true
                });

            theApp.onPageInit('scan-voucher', function(){
                business.initialCoupon();
                $('#useCoupon').click(business.useCoupon);
                $('#cancelUseCoupon').click(function(){
                    localStorage.removeItem('scanCouponId');
                    localStorage.removeItem('couponDetails');
                    window.location.replace("businesshome.html");
                });
            });

            theApp.init();

    });
});
