'use strict'
angular.module(window.ELEADAPPNAME).factory('observe', function () {
    var observers = [];
    return {
        register: function (event,fn) {
            observers.push({event:event,func:fn});
        },
        trigger: function (event,data) {
            var l = observers.length;
            while (l--) {
                if (observers[l].event == event) {
                    observers[l].func(data);
                }
            }
        }
    }

});