'use strict';

/**
 * @ngdoc function
 * @name webshopMoltinApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the webshopMoltinApp
 */
 angular.module('webshopMoltinApp')
 .controller('CheckoutCtrl', function ($scope, $rootScope, $location, moltin, cart, options, fields) {
   $scope.data = { bill: {}, ship: {}, ship_bill: 0, notes: '', shipping: '', gateway: ''};
   $scope.cartDisplay = cart;
   $scope.options = options;
   $scope.fields = fields;
   console.log($scope.data.first_name);

   $scope.createOrder = function() {
     moltin.Cart.Complete({
       customer: {
         first_name: 'der',
         last_name:  'mn',
         email:      'kjjk.doe@gmail.com'
       }, //guest customer for now
       shipping: $scope.data.shipping,
       gateway: $scope.data.gateway,
       bill_to: $scope.data.bill,
       ship_to: $scope.data.ship_bill ? 'bill_to' : $scope.data.ship
     }, function(response) {
       $rootScope.order = response;
       console.log($rootScope.order);
       $rootScope.$apply(function() {
         $location.path('/payment');
       });
     });
   };
});
