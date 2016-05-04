'use strict'
angular.module('customerTrackingApp').controller('reportMonthController', function ($scope, tracking, common, $routeParams, serverInfo) {
    $scope.orderByField = "Date";
    $scope.reverseSort = true;
    $scope.showFilter = false;
    $scope.showDateRange = false;
    $scope.date = {};
    $scope.title = "History";
    init();
   
    function init(args) {
        $scope.data = tracking.get('reportmonth');
    }
    $scope.showDay = function (day) {
        tracking.set('reportDay', day);
        common.transitionTo('/day/');
    }
    $scope.showBack = true;

});