"use strict"
define(["jquery", "../services/couponService","../services/mobileService"], function ($, service,mobile) {

	var theApp = service.theApp;

	var $$ = Dom7;
	var getInitData = function() {

		service.getCouponCount(localStorage.getItem("username"), "All");

		var tid = setInterval(pageLoading, 1000);

		function pageLoading() {
			if (localStorage.getItem("AllUserCoupons") !== null) {
				clearInterval(tid);

				if (localStorage.getItem("AllUserCoupons") > 0) {

					if (localStorage.getItem("AllUserCoupons") <= 6) {
						service.getInitCoupons(localStorage.getItem("username"), localStorage.getItem("AllUserCoupons"), 0);

						theApp.detachInfiniteScroll($$('.infinite-scroll'));
						$$('.infinite-scroll-preloader').remove();
					} else {
						service.getInitCoupons(localStorage.getItem("username"), 6, 0);
					}
				}
			}
		}
	};

	var refreshPage = function(){
		var username = localStorage.getItem("username");

		var lastIndex = $$('.userCoupon li').length;

		var maxItems = localStorage.getItem('AllUserCoupons');

		var itemsPreLoad = 5;

		if (JSON.parse(localStorage.getItem("couponsScroll"))) return;

		localStorage.setItem("couponsScroll",true);

		if (maxItems - lastIndex >= itemsPreLoad) {
			service.getFreshCoupons(username, itemsPreLoad, lastIndex);
		} else {
			service.getFreshCoupons(username, maxItems - lastIndex, lastIndex);
		}
	};

	return {
		getInitData:getInitData,
		refreshPage:refreshPage
	}
});