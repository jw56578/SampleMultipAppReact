'use strict'
angular.module(window.ELEADAPPNAME).factory('coupon', function (api) {
    var couponHub = null;
    var store = {};
    return {
        
        store: function () {
            return store;
        },
        get: function (key) {
            return store[key];
        },
        set: function (key, val) {
            store[key] = val;
        },

        getCoupons: function (fnc) {
            if (!store.coupons) {
                var coupons = api.query({ type: "CouponCollection" });
                coupons.$promise.then(function () {
                    if (fnc)
                        fnc();
                });
                store.coupons = coupons
            }
            else
                if (fnc)
                    fnc();
                
            return store.coupons;
        },

        getLayouts: function () {
            if (!store.layouts) {
                store.layouts = api.query({ type: "CouponLayoutCollection" });

                store.layouts.$promise.then(function () {
                    //append URL to object
                    angular.forEach(store.layouts, function (layout) {
                        layout.url = "?getlayout=true&id=" + layout.Id;
                    })
                });
            }
            return store.layouts;
        },
        getTypes: function () {
            if (!store.couponTypes)
                store.couponTypes = api.query({ type: "ListItemCollection" });
            
            return store.couponTypes;
        },
        getMakes: function() {
            if (!store.makes)
                store.makes = api.query({ type: "VehicleMakeList"});

            return store.makes;
        },
        getModels: function(makeId) {
            
            var models = api.query({ type: "VehicleModelList", data: { id: makeId } });

            return models;
        },


        saveCoupon: function (c, fnc) {

            //save photo first ? then save ?
            var saved = api.save({ type: "Coupon", data: c });
            saved.$promise.then(function () {
                if (fnc)
                    fnc(saved);
            });
            
            return saved;
        },
        saveCoupons: function (cs, fnc) {
            var saved = api.saveArray({ type: "CouponCollection", data: cs });
            saved.$promise.then(function () {
                if (fnc)
                    fnc();
            });

            return saved;
            
        },
        uploadPhoto: function (photo, fnc) {
            var photo = "";
            photo.$promise.then(function () {
                if (fnc)
                    fnc();
            });

            return photo;
        },

        
    }
});