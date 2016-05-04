'use strict';

angular.module('customerTrackingApp').directive('sessionInformation', function ($compile,tracking) {

    return {
        restrict:'E',
        templateUrl: '../app/tracking/sessioninformation.html',
        scope: {
            session: "=session",
            getParameterFromLatestEvent: tracking.getParameterFromLatestEvent,
            getLatestEvent: tracking.getLatestEvent
        }

    }
});
  