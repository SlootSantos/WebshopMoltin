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
    //gets the Cart from app.js and sets it to cartDisplay
    $scope.cartDisplay = cart;
    //Printing to Console only for testing purposes
    console.log(cart);
    console.log(cart.total_items);
    console.log(cart.totals.post_discount.formatted.with_tax);

    //Function which deletes the Cart and all its contents / called in cart.html
    $scope.delete = function () {
          //moltins Delete-Function / see Moltin Docs
          moltin.Cart.Delete(function() {
            // Everything is awesome...
            //Takes the current cart and emptys it
            //Sets the gobal $rootScope = 0 and refreshes the cart button
            moltin.Cart.Contents(function(items) {
              $rootScope.cart = items;
              $rootScope.$apply();
              //Sets the 'cartDisplay' Cart to the empty Cart 'items'
              $scope.cartDisplay = items;
              $scope.$apply();
              //Printing to Console only for testing purposes
              console.log(items);
              console.log($scope.cartDisplay.totals.post_discount.formatted.with_tax);
            });

        }, function() {
            // Something went wrong...
        });
      };
  });
