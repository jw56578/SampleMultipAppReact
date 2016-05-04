'use strict'
angular.module('customerTrackingApp').controller('reportDayController', function ($scope, tracking, common, $routeParams, serverInfo) {
    $scope.showBack = true;
    $scope.showFilter = false;
    $scope.showDateRange = false;
    $scope.date = {};
    $scope.title = "History";
    $scope.orderByField = "LastVisitDate";
    $scope.reverseSort = true;

    init();
    function init(args) {
        var day = tracking.get('reportDay');
        $scope.data = tracking.getReportDay(day.Date);
    }
});