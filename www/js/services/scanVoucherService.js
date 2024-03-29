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

    var staffUseCoupon = function(userCouponId) {
        $.ajax({
          url:baseUrl + "/staff/usecoupon",
          type:"POST",
          data:{userCouponId:userCouponId},
          success:staffUseCouponSuccess,
          error:staffUseCouponError
        });
      };

      var staffUseCouponSuccess = function(data){
        if (data.result == "success") {
          theApp.alert("Success to use voucher", "Congratulation");
          localStorage.removeItem('scanCouponId');
          window.location.replace("businesshome.html");
        } else if (data.result == "fail") {
          theApp.alert("Invalid voucher", "Error");
        } else {
          theApp.alert("Fail to use voucher", "Error");
        }
      };

      var staffUseCouponError = function(data){
        console.log(data.message);
        theApp.alert("Fail to use voucher", "Error");
      };

      var getUserCouponDetails = function(userCouponId){
        $.ajax({
          url:baseUrl + "/staff/getusercoupondetails",
          type:"POST",
          data:{userCouponId:userCouponId},
          success:getUserCouponDetailsSuccess,
          error:getUserCouponDetailsError
        });
      };

      var getUserCouponDetailsSuccess = function(data){
        localStorage.setItem("couponDetails",JSON.stringify(data));
        var couponDetails = JSON.parse(localStorage.getItem('couponDetails'));
        if (couponDetails.result == "success" && couponDetails.status != "Expired") {
          $('#merchantName').text(couponDetails.merchantName);
          $('#status').text(couponDetails.status);
          $('#couponImage').attr('src', couponDetails.couponImageUrl);
          $('#terms').text(couponDetails.terms);
          $('#expireDate').text(couponDetails.expiryDatetime);
        } else if (couponDetails.result == 'success' && couponDetails.status == "Expired") {
          theApp.alert("Voucher is expired", "Warning");
          window.localStorage.replace("businesshome.html");
        } else if (data.result == 'no_record') {
          theApp.alert("Voucher does not exist", "Warning");
        } else {
          theApp.alert("Fail to use voucher", "Error");
        }
      };

      var getUserCouponDetailsError = function(){
          localStorage.removeItem('scanCouponId');
          window.location.replace("businesshome.html");
      }

    return{
        theApp:theApp,
        staffUseCoupon:staffUseCoupon,
        getUserCouponDetails:getUserCouponDetails
    }

});