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
        var content = '';
        _.each(data,function(v,k,list) {
            content += couponHtmlHelper(v);
        });

        $('.userCoupon ul').append(content);
        $('.infinite-scroll-preloader').append('<div class="preloader"></div>');
    };

    var getInitCouponsError = function(data){
        if (data.result == 'error') {
            theApp.alert("System error", "Error");
        } else if (data.result == 'out_of_index') {
            theApp.alert("Out of index", "Error")
        }
    };

    var couponHtmlHelper = function(v) {
        var content = '<li> <div class="card facebook-card"> <div class="card-header no-border center"> <h3>' + v.merchantName + '</h3></div>';
        content += '<div class="card-content"> <img src=' + imgBaseUrl + v. 
    };

<div class="card facebook-card">
                        <div class="card-header no-border center">
                          <h3>Shop Name</h3>
                        </div>
                          <div class="card-content">
                            <img src="../img/voucher_5dollar.png" width="100%">
                          </div>
                        <div class="card-footer no-border">
                            <a href="#" data-popup=".popup-qr" class = "open-popup link">Use Voucher</a>
                            <p><a href="#" data-popup=".popup-terms" class = "open-popup">Terms</a></p>
                            <p>Expire: 05/05/2016 </p>
                        </div>
                    </div>
    return{
        theApp:theApp,
        getCouponCount:getCouponCount,
        getInitCoupons:getInitCoupons
    }
});
