angular.module('couponManagerApp').controller('couponDetailController', function ($scope, $http, $routeParams, common, coupon) {

    $scope.editCoupon = true;

    $scope.layouts = coupon.store().layouts ? coupon.store().layouts : coupon.getLayouts();//.store.layouts;
    $scope.makes = coupon.store().makes ? coupon.store().makes : coupon.getMakes();
    $scope.types = coupon.store().types ? coupon.store().types : coupon.getTypes();

    $scope.isNumber = angular.isNumber;
    $scope.newUsed = [{ value: 'New' }, { value: 'Used' }];
    $scope.currentLayout = null;
    $scope.currentType = null;
    $scope.currentCoupon = null;
    $scope.masterCopy = null;
    $scope.fileupload = {};
    $scope.fileupload.stuff = {};
    $scope.mask = $.getMask('Saving');
    $scope.mask.hide();



    //load
    if ($routeParams.couponId == 0) {
        console.log(coupon.store().coupons);
        var currentCoupon = { Id: 0, Active: true, Title: '', ImageId: 0 };
        $scope.currentCoupon = currentCoupon;
        $scope.headerTitle = "Build Coupon";
        coupon.store().coupons.push(currentCoupon);

        $scope.currentCoupon.Header = 'A VERY SPECIAL OFFER';
        $scope.currentCoupon.FormTitle = 'Claim Your Offer Now!';
    }
    else {
        var couponColl = coupon.store().coupons ? coupon.store().coupons : coupon.getCoupons();
        var l = couponColl.length;
        while (l--) {
            if ($routeParams.couponId == coupon.store().coupons[l].Id) {
                $scope.currentCoupon = coupon.store().coupons[l];

                $scope.headerTitle = "Edit Coupon";
                //quick fix - json.net is serializing differently per Environment, in mainline IsChild is null but in branch its true
                delete $scope.currentCoupon.IsChild;
                //if the user cancels the changes - revert to original version called - masterCopy
                $scope.masterCopy = angular.copy($scope.currentCoupon);

                break;
            }
        }
    }

    if ($scope.currentCoupon)
        $scope.currentCoupon.base64 = null;
    //end load

    //handlers
    $scope.$watch('currentLayout', function (n, o) {
        if (n) {
            $scope.currentCoupon.CouponLayoutId = n.Id;
        }
        else if (isUndefinedOrNull($scope.currentLayout) && $scope.currentCoupon.CouponLayoutId) {
            angular.forEach($scope.layouts, function (l) {
                if (l.Id == $scope.currentCoupon.CouponLayoutId)
                    $scope.currentLayout = l;
            });
        }
    });

    $scope.$watch('currentType', function (n, o) {
        if (n)
            $scope.currentCoupon.CouponTypeId = n.Id;
        else if (isUndefinedOrNull($scope.currentType) && $scope.currentCoupon.CouponTypeId) {
            angular.forEach($scope.types, function (t) {
                if (t.Id == $scope.currentCoupon.CouponTypeId) {
                    $scope.currentType = t;
                }
            });
        }
    });

    $scope.$watch('currentNewUsed', function (n) {
        if (n)
            $scope.currentCoupon.NewUsed = n.value;
        else if (isUndefinedOrNull($scope.currentNewUsed) && $scope.currentCoupon.NewUsed) {
            angular.forEach($scope.newUsed, function (u) {
                if (u.value == $scope.currentCoupon.NewUsed)
                    $scope.currentNewUsed = u;
            });
        }
    });

    $scope.$watch('currentMake', function (m) {
        if (m) {
            $scope.currentCoupon.Make = m.Value;
            //get models
            $scope.models = coupon.getModels(m.Key);

        }
        else if (isUndefinedOrNull($scope.Makes) && $scope.currentCoupon.Make) {
            angular.forEach($scope.makes, function (t) {
                if (t.Value == $scope.currentCoupon.Make) {
                    $scope.currentMake = t;
                }
            });
        }
    });

    $scope.$watch('fileupload.stuff.base64Url', function () {
        if ($scope.fileupload.stuff && $scope.fileupload.stuff.base64Url) {
            if ($scope.currentCoupon.ImageId > 0)
                $scope.currentCoupon.ImageId = 0;
        }
    });

    $scope.$watch('currentCoupon'), function () {

    }
    //end handlers

    $scope.save = function (fnc) {
        $scope.mask.show();
        if ($scope.fileupload.stuff && $scope.fileupload.stuff.base64Url) { // else no image was selected
            //save image - wait on promise, push ID into coupon model
            var base = $scope.fileupload.stuff.base64Url.split(",")[1];
            $scope.currentCoupon.baseImage = base;
        }

        if ($scope.currentCoupon.CouponTypeId != 3682) {
            //set make and model to ''
            $scope.currentCoupon.Make = '';
            $scope.currentCoupon.Model = '';
        }
        coupon.saveCoupon(
            $scope.currentCoupon
            , function (newCoupon) {
                $scope.mask.hide();
                $scope.currentCoupon.ImageId = newCoupon.ImageId;
                $scope.currentCoupon.Id = newCoupon.Id;
                //common.transitionTo('/#coupons');
            }
        );
    }

    $scope.back = function () { history.back() };

    $scope.cancel = function () {
        if ($scope.currentCoupon.Id == 0) {
            console.log('remove this instance of coupon');
            var c = coupon.getCoupons().length;
            while (c--) {
                if (JSON.stringify(coupon.store().coupons[c]) === JSON.stringify($scope.currentCoupon)) {
                    coupon.store().coupons.splice(c, 1);
                }
            }
        }
        else {
            angular.copy($scope.masterCopy, $scope.currentCoupon);
            console.log('navigate back to main page and undo changes');
        }
        common.transitionTo('/#coupons');
    }

    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val == null;
    }

    $scope.fileupload = {};

    $scope.handleLayoutChange = function (layoutId) {
        angular.forEach($scope.layouts, function (l) {
            if (l.Id === layoutId) {
                $scope.currentLayout = l;
            }
        });

        toggleLayoutButtons(layoutId);
    };

    function toggleLayoutButtons(layoutId) {
        var layoutButtonIdPrefix = "couponButton_";
        var selectedLayoutButtonId = layoutButtonIdPrefix + layoutId;

        var layoutButtons = document.getElementsByClassName('couponButton');

        for (var i = 0, len = layoutButtons.length; i < len; i++) {
            var layoutButton = layoutButtons[i];
            var layoutButtonId = layoutButton.id;

            if (layoutButtonId === selectedLayoutButtonId) {
                layoutButton.style.backgroundImage = "url('button" + layoutId + "_green.png')"

                //layoutButton.onmouseover = function () {
                //    layoutButton.style.backgroundImage = "url('button" + layoutId + "_green.png')";
                //}

                //layoutButton.onmouseout = function () {
                //    layoutButton.style.backgroundImage = "url('button" + layoutId + "_green.png')";
                //}
            } else {
                var correspondingLayoutId = layoutButtonId.split(layoutButtonIdPrefix)[1];

                layoutButton.style.backgroundImage = "url('button" + correspondingLayoutId + "_grey.png')";

                //layoutButton.onmouseover = function () {
                //    layoutButton.style.backgroundImage = "url('button" + correspondingLayoutId + "_green.png')";
                //}

                //layoutButton.onmouseout = function () {
                //    layoutButton.style.backgroundImage = "url('button" + correspondingLayoutId + "_grey.png')";
                //}
            }
        }
    }

    //$scope.fileupload = function () {
    //    if ($scope.fileupload.stuff) { // else no image was selected
    //        $scope.fileupload.stuff.uploader.start();
    //    }
    //};
    //$scope.modalOk = function () {
    //    $modalInstance.close($scope.selected.item);
    //};

    //$scope.modalCancel = function () {
    //    $modalInstance.dismiss('cancel');
    //};
});