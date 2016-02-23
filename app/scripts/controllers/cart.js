'use strict';

/**
 * @ngdoc function
 * @name webshopMoltinApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the webshopMoltinApp
 */
angular.module('webshopMoltinApp')
  .controller('CartCtrl', function ($scope, $rootScope, cart, moltin) {
    $scope.cartDisplay = cart;
    console.log(cart.contents);
    console.log(cart.total_items);
    console.log(cart.totals.post_discount.formatted.with_tax);

    $scope.delete = function () {
          moltin.Cart.Delete(function() {
            // Everything is awesome...
            $scope.$apply(function(){
              $scope.cartDisplay = cart;
            });
            console.log(cart.totals.post_discount.formatted.with_tax);
            moltin.Cart.Contents(function(items) {
              $rootScope.cart = items;
              $rootScope.$apply();
            });
        }, function() {
            // Something went wrong...
        });
      };
  });
