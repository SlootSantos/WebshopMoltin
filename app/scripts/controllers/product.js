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

    //Function which adds the product to the Cart / called from product.html
    $scope.addCart = function() {
      //Makes the button change from bootstraps success tp warning
      $scope.addStatus = 'Adding to cart...';
      // Insert(id, qty, modifiers/size, callback)
      moltin.Cart.Insert(product.id, 1, null, function(cart) {
        //Changes Status on Add Button on product.html
        $scope.addStatus = 'Success!';
        //Updates the global $rootScope and number on cart button
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
