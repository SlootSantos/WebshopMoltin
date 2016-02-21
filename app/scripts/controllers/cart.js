'use strict';

/**
 * @ngdoc function
 * @name webshopMoltinApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the webshopMoltinApp
 */
angular.module('webshopMoltinApp')
  .controller('CartCtrl', function ($scope, cart) {
    $scope.cartDisplay = cart;
    console.log(cart);
    console.log(cart.total_items);

  });
