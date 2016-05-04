angular.module('couponManagerApp').controller('couponAdminController', function ($scope, $http, $resource,bootstrappedData, common) {

    var CouponSettings = $resource('?api=CouponAdmin');
  $scope.couponSettings = CouponSettings.query({ Id: 2 }, function () {

  });


});