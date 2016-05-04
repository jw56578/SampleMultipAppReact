angular.module('customerTrackingApp').controller('couponSettingsController', function ($scope, $http, $resource, common) {
    $scope.title = "Coupon Settings";
    $scope.showSave = true;
    var CouponSettings = $resource('?api=CouponAdmin');
    $scope.couponSettings = CouponSettings.get({ Id: 2 }, function () {

    });
    $scope.save = function () {
        CouponSettings.save($scope.couponSettings, function () {

        });
    }
});