/**
 * Created by Administrator on 2016/1/27 0027.
 */
define(["jquery","../services/loginService"],function($, service){


    var theApp = service.theApp;

    var emailReg = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/i;
    var businessLogin = function (event) {


        var username = $("#business-username").val();
        var password = $("#business-password").val();

        if (username == "123" && password == "123") {
            window.location.replace("_BUSINESS/businesshome.html");
        } else {
            alert("Invalid username or password!!!!");
        }
    };

    var userLogin = function (event) {

        console.log("userLogin Business activated");
        var email = $("#user-username").val();
        var password = $("#user-password").val();
        console.log(email,password);
        if(email == '' || password == ''){
            theApp.alert("Please enter your email and passwrod");
        }
        else{
            service.userLogin(email,password);
        }

    };

    var register = function(data) {
        console.log("register activated");
        var email = $("#register-email").val() ;
        var password = $("#register-password").val();
        console.log(email+ " "+ password);
        if(email == '' || password == ''){
            theApp.alert("Please input email and password");
        }
        else if(!emailReg.test(email)){
            console.log("invalid email");
            theApp.alert("Please input a valid email");
        }
        else {
            service.register(email, password);
        }
    };

    var forgetpasswrod = function(){
        console.log('forget passwrod activated');
        var email = $('#forgetPassword-email').val();
        console.log(email);
        if(email == ''){
            theApp.alert("Please input email");
        }
        else if(!emailReg.test(email)){
            console.log("invalid email");
            theApp.alert("Please input a valid email");
        }
        else {
            service.forgetPassword(email);
        }

    };

    return{
        businessLogin : businessLogin,
        userLogin : userLogin,
        register:register,
        forgetPassword:forgetpasswrod,
        theApp : theApp

    }
});