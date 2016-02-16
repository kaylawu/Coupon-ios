"use strict";


// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({


    "paths": {
        jquery: 'lib/jquery-1.11.3.min',
        framework7: 'lib/framework7.min',
        dpanels: 'lib/3d.panels.min'
    }
});

require(['jquery', 'business/loginBusiness'], function ($, login) {
    require(['dpanels'], function (dpanels) {

        console.log("init-app");

        var theApp = login.theApp;
        // Add view
        var mainView = theApp.addView('.view-main', {
            dynamicNavbar: true
        });


        theApp.onPageInit('login', function () {
            console.log("login init");
            $("#business-login").click(login.businessLogin);
            $("#user-login").click(login.userLogin);
        });

        theApp.onPageInit('register', function () {
            $("#user-register").click(login.register);
        });

        theApp.onPageInit('forget_password',function(){
            mainView.hideToolbar();
            $("#forgetPassword-submit").click(login.forgetPassword);
        });



        theApp.onPageBack('forget_password', function () {
            mainView.showToolbar();
        });
        theApp.init();
    });


});
