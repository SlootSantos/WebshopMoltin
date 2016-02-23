'use strict';

/**
 * @ngdoc overview
 * @name webshopMoltinApp
 * @description
 * # webshopMoltinApp
 *
 * Main module of the application.
 */
angular
  .module('webshopMoltinApp', [
    'webshopApp.moltin',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          cart: function($q, MoltinAuth) {
            var deffered = $q.defer();
            $q.when(MoltinAuth).then(function(moltin) {
              moltin.Cart.Contents(function(cart){
                deffered.resolve(cart);
              });
            });
            return deffered.promise;
          }
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/store', {
        templateUrl: 'views/store.html',
        controller: 'StoreCtrl',
        controllerAs: 'store',
        resolve: {
          //basically waits for moltin to authenticate and then gets the CATEGORiES made in the Moltin forge Dashboard, when the STORE route is called
          categories: function($q, MoltinAuth) {
            var deffered = $q.defer();
            $q.when(MoltinAuth).then(function(moltin){
              moltin.Category.List(null, function(categories) {
                deffered.resolve(categories);
              });
            });
            return deffered.promise;
          }
        }
      })
      .when('/category/:id', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl',
        controllerAs: 'category',
        resolve: {
          //basically waits for moltin to authenticate and then gets the CATEGORIES and PRODUCTS made in the Moltin forge Dashboard, when the CATEGORY route is called
          category: function($q, $route, MoltinAuth) {
            var deffered = $q.defer();
            $q.when(MoltinAuth).then(function(moltin){
              moltin.Category.Get($route.current.params.id, function(category) {
                deffered.resolve(category);
              });
            });
            return deffered.promise;
          },
          products: function($q, $route, MoltinAuth) {
            var deffered = $q.defer();
            $q.when(MoltinAuth).then(function(moltin){
              moltin.Product.List({category: $route.current.params.id}, function(products) {
                deffered.resolve(products);
              });
            });
            return deffered.promise;
          }
        }
      })
      .when('/product/:id', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product',
        resolve: {
          /*basically waits for moltin to authenticate and then gets the PRODUCTS and the CART
          *and the MOLTIN since the code is going to call moltin functions in the product controller
          * made in the Moltin forge Dashboard, when the PRODUCT route is called
          */

          product: function($q, $route, MoltinAuth) {
            var deffered = $q.defer();
            $q.when(MoltinAuth).then(function(moltin){
              moltin.Product.Get($route.current.params.id, function(product) {
                deffered.resolve(product);
              });
            });
            return deffered.promise;
          },
          moltin: function($q, MoltinAuth) {
            return MoltinAuth;
          },
          cart: function($q, MoltinAuth) {
            var deffered = $q.defer();
            $q.when(MoltinAuth).then(function(moltin) {
              moltin.Cart.Contents(function(cart){
                deffered.resolve(cart);
              });
            });
            return deffered.promise;
          }
        }
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl',
        controllerAs: 'cart',
        resolve: {
          //basically waits for moltin to authenticate and then gets the MOLTIN functions
          // and Cart, when the CART route is called

          moltin: function($q, MoltinAuth) {
            return MoltinAuth;
          },
          cart: function($q, MoltinAuth) {
            var deferred = $q.defer();
            MoltinAuth.then(function(moltin) {
              moltin.Cart.Contents(function(cart) {
                deferred.resolve(cart);
              });
            });
            return deferred.promise;
          }
        }
      })
      //when anything else than a abovely defined route its going to redirect to the MAIN route
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
          cart: function($q, MoltinAuth) {
            var deferred = $q.defer();
            MoltinAuth.then(function(moltin) {
              moltin.Cart.Contents(function(cart) {
                deferred.resolve(cart);
              });
            });
            return deferred.promise;
          },
          options: function($q, MoltinAuth) {
            var deferred = $q.defer();
            MoltinAuth.then(function(moltin) {
              moltin.Cart.Checkout(function(options) {
                deferred.resolve(options);
              });
            });
            return deferred.promise;
          },
          fields: function($q, MoltinAuth) {
            var deferred = $q.defer();
            MoltinAuth.then(function(moltin) {
              moltin.Address.Fields(null, null, function(fields) {
                deferred.resolve(fields);
              });
            });
            return deferred.promise;
          },
          moltin: function(MoltinAuth) {
            return MoltinAuth;
          }
        }
      })
      .when('/payment', {
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl',
        resolve: {
          moltin: function($q, MoltinAuth) {
            return MoltinAuth;
          }
        }
      })
      .when('/complete', {
        templateUrl: 'views/complete.html',
        controller: 'CompleteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  //inits the global cart variable $rootScope
  .run(function(MoltinAuth, $rootScope) {
    MoltinAuth.then(function(moltin) {
      moltin.Cart.Contents(function(items) {
        $rootScope.cart = items;
        $rootScope.$apply();
      });
    });
  });
