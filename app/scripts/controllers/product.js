'use strict';

/**
 * @ngdoc function
 * @name webshopMoltinApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the webshopMoltinApp
 */
angular.module('webshopMoltinApp')
  .controller('ProductCtrl', function($scope, $rootScope, product, cart, moltin, $timeout) {
    $scope.prod = product;
    $scope.car = cart;
    $scope.addStatus = null;

    $scope.addCart = function() {
      $scope.addStatus = 'Adding to cart...';
      // Insert(id, qty, modifiers/size, callback)
      moltin.Cart.Insert(product.id, 1, null, function(cart) {
        $scope.addStatus = 'Success!';
        moltin.Cart.Contents(function(items) {
          $rootScope.cart = items;
          $rootScope.$apply();
        });
        $scope.$apply();
        $timeout(function() {
          $scope.addStatus = null;
        }, 1000);
      });
    };
  });
