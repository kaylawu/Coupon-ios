"use strict"
/**
 * Created by yequan on 2016/2/1.
 */
define(["jquery","framework7"],function($,Framework7){


    // Initialize your app
    var theApp = new window.Framework7({
        swipeBackPage: false,

        init: false
    });

    // Export selectors engine
    var $$ = Dom7;



    var baseUrl = "http://47.88.30.91:8080/CouponManagementSystem/";
    var loginSuccess = function(data){

        if (data.result == 'success') {
            if(typeof(Storage) !== "undefined") {

                localStorage.setItem("username",data.username);

                window.location.replace("_USER/userhome.html");
            } else {
                theApp.alert("Your phone do not support this version");
            }


        } else if (data.result == 'fail') {
            theApp.alert("Failed to login! Please try again.");
        }
    };

    var loginError = function(data){
        console.log(data);

        theApp.alert('Error occurs!');
    };
    var userLogin = function(e,p){

        console.log("login services activated");
        $.ajax({
            type:"POST",
            url:baseUrl+"user/login",
            data:{email:e,password:p},
            async:false,
            success:loginSuccess,
            error:loginError
        });
    };


    var registerSuccess = function(data) {

        if (data.result == 'success') {
            theApp.alert("Registration successfully!","Congraduation");
        } else if (data.result == 'user_exists') {
            $('.input').val("");
            theApp.alert("User existed!","Warning");

        } else if (data.result == 'fail') {
            $('.input').val("");
            theApp.alert("Failed to register user! Please try again.","Warning");

        }
    };
    var registerError = function(data){

        theApp.alert('Error occurs!',"Error");
        console.log(data);
    };
    var register = function(e,p){
        console.log("service register activated");
        $.ajax({
            type: "POST",
            url: baseUrl+"user/register",
            data: {email: e, password: p},
            async :false,
            success:registerSuccess,
            error:registerError
        });
    };

    //user forget_password
    var forgetPasswordSuccess = function(data){
        if(data.result == 'success'){
            theApp.alert('New Password has sent yout email');
        }

    };

    var forgetPasswordError = function(data){
        if(data.result == 'fail'){
            theApp.alert('send email fail');
        }else if(data.result == 'email_not_exist'){
            theApp.alert('email not exist');
        }else{
            theApp.alert('System get error');
            console.log(data);
        }
    };

    var forgetPasswrod = function(email){
        console.log('input forget password service');
        $.ajax({
            type: "POST",
            url: baseUrl+"/user/forgotpassword",
            data: {email: email},
            success:forgetPasswordSuccess,
            error:forgetPasswordError
        })

    };

    return{
        register : register,
        userLogin : userLogin,
        forgetPassword:forgetPasswrod,
        theApp:theApp
    }
});