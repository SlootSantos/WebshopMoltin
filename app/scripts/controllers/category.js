'use strict';

/**
 * @ngdoc function
 * @name webshopMoltinApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the webshopMoltinApp
 */
angular.module('webshopMoltinApp')
  .controller('CategoryCtrl', function ($scope,category, products) {
    $scope.cat = category;
    $scope.products = products;

  });
