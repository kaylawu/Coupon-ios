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
      var imgBaseUrl = 'http://47.88.30.91:8080';


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

    //getInitMerchants
    var getInitMerchantsSuccess = function(data){
        var content = '';
        _.each(data,function(v,k,list){
            content += mechantHtmlHelper(v);
        });

        $('.userPoint ul').append(content);
        $('.infinite-scroll-preloader').append('<div class="preloader"></div>');
        theApp.hidePreloader();
    };


    var getInitMerchantsError = function(data){
        console.log("system error");
        if(data.result == 'error'){
            theApp.alert('System get error');
        }else if(data.result == 'out_of_index'){
            theApp.alert('out of index');
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
            theApp.alert('System get error');
        }else if(data.result == 'out_of_index'){
            theApp.alert('out of index');
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

    return{
        theApp : theApp,

        getMerchantCount:getMerchantCount,
        getInitMerchants:getInitMerchants,
        getUserProfile:getUserProfile,
        updateAddress:updateAddress,
        resetPasswrod:resetPassword,
        getFreshMechants:getFreshMechants


    }
});