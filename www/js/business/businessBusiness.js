"user strict"
/**
 * Created by henry on 2/19/16.
 */
define(['jquery', '../services/businessService','../services/mobileService'], function ($, service,mobile) {

    
    var theApp = service.theApp;
    console.log("business init");
    var $$ = Dom7;


    var scan = function () {

       var result = mobile.scan();

    };

    return {
        theApp: theApp,
        scan: scan
    }
});
