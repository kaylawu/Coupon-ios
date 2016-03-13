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

    var resetPassword = function(username, oldPwd, newPwd){
        $.ajax({
            type:"POST",
            url:baseUrl+"staff/resetpassword",
            data:{username:username,oldPassword:oldPwd,newPassword:newPwd},
            success:resetPasswordSuccess,
            error:resetPasswordError
        });
    };

    var resetPasswordSuccess = function (data) {
          console.log(data);
          if(data.result == 'success'){
              $('#textCurrentPasswordBusiness').val('');
              $('#textNewPassowrdBusiness').val('');
              theApp.hidePreloader();
              theApp.alert("Success reset password", "Congratulation");
          }else if(data.result == 'wrong_old_password'){
              $('#textCurrentPasswordBusiness').val('');
              $('#textNewPassowrdBusiness').val('');
              theApp.hidePreloader();
              theApp.alert("Current password is incorrect!", "Warning");
          }
      };

      var resetPasswordError = function(data){

        if(data.result == 'fail'){
            $('#textCurrentPasswordBusiness').val('');
            $('#textNewPassowrdBusiness').val('');
            theApp.hidePreloader();
            theApp.alert("Reset password fail", "Warning");
        } else {
            theApp.hidePreloader();
            theApp.alert("System error", "Error");
            console.log(data);
         }
      };

    var getUserCouponDetail = function(userCouponId){
      $.ajax({
        url:baseUrl + "/user/getusercoupondetails",
        type:"POST",
        data:{userCouponId:userCouponId},
        success:getUserCouponDetailSuccess,
        error:getUserCouponDetailError
      });
    };

    var getUserCouponDetailSuccess = function(data){
        
    };

    var getUserCouponDetailError = function(data){
      if (data.result == 'no_record') {
          theApp.alert("No Record", "Error");
        };
    };

    return{
        theApp:theApp,
        resetPassword:resetPassword,
        getUserCouponDetail:getUserCouponDetail
    }

});