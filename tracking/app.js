'use strict'

angular.module('customerTrackingApp', [
            'ngRoute','ngResource',
            window.ELEADAPPNAME
]).config(function ($routeProvider) {
    $routeProvider.when('/session/:id', {
        templateUrl: '../app/tracking/session.html',
        controller: 'sessionController'
    }).when('/all', {
        templateUrl: '../app/tracking/sessions.html',
        controller: 'sessionsController',
        title:'All'
    }).when('/claimed', {
        templateUrl: '../app/tracking/sessions.html',
        controller: 'sessionsController',
        title:"Claimed"
    }).when('/unclaimed', {
        templateUrl: '../app/tracking/sessions.html',
        controller: 'sessionsController',
        title:"Unclaimed"
    }).when('/withoutcoupon', {
        templateUrl: '../app/tracking/sessions.html',
        controller: 'sessionsController',
        title:'Without Coupon'
    }).when('/online', {
        templateUrl: '../app/tracking/sessions.html',
        controller: 'sessionsController',
        title: 'Online'
    }).when('/leads', {
        templateUrl: '../app/tracking/sessions.html',
        controller: 'sessionsController',
        title: 'Leads'
    }).when('/ips', {
        templateUrl: '../app/tracking/sessions.html',
        controller: 'ipSessionsController'
    }).when('/couponsettings', {
        templateUrl: '../app/tracking/couponsettings.html',
        controller: 'couponSettingsController'
    }).when('/month', {
        templateUrl: '../app/tracking/reportmonth.html',
        controller: 'reportMonthController'
    }).when('/day', {
        templateUrl: '../app/tracking/reportday.html',
        controller: 'reportDayController'
    }).when('/chart', {
        templateUrl: '../app/tracking/chart.html',
        controller: 'chartController'
    }).when('/history', {
        templateUrl: '../app/tracking/dashboard.html',
        controller: 'dashboardController'
    }).otherwise({
    templateUrl: "../app/tracking/sessions.html",
    controller: "sessionsController",
    title: "Online"
    });
}).filter('sessions', function ($route) {
    return function (input) {
        var filtered = [];
        angular.forEach(input, function (item) {
            if ($route.current.$$route) {
                if ($route.current.$$route.originalPath == "/unclaimed") {
                    if (!item.ClaimedByUserId)
                        filtered.push(item);
                }
                else if ($route.current.$$route.originalPath == "/claimed") {
                    if (item.ClaimedByUserId)
                        filtered.push(item);
                }
                else if ($route.current.$$route.originalPath == "/withoutcoupon") {
                    if (!item.LastCouponSentTitle)
                        filtered.push(item);
                }
                else if ($route.current.$$route.originalPath == "/online") {
                    if (item.Online)
                        filtered.push(item);
                }
                else if ($route.current.$$route.originalPath == "/all") {
                    filtered.push(item);
                }
                else if ($route.current.$$route.originalPath == "/leads") {
                    if (item.CustomerId)
                        filtered.push(item);
                }
            }
            else {
                if (item.Online)
                    filtered.push(item);
            }
        });
        return filtered;


    };
});
