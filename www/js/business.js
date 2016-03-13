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
        domReady        : 'lib/require/domReady'


    }
});


require(['jquery', 'business/businessBusiness'], function ($, business) {
    require(['dpanels'], function (dpanels) {
            console.log("init-app");

                var theApp = business.theApp;
                // Export selectors engine
                var $$ = Dom7;
                // Add view
                var mainView = theApp.addView('.view-main', {
                    dynamicNavbar: true
                });
        
            theApp.onPageInit('index',function(){

                $('#btnScan').click(function(){
                    business.scan();
                });

                $('#btnScanUser').click(function(){
                    business.scanUser();
                });
            });

            theApp.onPageInit('business-setting', function(){
                $('#btnResetPasswordBusiness').click(business.resetPassword);
                $('#staffLogout').click(function(){
                console.log('logout');
                localStorage.clear();
                    window.location.replace("../index.html");
                });
            });

            theApp.init();

    });
});

