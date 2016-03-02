'use strict';
angular.module('webshopApp.moltin', [])
  .factory('MoltinAuth', function($q) {
    var deffered = $q.defer();
    var moltin = new Moltin({publicId: 'dwfun8ekseCvZ9hERZrxNOfdyjYhBTfRaiyXSNcM'});
    moltin.Authenticate(function() {
      deffered.resolve(moltin);
    });

    return deffered.promise;
  });
