'use strict';

/**
 * @ngdoc function
 * @name storefrontApp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the storefrontApp
 */
angular.module('webshopMoltinApp')
  .controller('PaymentCtrl', function ($scope, $location, $rootScope, moltin) {
    console.log($rootScope.cart);
    //4242424242424242 for test credit number
    $scope.payment = function(data) {
      moltin.Checkout.Payment('purchase', $scope.order.id, {data: $scope.data}, function(response) {
        $rootScope.payment = response;
          //moltins Delete-Function / see Moltin Docs
          moltin.Cart.Delete(function() {
            // Everything is awesome...
            //Takes the current cart and emptys it
            //Sets the gobal $rootScope = 0 and refreshes the cart button
            moltin.Cart.Contents(function(items) {
              $rootScope.cart = items;
              $rootScope.$apply();
            });

        });
        $rootScope.$apply(function() {
          $location.path('/complete');
        });
      });
    };
});
