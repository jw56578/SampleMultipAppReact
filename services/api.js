'use strict'
angular.module(window.ELEADAPPNAME).factory("apiResource", function ($resource) {
    return {
        get: function (args) {
            var TSC = $resource('?api=' + args.type);
            return TSC.get(args.data, function () { });
        },
        query: function (args) {
            var TSC = $resource('?api=' + args.type);
            return TSC.query(args.data, function () { });
        },
        save: function (args) {
            var TSC = $resource('?api=' + args.type);
            return TSC.save(args.data, function () { });
        },
        saveArray: function (args) {
            var TSC = $resource('?api=' + args.type, {}, {
                'save': { method: 'POST', isArray: true }
            });
            return TSC.save(args.data, function () { });
        }

    };
});

angular.module(window.ELEADAPPNAME).provider("api", function () {
    var provider = {};

    var config = { configParam: "default" };
    provider.config = function (configParam) {
        config = configParam;
    }
    provider.$get = function ($injector) {
        return $injector.get('apiResource');
    }
    return provider;

});

