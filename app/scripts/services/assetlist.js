'use strict';

/**
 * @ngdoc service
 * @name manageBandApp.AssetList
 * @description
 * # AssetList
 * Factory in the manageBandApp.
 */
angular.module('manageBandApp')
  .factory('AssetList', function (Restangular) {

    var all = function(band) {
      return Restangular.one('bands', band.id)
                        .all('asset_lists')
                        .getList();
    };

    var find = function(band, id) {
      return Restangular.one('bands', band.id)
                        .one('asset_lists', id)
                        .get();
    };

    var create = function(band, params) {
      return Restangular.one('bands', band.id)
                         .all('asset_lists')
                         .post({"asset_list": params});
    }

    var update = function(band, assetList, params) {
      return Restangular.one('bands', band.id)
                        .one('asset_lists', assetList.id)
                        .patch({"asset_list": params}) ;
    };

    return {
      all:  all,
      find: find,
      create: create,
      update: update
    };

  });
