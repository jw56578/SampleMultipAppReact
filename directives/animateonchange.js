angular.module(window.ELEADAPPNAME).directive('animateOnChange', function ($animate) {
    return function (scope, elem, attr) {
        scope.$watch(attr.animateOnChange, function (nv, ov) {
            if (nv != ov) {
                scope.$apply();

                var c = nv > ov ? 'fade-in' : 'fade';
                $animate.addClass(elem, c, function () {
                    $animate.removeClass(elem, c);
                });
            }
        })
    }
})