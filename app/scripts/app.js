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
      .otherwise({
        redirectTo: '/'
      });
  });
