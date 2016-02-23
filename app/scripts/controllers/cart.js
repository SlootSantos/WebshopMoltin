'use strict';

/**
 * @ngdoc function
 * @name webshopMoltinApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the webshopMoltinApp
 */
angular.module('webshopMoltinApp')
  .controller('CartCtrl', function ($scope, cart, moltin) {
    $scope.cartDisplay = cart;
    console.log(cart.contents);
    console.log(cart.total_items);
    $scope.delete = function () {
          moltin.Cart.Delete(function() {
            // Everything is awesome...
        }, function() {
            // Something went wrong...
        });
    };
  });
