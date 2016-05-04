angular.module('couponManagerApp').controller('CouponController', function ($scope, $http, common, coupon){//, ModalService) {
    $scope.orderByField = 'firstName';
    $scope.reverseSort = false;
    $scope.editCoupon = false;
    $scope.myClass = '';
   
    $scope.headerTitle = "Coupon Manager";
    //$scope.layouts = bootstrappedData.layouts;
    $scope.layout = null;
    $scope.mask = $.getMask('Saving');
    $scope.mask.hide();
    $scope.maskLoad = $.getMask('Loading...');
    

    if (!$scope.coupons) {
        $scope.coupons = coupon.getCoupons(function () { $scope.maskLoad.hide(); });
    }
    else
        $scope.maskLoad.hide();

    $scope.layouts = coupon.getLayouts();
    coupon.getTypes();
    coupon.getMakes();
    
             

    $scope.addCoupon = function(){
        common.transitionTo('coupon/0');//' + coupon.Id);
    }
    $scope.removeCoupon = function(c) {
        var l = $scope.coupons.length;
        while(l--){
            if(c.Id === $scope.coupons[l].Id){
                $scope.coupons[l].Delete = true;
            }
        }
          
    }
    $scope.cancel = function (c) {
        console.log('cancel');
    }

    $scope.$on('$viewContentLoaded', function(d)
    {
                
    });
    //$scope.$on('$routeChangeSuccess', function(ev,data) {   
    //    if(data.loadedTemplateUrl.indexOf('coupondetail.html') > -1){

    //    }
    //    else if (data.loadedTemplateUrl.indexOf('coupons.html') > -1){
    //        delete $scope.currentCoupon;
    //        delete $scope.data.currentTemplate;
    //    }
    //})

    $scope.save = function (fnc) {
        $scope.mask.show();
        coupon.saveCoupons(
            $scope.coupons
            , function () { $scope.mask.hide(); }
        );
        //$scope.mask.show();
        ////if($scope.data.currentTemplate && CKEDITOR.instances.ckeditorplaceholder){
        ////    $scope.data.currentTemplate.Body = CKEDITOR.instances.ckeditorplaceholder.getData();
        ////}
        //$.post("?save=true", $scope.coupons,//{ CompanyId: bootstrappedData.companyId, objects: JSON.stringify($scope.data.coupons), template: JSON.stringify($scope.data.currentTemplate) },
        // function(data) {
        //     $scope.data.coupons = data[0];
        //     if($scope.data.currentTemplate.Id == 0){
        //         $scope.data.currentTemplate.Id = data[1].Id;
        //         $scope.data.templates.push($scope.data.currentTemplate);
        //         $scope.currentCoupon.TemplateId = $scope.data.currentTemplate.Id;  
        //     }
        //     $scope.mask.hide();
        //     if(fnc)
        //         fnc();
            
        // }, 
        // "json"
        //);
        console.log('save');
    }
    $scope.cancel = function () {
        console.log($scope.data.coupons);
    }

    $scope.setActive = function (coupon) {
        coupon.Active = !coupon.Active;
    }

    $scope.go = function (coupon) {
        common.transitionTo('coupon/' + coupon.Id);
    };

    //$scope.open = function (index,id) {

    //    //var modalInstance = $modal.open({
    //    //    templateUrl: 'coupondetail.html',
    //    //    controller: 'couponDetailController',
    //    //    resolve: {
    //    //        coupon: function () {
    //    //            return $scope.coupon[index];
    //    //        }
    //    //    }
    //    //});

    //    var modal = $scope.show = function () {
    //        ModalService.showModal({
    //            templateUrl: 'coupondetail.html',
    //            controller: "couponDetailController"
    //        }).then(function (modal) {
    //            modal.element.modal();
    //            modal.close.then(function (result) {
    //                $scope.message = "You said " + result;
    //            });
    //        });
    //    };

    //    //modal.result.then(function (selectedItem) {
    //    ////    $scope.selected = selectedItem;
    //    ////}, function () {
    //    ////    $log.info('Modal dismissed at: ' + new Date());
    //    //});
    //};
   

});