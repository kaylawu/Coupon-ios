/**
 * Created by henry on 2/19/16.
 */
"use strict";

define(['jquery', '../services/frameworkService'], function ($, Framework7) {

    // Initialize your app
    var theApp = Framework7.theApp;

    console.log('service init');
    // Export selectors engine
    var $$ = Dom7;

    var baseUrl = "http://47.88.30.91:8080/CouponManagementSystem/";

    var staffAddPoints = function(amount, username, staffname){
        $.ajax({
          url:baseUrl + "/staff/addpoints",
          type:"POST",
          data:{amount:amount, username:username, staffname:staffname},
          success:staffAddPointsSuccess,
          error:staffAddPointsError
        });
      };

      var staffAddPointsSuccess = function(data){
        if (data.result == "success") {
          theApp.alert("Success to add points", "Congratulation"),
          localStorage.removeItem('scanUsername');
          window.location.replace("businesshome.html");
        };
      };

      var staffAddPointsError = function(data){
        if (data.result == "fail") {
          theApp.alert("Fail to add points", "Error");
        };
      };

    return{
        theApp:theApp,
        staffAddPoints:staffAddPoints
    }

});