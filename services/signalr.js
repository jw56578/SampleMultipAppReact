'use strict'
angular.module(window.ELEADAPPNAME).factory('signalr', function ( $q) {
    var conn = null;
    if (window.__jqelc__) {
        conn = window.__jqelc__.connection;
    }
    else if (window.$) {
        conn = window.$.connection;
    }

    return {
        start: function () {
            return conn.hub.start();
        },
        getHub: function (name) {
            return conn[name];
        }
       
    }
});

