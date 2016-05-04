'use strict'
angular.module('customerTrackingApp').controller('ipSessionsController', function ($scope, $route, api, common, tracking, coupon, observe, serverInfo) {
    $scope.orderByField = 'lastVisit';
    $scope.showLoadingBar = true;
    $scope.reverseSort = true;

    $scope.title = 'Sessions for IP';
    $scope.data = tracking.get('ipsessions');
    $scope.data.$promise.then(function () { $scope.showLoadingBar = false; });
    $scope.getLatestEvent = tracking.getLatestEvent;
    $scope.getParameterFromLatestEvent = tracking.getParameterFromLatestEvent;
    $scope.getParameterValue = function (event, key) {
        var p = tracking.getParameter(event, key);
        return p == null ? "" : p.Value;
    }
    $scope.go = function (session) {
        common.transitionTo('session/' + session.Id);
    };
    $scope.changeClaimedView = function () {
        $scope.unclaimed = $scope.unclaimed == "!" ? "!!" : "!";
        tracking.set('claimedview', $scope.unclaimed);
    };

});