'use strict'
angular.module('customerTrackingApp').controller('chartController', function ($scope, tracking, common, $routeParams, serverInfo) {
    $scope.showDateRange = true;
    $scope.date = {};
    $scope.title = "Charts";
    $scope.date.from = tracking.get('startDate');
    $scope.date.to = tracking.get('endDate');
    $scope.refresh = function () {
        tracking.set('startDate', $scope.date.from);
        tracking.set('endDate', $scope.date.to);
        init({ start: $scope.date.from, end: $scope.date.to });
    }
    $scope.showFilter = false;
    $scope.showDateRange = true;
    init({ start: $scope.date.from, end: $scope.date.to });
    function init(args) {
        $scope.data = tracking.getReport(args).$promise.then(function (e) {
            google.load('visualization', '1', { packages: ['corechart'], callback: drawmethod0 });


            function drawmethod0() {
               
                var data = new google.visualization.DataTable({
                    cols: [
                        { id: 'Name', label: 'Name', type: 'string' },
                        { id: 'Unique Visits', label: 'Unique Visits', type: 'number' },
                        { id: 'Sold', label: 'Sold', type: 'number' },
                        { id: 'Appointments', label: 'Appointments', type: 'number' },
                        { id: 'Leads', label: 'Leads', type: 'number' },
                        { id: 'Offers Delivered', label: 'Offers Delivered', type: 'number' }],
                    rows: [
                        {
                            c: [
                              { v: '' },
                              { v: e.UniqueVisits },
                              { v: e.CouponSales },
                              { v: e.CouponAppointments },
                              { v: e.LeadsGeneratedByCoupon },
                              { v: e.CouponsSent }
                            ]
                        }
                    ]
                }); var options = ApplyStandardOptions({ title: '', legend: { position: 'top' } });
                var chart = new google.visualization.ColumnChart(document.getElementById('barchart'));
                chart.draw(data, options);
                return chart;
            }

        });


        




    }
    $scope.showDays = function (month) {
        tracking.set('reportmonth', month);
        common.transitionTo('/month/');
    }
});