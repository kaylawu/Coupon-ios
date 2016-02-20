/**
 * Created by henry on 2/19/16.
 */
"user strict"
define(["jquery","framework7"],function($,Framework7) {

    // Initialize your app
    var theApp = new window.Framework7({

        init: false
    });
    console.log('service init');
    // Export selectors engine
    var $$ = Dom7;


    return{
        theApp:theApp
    }

});