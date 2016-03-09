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
        var mainView = login.mainView;

        theApp.device.statusBar = true;
        theApp.onPageBeforeInit('login',function(page){
            if(localStorage.getItem('username')!= null || localStorage.getItem('userProfile')!=null){
                window.location.replace("_USER/userhome.html");
            }
        });

        theApp.onPageInit('login', function (page) {
            console.log("login init");
            $("#business-login").click(login.businessLogin);
            $("#user-login").click(login.userLogin);
        });

        theApp.onPageInit('register', function (page) {
            console.log("register int");
            //page.view.hideToolbar();
            $("#user-register").click(login.register);
        });

        theApp.onPageInit('about-us', function (page) {
            console.log("about-us int");

        });

        theApp.onPageInit('userInfo',function(page){
            console.log('userInfo int');
          console.log(page.query.email + ' ' + page.query.password);


        });
        theApp.onPageInit('forget_password',function(page){
            console.log("forget_password init");
            //page.view.hideToolbar();
            $("#forgetPassword-submit").click(login.forgetPassword);
        });

        theApp.onPageInit('forget_password_business',function(page){
            $("#forgetPassword-submit-business").click(login.forgetPasswordBusiness);
        });

        theApp.init();
    });


});
