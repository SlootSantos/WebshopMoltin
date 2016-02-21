'use strict';

/**
 * @ngdoc function
 * @name webshopMoltinApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webshopMoltinApp
 */
angular.module('webshopMoltinApp')
  .controller('MainCtrl', function ($scope, cart) {
    $scope.cartDisplay = cart;
    console.log(cart);
  });
