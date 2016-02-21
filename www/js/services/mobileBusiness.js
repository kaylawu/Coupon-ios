/**
 * Created by henry on 2/20/16.
 */
"use strict"

define([],function(){

    function scan()
    {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if(!result.cancelled)
                {
                    if(result.format == "QR_CODE")
                    {
                       alert(result.text);
                    }
                }
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    }

    return{
        scan:scan
    }


});