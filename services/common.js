'use strict'
angular.module(window.ELEADAPPNAME).factory('common', function ($location) {
    return {
        getMainPath: function () {
            var url = window.location.href;
            if (url.indexOf("?") > 0)
                url = url.split("?")[0];
            url = url.substr(0, url.lastIndexOf("/") + 1);
            var paths = url.toLowerCase().split("/");
            var i;
            for (i = 0; i < paths.length; i++)
                if (paths[i] == "elead_track")
                    break;

            url = "";
            i += 2;
            for (; i < paths.length; i++)
                url += "../";
            return url;
        },
        transitionTo: function (path) {
            $location.path(path);
        }
    }
        
});