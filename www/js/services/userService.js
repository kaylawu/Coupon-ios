/**
 * Created by henry on 16/2/10.
 */
'use strict';

define(['jquery', '../services/frameworkService','underscore'], function ($, Framework7,_) {

      //AppInit
      var theApp = Framework7.theApp;

      var $$ = Dom7;

    // Add view
    var mainView = Framework7.mainView;

     //Start to write Services
      var baseUrl = "http://47.88.30.91:8080/CouponManagementSystem/";
      var imgBaseUrl = 'http://47.88.30.91:8080';


      //resetPassword
      var resetPasswordSuccess = function (data) {
          console.log(data);
          if(data.result == 'success'){
              $('#textCurrentPassword').val('');
              $('#textNewPassowrd').val('');
              theApp.hidePreloader();
              theApp.alert("Success reset password", "Congratulation");
          }else if(data.result == 'wrong_old_password'){
              $('#textCurrentPassword').val('');
              $('#textNewPassowrd').val('');
              theApp.hidePreloader();
              theApp.alert("Current password is incorrect!", "Warning");
          }
      };

      var resetPasswordError = function(data){

             if(data.result == 'fail'){
              $('#textCurrentPassword').val('');
              $('#textNewPassowrd').val('');
              theApp.hidePreloader();
              theApp.alert("Reset password fail", "Warning");
          }else{
                 theApp.hidePreloader();
                 theApp.alert("System error", "Error");
                 console.log(data);
             }

      };

      var resetPassword = function(username,oldPwd,newPwd){
         $.ajax({
            type:"POST",
            url:baseUrl+"/user/resetpassword",
            data:{username:username,oldPassword:oldPwd,newPassword:newPwd},
            success:resetPasswordSuccess,
            error:resetPasswordError
         });
      };

      //updateAddress

      var updateAddressError = function (data) {
        theApp.hidePreloader();
        if(data.result == 'fail'){
            theApp.alert("Update fail", "Warning");
        }
    };

    var updateAddress = function(username,address){

        $.ajax({
            url:baseUrl+"/user/updateaddress",
            type:"POST",
            data:{username:username,address:address},
            success: function (data) {
                if(data.result == 'success'){

                    console.log(address);

                    $('#currentAddress').replaceWith(address);
                    $('#textUpdateAddress').val('');
                    getUserProfile(username);

                }
            },
            error:updateAddressError
        });
    };

    //updatePhone
    var updatePhoneError = function (data) {
        theApp.hidePreloader();
        if(data.result == 'fail'){
            theApp.alert("Update fail", "Warning");
        }
    };

    var updatePhone = function(username,phone){
        $.ajax({
            url:baseUrl+"/user/updatephone",
            type:"POST",
            data:{username:username,phone:phone},
            success:function(data){
                if(data.result == 'success'){

                    $('#currentPhone').replaceWith(phone);
                    $('#textUserPhoneNum').val('');
                    getUserProfile(username);
                }
            },
            error:updatePhoneError
        });
    };

    //getMerchantCount
    var getMerchantCountSuccess = function(data){
        localStorage.setItem("userMechants",data.count);
    };

    var getMerchantCountError = function(data){
        theApp.alert("System error", "Error");
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
    //getInitMerchants
    var getInitMerchantsSuccess = function(data){
        var content = '';
        _.each(data,function(v,k,list){
            content += mechantHtmlHelper(v);
        });

        $('.userPoint ul').append(content);
        $('.infinite-scroll-preloader').append('<div class="preloader"></div>');

    };

    var getInitMerchantsError = function(data){
        console.log("system error");
        if(data.result == 'error'){
            theApp.alert("System error", "Error");
        }else if(data.result == 'out_of_index'){
            theApp.alert("Out of index", "Error");
        }
    };

    var getInitMerchants = function(username,needItemNum,existItemNum){
        $.ajax({
            url:baseUrl+"/user/getmerchantsbyuser",
            type:"GET",
            data:{username:username,needItemNum:needItemNum,existItemNum:existItemNum},
            success:getInitMerchantsSuccess,
            error:getInitMerchantsError
        });
    };



    //getFreshMechants
    var getFreshMechantsSuccess = function(data){
        var content = '';
        console.log('max'+localStorage.getItem("userMechants"));
        _.each(data,function(v,k,list){
            console.log(k);

            if(k == localStorage.getItem("userMechants")){
                content += mechantHtmlHelper(v);
                theApp.detachInfiniteScroll($$('.infinite-scroll'));
                // Remove preloader
                $$('.infinite-scroll-preloader').remove();
            }else
            {
                content += mechantHtmlHelper(v);
            }
        });
        $('.userPoint ul').append(content);
        localStorage.setItem("mechantsScroll",false);
    };


    var getFreshMechantsError = function(data){
        console.log("system error");
        if(data.result == 'error'){
            theApp.alert("System error", "Error");
        }else if(data.result == 'out_of_index'){
            theApp.alert("Out of index", "Error");
        }
        localStorage.setItem("mechantsScroll",false);
    };


    var getFreshMechants = function(username,needItemNum,existItemNum){
        console.log('needItem'+ needItemNum + 'existItem' + existItemNum);
        $.ajax({
            url:baseUrl+"/user/getmerchantsbyuser",
            type:"GET",
            data:{username:username,needItemNum:needItemNum,existItemNum:existItemNum},
            success:getFreshMechantsSuccess,
            error:getFreshMechantsError
        });
    };


    //private function
    var mechantHtmlHelper = function(v){
        var content = '<li> <div class="item-content"> <div class="item-media"><img class="mechantLoge" src='+imgBaseUrl+ v.logoUrl+'></div>';
        content +='<div class="item-inner"> <h3>'+ v.merchantName+'</h3> <div class="progress-box" data-percent="47">';
        content += '<div class="bar" style="transition-duration: 300ms; width: 47%;"> <div class="progress">47%</div></div>';
        content += '</div></div></div></li>';
        return content;
    };



    //getUserProfile
    var getUserProfileSuccess = function(data){
        localStorage.setItem("userProfile",JSON.stringify(data));
        theApp.hidePreloader();
    };

    var getUserProfileError = function(data){
        theApp.hidePreloader();
        theApp.alert("System Error", "Warning");
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
    return{
        theApp : theApp,
        getMerchantCount:getMerchantCount,
        getInitMerchants:getInitMerchants,
        //getUserProfile:getUserProfile,
        updateAddress:updateAddress,
        resetPasswrod:resetPassword,
        getFreshMechants:getFreshMechants,
        updatePhone:updatePhone
    }
});