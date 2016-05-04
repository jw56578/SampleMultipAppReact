'use strict'
angular.module('customerTrackingApp').controller('sessionsController',
    function ($scope, $route, $timeout, api, common, tracking, coupon, observe, serverInfo,$window) {
    $scope.orderByField = 'LastPageVisit';
    $scope.filter = {};
    $scope.showLoadingBar = true;
    $scope.reverseSort = true;
    $scope.title = $route.current.$$route ? $route.current.$$route.title : 'Online';
    $scope.getLatestEvent = tracking.getLatestEvent;
    $scope.getParameterFromLatestEvent = tracking.getParameterFromLatestEvent;
    $scope.getParameterValue = function (event, key) {
        var p = tracking.getParameter(event, key);
        return p == null ? "" : p.Value;
    }
    $scope.sendCoupon = function (session) {
        var cId = tracking.getParameterFromLatestEvent(session, 'connectionid').Value;
        coupon.sendCoupon(cId, 1);
    }
    $scope.go = function (session) {
        common.transitionTo('session/' + session.Id);
    };
    $scope.changeClaimedView = function () {
        $scope.unclaimed = $scope.unclaimed == "!" ? "!!" : "!";
        tracking.set('claimedview', $scope.unclaimed);
    };
    $timeout.cancel(tracking.get('getSessionsTimeout'));
    getData();
    function getData() {
        tracking.getSessions().$promise.then(function (c) {
            $scope.data = c;
            $scope.showLoadingBar = false;
            tracking.set('getSessionsTimeout', $timeout(getData, serverInfo.pollTimeout));
        },
        function (e) {//failed - if everything else is operating properly, this will only occur when the user is logged out of the system
            $window.location.reload(true);
        });
        
    }
    $scope.$on("$destroy", function () {
        $timeout.cancel(tracking.get('getSessionsTimeout'));
    });
});