'use strict'
angular.module('customerTrackingApp').controller('dashboardController', function ($scope, tracking, common, $routeParams, serverInfo) {
    $scope.orderByField = "Date";
    $scope.reverseSort = true;
    $scope.date = {};
    $scope.date.from = tracking.get('startDate');
    $scope.date.to = tracking.get('endDate');

    $scope.refresh = function () {
        tracking.set('startDate', $scope.date.from);
        tracking.set('endDate', $scope.date.to);
        init({ start: $scope.date.from, end: $scope.date.to });
    }
    $scope.showFilter = false;
    $scope.showDateRange = true;
    
    $scope.title = "History";
    init({ start: $scope.date.from, end: $scope.date.to });
   
    function init(args) {
        $scope.data = tracking.getReport(args);
    }
    $scope.showDays = function (month) {

        tracking.set('reportmonth', month);
        common.transitionTo('/month/');
    }
});