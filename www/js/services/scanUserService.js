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

    var staffAddPoints = function(amount, userUsername, staffUsername){
        theApp.showPreloader();
        $.ajax({
          url:baseUrl + "/staff/addpoints",
          type:"POST",
          data:{amount:amount, userUsername:userUsername, staffUsername:staffUsername},
          success:staffAddPointsSuccess,
          error:staffAddPointsError
        });
      };

      var staffAddPointsSuccess = function(data){
        theApp.hidePreloader();
        if (data.result == "success") {
          theApp.alert("Success to add points", "Congratulation");
        } else if (data.result == "fail") {
          theApp.alert("Fail to add points", "Warning");
        } else {
          theApp.alert("System Error", "Warning");
        }
      };

      var staffAddPointsError = function(data){
          theApp.hidePreloader();
          theApp.alert("Fail to add points", "Error");
      };

      var getUserProfile = function(username){
        theApp.showPreloader();
        $.ajax({
            url:baseUrl+"/user/getprofile",
            type:"POST",
            data:{username:username},
            success:getUserProfileSuccess,
            error:getUserProfileError
        });
    };

    var getUserProfileSuccess = function(data){
        localStorage.setItem("userProfile",JSON.stringify(data));
        var userProfile = JSON.parse(localStorage.getItem('userProfile'));
        var scanUserFullName = userProfile.name;
        if (scanUserFullName != null) {
          $('#scanUsername').text(scanUserFullName);
          theApp.hidePreloader();
        } else {
          window.location.href = "businesshome.html";
          theApp.showPreloader();
        }      
    };

      var getUserProfileError = function(data){
        theApp.hidePreloader();
        window.location.href = "businesshome.html";
        theApp.alert("User does not exist", "Warning");
        console.log(data);
        localStorage.removeItem('scanUsername');
    };

    return{
        theApp:theApp,
        staffAddPoints:staffAddPoints,
        getUserProfile:getUserProfile
    }

});