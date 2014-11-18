'use strict';

/**
 * @ngdoc service
 * @name manageBandApp.Band
 * @description
 * # Band
 * Factory in the manageBandApp.
 */
angular.module('manageBandApp')
  .factory('Band', function (Restangular) {

    var all = function() {
      return Restangular.all('bands').getList();
    };

    var find = function(id) {
      return Restangular.one('bands', id).get();
    };

    return {
      all:  all,
      find: find
    };

  });
