angular.module(window.ELEADAPPNAME).directive('colorpicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $(function () {
                element.colpick({
                    layout:'hex',
                    submit:0,
                    colorScheme:'light',
                    onChange:function(hsb,hex,rgb,el,bySetColor) {
                        $(el).css('background','#'+hex);
                        // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
                        if (!bySetColor) $(el).val(hex);
                        ngModelCtrl.$setViewValue(hex);
                        scope.$apply();
                    }
                }).keyup(function(){
                    $(this).colpickSetColor(this.value);
                });
            });
        }
    }
});
