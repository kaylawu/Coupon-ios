'user strict';


define(['framework7'], function (Framework7) {

    //AppInit
    var theApp = new window.Framework7({
        swipeBackPage: true,
        init: false
    });

    // Add view
    var mainView = theApp.addView('.view-main', {
        dynamicNavbar: true
    });

    return{
        theApp:theApp,
        mainView:mainView
    }

});