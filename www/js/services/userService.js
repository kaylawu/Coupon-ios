/**
 * Created by henry on 16/2/10.
 */
"user strict"

define(['jquery', 'framework7'], function ($, Framework7) {

      //AppInit
      var theApp = new window.Framework7({
         swipeBackPage: true,
         init: false
      });

      var $$ = Dom7;

      var mainView = theApp.add(".view-main", {});


     //Start to write Services
      var baseUrl = "http://47.88.30.91:8080/CouponManagementSystem/";

      var getPointOfShop = function(){

      };


      //getProfile
      var getUserProfileSuccess = function(data){

      };
      var getUserProfileError = function(data){

      };
      var getUserProfile = function(username){
         $.ajax({
            type:"POST",
            url:baseUrl+"/user/getprofile",
            data:{username:username},
            success:getUserProfileSuccess,
            error:getUserProfileError

         });

      };

      //changePassword
      var setPasswordSuccess = function (data) {

      };

      var setPasswordError = function(data){

      };

      var setPassword = function(email,oldPwd,newPwd){
         $.ajax({
            type:"POST",
            url:baseUrl+"/user/resetpassword",
            data:{email:email,oldPassword:oldPwd,newPassword:newPwd},
            success:setPasswordSuccess,
            error:setPasswordError
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
      return {
         theApp: theApp,
         setPassword: setPassword,
         getUserProfile : getUserProfile
      }

});