'use strict'
angular.module('customerTrackingApp').controller('sessionController',
    function ($scope, $resource, $timeout, api, common, tracking, coupon, $routeParams, serverInfo,$window) {
    $scope.orderByField = 'DateEntered';
    $scope.userId = serverInfo.userId;
    $scope.showLoadingBar = true;
    $scope.reverseSort = true;
    $scope.title = "Session";
    $scope.currentCoupon = null;
    $scope.coupons = api.query({ type: 'CouponCollection', data: {} });
    $scope.canSendCoupon = function () {
        return serverInfo.canSendCoupon
    }
    $scope.filter = {};
    $scope.claim = function () {
        $scope.data.ClaimedByUserId = serverInfo.userId;
        //i don't want to save all the events, how else should this be handled
        var events = $scope.data.Events;
        delete $scope.data.Events;
        delete $scope.data.BrokenRulesCollection;
        var TSC = $resource('?api=TrackingSession');
        TSC.save($scope.data, function () {
            $scope.data.Events = events;
        });
    }
    $scope.sendCoupon = function () {
        if (!$scope.currentCoupon) {
            return;
        }
        api.save({ type: 'CouponOffer', data: {
            TrackingSessionId: $scope.data.Id,
            CouponId:$scope.currentCoupon.Id,
            CompanyId:serverInfo.companyId,
            UserId:serverInfo.userId
        } });
        $scope.data.CouponStatus = 'CouponSent';
    };
    $scope.goToIps = function (session) {
        tracking.set('ipsessions', $scope.sessionsByIpAddress);
        common.transitionTo('ips/');
    };
    $timeout.cancel(tracking.get('getSessionTimeout'));
    getData();
    function getData() {
        var session = tracking.getSession($routeParams.id);
        session.$promise.then(function (e) {
            if (e.Id) { //else system logged out or other error
                $scope.data = e;
                $scope.canSendCoupon = function () {
                    return !$scope.data.CouponStatus && serverInfo.canSendCoupon && (serverInfo.userId == $scope.data.ClaimedByUserId || !$scope.data.ClaimedByUserId);
                }
                if (!$scope.sessionsByIpAddress) {
                    //$scope.sessionsByIpAddress = api.query({ type: 'TrackingSessionCollection', data: { method: 'getbyip', ipaddress: $scope.data.IpAddress } });
                }
                $scope.showLoadingBar = false;
                tracking.set('getSessionTimeout', $timeout(getData, serverInfo.pollTimeout));
            }
            else {
                $window.location.reload(true);
            }
        });
        
    }
    $scope.$on("$destroy", function () {
        $timeout.cancel(tracking.get('getSessionTimeout'));
    });
});