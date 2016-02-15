/**
 * Created by henry on 16/2/10.
 */
"user strict"

define(['jquery', 'framework7','underscore'], function ($, Framework7,_) {

      //AppInit
      var theApp = new window.Framework7({
         swipeBackPage: true,
         init: false
      });

      var $$ = Dom7;

     //Start to write Services
      var baseUrl = "http://47.88.30.91:8080/CouponManagementSystem/";


      //resetPassword
      var resetPasswordSuccess = function (data) {

      };

      var resetPasswordError = function(data){

      };

      var resetPassword = function(email,oldPwd,newPwd){
         $.ajax({
            type:"POST",
            url:baseUrl+"/user/resetpassword",
            data:{email:email,oldPassword:oldPwd,newPassword:newPwd},
            success:resetPasswordSuccess,
            error:resetPasswordError
         });
      };

      //updateAddress
      var updateAddressSuccess = function(data){

      };
      var updateAddressError = function (data) {

      };
      var updateAddress = function(username,address){
         $.ajax({
            url:baseUrl+"/user/updateaddress",
            type:"POST",
            data:{username:username,address:address},
            success:updateAddressSuccess,
            error:updateAddressError
         });
      };



    //getUserProfile
    var getUserProfileSuccess = function(data){
        localStorage.setItem("userProfile",JSON.stringify(data));
    };

    var getUserProfileError = function(data){
        theApp.alert("System Get Error");
        console.log(data);
    };

    var getUserProfile = function(username){
        $.ajax({
            url:baseUrl+"/user/getprofile",
            type:"POST",
            data:{username:username},
            success:getUserProfileSuccess,
            error:getUserProfileError
        });

    };

    //getMerchantCount
    var getMerchantCountSuccess = function(data){
        localStorage.setItem("userMechants",data.count);
    };

    var getMerchantCountError = function(data){
        theApp.alert("System get error");
        console.log(data);
    };

    var getMerchantCount = function(username){
        $.ajax({
            url:baseUrl+"/user/getmerchantcountbyuser",
            type:"GET",
            data:{username:username},
            success:getMerchantCountSuccess,
            error:getMerchantCountError
        });

    };

    //getMerchants
    var getMerchantsSuccess = function(data){
        
    };

    var getMerchantsError = function(data){
        console.log("system error");
    };

    var getMerchants = function(username,needItemNum,existItemNum){
        $.ajax({
            url:baseUrl+"/user/getmerchantsbyuser",
            type:"GET",
            data:{username:username,needItemNum:needItemNum,existItemNum:existItemNum},
            success:getMerchantsSuccess,
            error:getMerchantsError
        });

    };

    return{
        theApp : theApp,

        getMerchantCount:getMerchantCount,
        getMerchants:getMerchants,
        getUserProfile:getUserProfile,
        updateAddress:updateAddress,
        resetPasswrod:resetPassword


    }
});