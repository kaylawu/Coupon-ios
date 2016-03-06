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
                    theApp.hidePreloader();
                    var userProfile = JSON.parse(localStorage.getItem('userProfile'));
                    console.log(address);
                    userProfile.address = address;
                    $('#currentAddress').replaceWith(address);
                    $('#textUpdateAddress').val('');
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
                    theApp.hidePreloader();
                    var userProfile = JSON.parse(localStorage.getItem('userProfile'));
                    userProfile.phone = phone;
                    $('#currentPhone').replaceWith(phone);
                    $('#textUserPhoneNum').val('');
                }
            },
            error:updatePhoneError
        });
    };


    //getUserProfile
    var getUserProfileSuccess = function(data){
        localStorage.setItem("userProfile",JSON.stringify(data));
    };

    var getUserProfileError = function(data){
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

    //get all Merchant count
    var getMerchantCountAll = function(){
      $.ajax({
          url:baseUrl+"/user/getmerchantcount",
          type:"GET",
          success:getMerchantCountAllSuccess,
          error:getMerchantCountAllError
      });
    };

    var getMerchantCountAllSuccess = function(data){
        localStorage.setItem("userMechantsAll",data.count);
    };

    var getMerchantCountAllError = function(data){
        theApp.alert("System error", "Error");
    }

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

    var getInitMerchantsAllSuccess = function(data){
      var content = '';
      _.each(data,function(v,k,list){
          content += merchantAllHtmlHtmlHelper(v);
      });

      $('.allMerchants ul').append(content);
      $('.infinite-scroll-preloader').append('<div class="preloader"></div>');
      theApp.hidePreloader();
    }

    var getInitMerchantsAllError = function(data){
        console.log("system error");
        if(data.result == 'error'){
            theApp.alert("System error", "Error");
        }else if(data.result == 'out_of_index'){
            theApp.alert("Out of index", "Error");
        }
    };

    var getInitMerchantsAll = function(username, needItemNum, existItemNum){
        $.ajax({
          url:baseUrl+"/user/getmerchants",
          type:"GET",
          data:{username:username,needItemNum:needItemNum,existItemNum:existItemNum},
          success:getInitMerchantsAllSuccess,
          error:getInitMerchantsAllError
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

    var getFreshMechantsAllSuccess = function(data){
      var content = '';
      _.each(data,function(v,k,list){
        if (k == localStorage.getItem("userMechantsAll")) {
          content += merchantAllHtmlHtmlHelper(v);
          theApp.detachInfiniteScroll($$('.infinite-scroll'));

          $$('.infinite-scroll-preloader').remove();
        } else {
            content += merchantAllHtmlHtmlHelper(v).remove();
        }
      });
      $('.allMerchants ul').append(content);
      localStorage.setItem("merchantAllScroll", false);
    };

    var getFreshMechantsAllError = function(data){
        console.log("system error");
        if(data.result == 'error'){
            theApp.alert("System error", "Error");
        }else if(data.result == 'out_of_index'){
            theApp.alert("Out of index", "Error");
        }
        localStorage.setItem("merchantAllScroll",false);
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

    var getFreshMechantsAll = function(username, needItem, existItemNum){
      $.ajax({
        url:baseUrl + "/user/getmerchants",
        type:"GET",
        data:{username:username,needItemNum:needItemNum,existItemNum:existItemNum},
        success:getFreshMechantsAllSuccess,
        error:getFreshMechantsAllError
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

    var merchantAllHtmlHtmlHelper = function(v){
      var content = '<li> <div class="col-100 tablet-50"> <div class="tc-product"><a href=shopdetail.html?shopId=' + v.merchantId + 'class="title">';
      content += '<img src=' + imgBaseUrl + v.logoUrl + '/><div class="details"> <div class="head"><h3>' + v.merchantName + '</h3>'
      content += '<h3>Chatswood</h3> </div> <div class="buttons"> <a href="#"><i class="uiicon-web39 color-orange"></i> Your points:' + v.userPoints + '</a>'
      content += '<a href="shopdetail.html?shopId=' + v.merchantId + '><i class="uiicon-web38"></i> Details</a>'
      content += '</div></div></a></div></div>';
      return content;
    }

    return{
        theApp : theApp,

        getMerchantCount:getMerchantCount,
        getMerchantCountAll:getMerchantCountAll,
        getInitMerchants:getInitMerchants,
        getInitMerchantsAll:getInitMerchantsAll,
        getUserProfile:getUserProfile,
        updateAddress:updateAddress,
        resetPasswrod:resetPassword,
        getFreshMechants:getFreshMechants,
        getFreshMechantsAll:getFreshMechantsAll,
        updatePhone:updatePhone
    }
});