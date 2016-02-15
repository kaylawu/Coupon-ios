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


require(['jquery', 'framework7', 'business/loginBusiness'], function ($, Framework7, login) {

            console.log("init-app");
            // Initialize your app
            var theApp = new window.Framework7({
                swipeBackPage:false
            });

            // Export selectors engine
            var $$ = Dom7;

            // Add view
    var mainView = theApp.addView('.view-main', {});


        });

