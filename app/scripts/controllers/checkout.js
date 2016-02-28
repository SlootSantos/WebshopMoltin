'use strict';

/**
 * @ngdoc function
 * @name webshopMoltinApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the webshopMoltinApp
 */
/* angular.module('webshopMoltinApp')
   .controller('CheckoutCtrl', function ($scope, $rootScope, $location, moltin, cart, options, fields) {
     $scope.data = {bill: {}, ship: {}, ship_bill: 0, notes: '', shipping: '', gateway: ''}
     $scope.cartDisplay = cart;
     $scope.options = options;
     $scope.fields = fields;

     $scope.createOrder = function() {
       moltin.Cart.Complete({
          gateway: 'dummy',
          customer: {
            first_name: 'Bob',
            last_name:  'Doe',
            email:      'jon.doe@gmail.com'
          },
          bill_to: {
            first_name: 'Jon',
            last_name:  'Doe',
            address_1:  '123 Sunny Street',
            address_2:  'Sunnycreek',
            city:       'Sunnyvale',
            county:     'California',
            country:    'US',
            postcode:   'CA94040',
            phone:      '6507123124'
          },
          ship_to: 'bill_to',
          shipping: 'free_shipping'
         },



        function(response) {
         $rootScope.order = response;
         $rootScope.$apply(function() {
           $location.path('/payment');
         });
       })
     }

   });*/
