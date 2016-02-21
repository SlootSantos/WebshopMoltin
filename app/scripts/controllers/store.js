'use strict';

/**
 * @ngdoc function
 * @name webshopMoltinApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the webshopMoltinApp
 */
angular.module('webshopMoltinApp')
  .controller('StoreCtrl', function ($scope, categories) {
    $scope.categories = categories;
    console.log(categories);
  });
