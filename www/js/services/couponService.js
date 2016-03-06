'user strict'

define(['jquery', 'framework7','underscore'], function ($, Framework7,_) {

        //AppInit
        var theApp = new window.Framework7({
            swipeBackPage: true,
            init: false
        });

        var $$ = Dom7;

    //Start to write Services
    var baseUrl = 'http://47.88.30.91:8080/CouponManagementSystem';
    var imgBaseUrl = 'http://47.88.30.91:8080';

    var getCouponCount = function(username, status){
        $.ajax({
            url:baseUrl+"/user/getcouponcount",
            type:"GET",
            data:{username:username,status:status},
            success:getCouponCountSuccess,
            error:getCouponCountError
        });
    };

    var getCouponCountSuccess = function(){
        localStorage.setItem("userCoupons",data.count);
    };

    var getCouponCountError = function () {
        theApp.alert("System error", "Error");
    };

    var getInitCoupons = function(username,needItemNum,existItemNum){
        $.ajax({
            url:baseUrl+"/user/getcoupons";
            type:"POST",
            data:{username:username,needItemNum:needItemNum,existItemNum:existItemNum}
            success:getInitCouponsSuccess,
            error:getInitCouponsError
        });
    };

    var getInitCouponsSuccess = function(data){

    };

    var getInitCouponsError = function(data){
        if (data.result == 'error') {
            theApp.alert("System error", "Error");
        } else if (data.result == 'out_of_index') {
            theApp.alert("Out of index", "Error")
        }
    };

    return{
        theApp:theApp,
        getCouponCount:getCouponCount
    }
});
