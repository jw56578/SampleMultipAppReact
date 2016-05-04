(function () { 
    'use strict';
    angular.module(window.ELEADAPPNAME).directive('fileUpload', ['common', fileUpload]);
    function setPreview(img, previewId, file,done) {
        var placeHolder = $('#' + previewId);
        placeHolder.empty();
        var image = $(new Image()).appendTo(placeHolder);
        image.width(placeHolder.width());
        image.height(placeHolder.height());
        var preloader = new mOxie.Image();
        preloader.onload = function () {
            preloader.downsize(300, 300);
            var url = preloader.getAsDataURL();
            image.prop("src", url);
            done(url);
        };
        preloader.load(file.getSource());
    }
    function fileUpload(common) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                'startUpload': '=',
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                //need to set the id because that is how plupload identifies what makes it start working
                if (!attrs.id) {
                    attrs.$set('id', 'theelementthatwhenclickedopenspluplad');
                }
                var uploader = new plupload.Uploader({
                    runtimes: 'html5,flash,silverlight,html4',
                    browse_button: attrs.id, // you can pass in id...
                    //container: element[0], // ... or DOM Element itself
                    url: attrs.plurl,
                    filters: {
                        max_file_size: '10mb',
                        mime_types: [
                            { title: "Image files", extensions: "jpg,png" },
                            { title: "Zip files", extensions: "zip" }
                        ]
                    },
                    // Flash settings
                    flash_swf_url: common.getMainPath() + 'scripts/plupload/js/Moxie.swf',
                    // Silverlight settings
                    silverlight_xap_url: common.getMainPath() + 'scripts/plupload/js/Moxie.xap',
                    init: {
                        PostInit: function () {
                        },

                        FilesAdded: function (up, files) {
                            if (attrs.previewId)
                                setPreview(new o.Image(), attrs.previewId, files[0], function (url) {
                                    ngModelCtrl.$setViewValue({ uploader: up, files: files,base64Url:url });
                                    scope.$apply();
                                });
                            else {
                                ngModelCtrl.$setViewValue({ uploader: up, files: files });
                                scope.$apply();
                            }

                        },

                        UploadProgress: function (up, file) {
                        },

                        Error: function (up, err) {
                        }
                    }
                });
                uploader.init();
            }
        }
    }
})()