(function () { 

'use strict'
angular.module('customerTrackingApp').controller('trackingController', ['$window', '$scope', 'serverInfo', 'tracking','$timeout',trackingController]);

function trackingController($window, $scope, serverInfo, tracking, $timeout) {
    var s = $scope;
    s.currentDate = serverInfo.currentDate;
    s.canSendCoupon = serverInfo.canSendCoupon;
    s.canEditCoupon = serverInfo.canEditCoupon;
    s.showLoadingBar = false;
    s.showFilter = true;
    s.showBack = true;
    s.fileupload = {};
    s.goBack = function () {
        $window.history.back();
    }
    s.header = {};
    init();
    function init() {
        tracking.getStats().$promise.then(function (e) {
            if (e.online != undefined) {//else the system has logged out
                s.header.stats = e;
                $timeout(init, serverInfo.pollTimeout);
            }
            else {
                $window.location.reload(true);
            }
        });
        
    }
   
}


})()