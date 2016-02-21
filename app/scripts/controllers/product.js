'use strict';

/**
 * @ngdoc function
 * @name webshopMoltinApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the webshopMoltinApp
 */
angular.module('webshopMoltinApp')
  .controller('ProductCtrl', function($scope, product, cart, moltin, $timeout) {
    $scope.prod = product;
    $scope.car = cart;
    $scope.addStatus = null;

    $scope.addCart = function() {
      $scope.addStatus = 'Adding...';

      moltin.Cart.Insert(product.id, 1, null, function() {
        $scope.addStatus = 'Success!';
        $scope.$apply();
        $timeout(function () {
          $scope.addStatus = null;
        }, 1000);
      });
      console.log(product);
      console.log(cart);
      console.log(cart.totals.post_discount.formatted.with_tax);
      console.log('got a ' + product.title);
    };
  });
