angular.module('couponManagerApp'
    , ['ngRoute', 'ngSanitize', 'ngResource'
        , window.ELEADAPPNAME])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
            when('/coupon/:couponId', {
                templateUrl: '../app/coupon/coupondetail.html',
                controller: 'couponDetailController'
            }).
            when('/coupons', {
                templateUrl: '../app/coupon/coupons.html',
                controller: 'CouponController'
            }).
            when('/admin', {
                    templateUrl: '../app/coupon/admin.html',
                    controller: 'couponAdminController'
                }).
            otherwise({
                redirectTo: '/coupons'
            });
}]);
