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

    var mainView = theApp.addView('.view-main', {
        dynamicNavbar: true
    });
    // Export selectors engine
    var $$ = Dom7;



    var baseUrl = "http://47.88.30.91:8080/CouponManagementSystem/";


    var loginSuccess = function(data){

        if (data.result == 'success') {
            if(typeof(Storage) !== "undefined") {

                localStorage.setItem("username",data.username);
                getUserProfile(localStorage.getItem('username'));

            } else {
                theApp.hidePreloader();
                theApp.alert("Your phone do not support this version", "Warning");
            }


        } else if (data.result == 'fail') {
            theApp.hidePreloader();
            theApp.alert("Failed to login! Please try again.", "Warning");
        }
    };

    var businessLoginSuccess = function(data){
        if (data.result == 'success') {
            if(typeof(Storage) !== "undefined") {

                localStorage.setItem("staffname",data.username);

                window.location.replace("_BUSINESS/businesshome.html");
            } else {
                theApp.alert("Your phone do not support this version", "Warning");
            }


        } else if (data.result == 'fail') {
            theApp.alert("Failed to login! Please try again.", "Warning");
        }
    };

    var loginError = function(data){
        console.log(data);
        theApp.hidePreloader();
        theApp.alert("Error occurs!", "Error");
    };
    var userLogin = function(e,p){
        theApp.showPreloader();
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

    //getUserProfile
    var getUserProfileSuccess = function(data){
        localStorage.setItem("userProfile",JSON.stringify(data));
        window.location.replace("_USER/userhome.html");
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

    var businessLogin = function(e,p){
        console.log("login services activated");
        $.ajax({
            type:"POST",
            url:baseUrl+"staff/login",
            data:{email:e,password:p},
            success:businessLoginSuccess,
            error:loginError
        });
    };


    var registerSuccess = function(data) {

        if (data.result == 'success') {
            theApp.alert("Registration successfully!","Congraduation", "Warning");
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

    var register = function(e,p, phone, name, gender, birthday, address, suburb, state){
        console.log("service register activated");
        $.ajax({
            type: "POST",
            url: baseUrl+"user/register",
            data: {email: e, password: p, phone:phone, name:name, gender:gender, birthday:birthday, address:address, suburb:suburb, state:state},
            async :false,
            success:registerSuccess,
            error:registerError
        });
    };

    //user forget_password
    var forgetPasswordSuccess = function(data){
        console.log('forget password');
        theApp.hidePreloader();
        console.log(data);
        if(data.result == 'success'){
            theApp.alert("New Password has sent yout email", "");
        }else if(data.result == 'fail'){
            theApp.alert('send email fail', "Warning");
        }else if(data.result == 'email_not_exist'){
            theApp.alert('email not exist', "Warning");
        }else{
            theApp.alert('System get error', "Error");
            console.log(data);
        }
    };

    var forgetPasswordError = function(data){
        console.log('forget password');
        theApp.hidePreloader();
        theApp.alert('System Error','');
    };

    var forgetPasswrod = function(email){
        theApp.showPreloader();
        console.log('input forget password service');
        $.ajax({
            type: "POST",
            url: baseUrl+"user/forgotpassword",
            data: {email: email},
            success:forgetPasswordSuccess,
            error:forgetPasswordError
        })

    };

    var forgetPasswordBusiness = function(email){
        console.log('into forget Password Business service layer');
        theApp.showPreloader();
        $.ajax({
            type: "POST",
            url: baseUrl+"staff/forgotpassword",
            data: {email: email},
            success:forgetPasswordSuccess,
            error:forgetPasswordError
        });
    };

    return{
        businessLogin : businessLogin,
        register : register,
        userLogin : userLogin,
        forgetPassword:forgetPasswrod,
        forgetPasswordBusiness:forgetPasswordBusiness,
        theApp:theApp,
        mainView:mainView
    }
});