'use strict';

/**
 * @ngdoc service
 * @name manageBandApp.Asset
 * @description
 * # Asset
 * Factory in the manageBandApp.
 */
angular.module('manageBandApp')
  .factory('Asset', function (Restangular) {

    var create = function(band, assetList, params) {
      return Restangular
        .one('bands', band.id)
        .one('asset_lists', assetList.id)
        .all('assets')
        .post({"asset": params});
    };

    var link = function(band, assetList, assetsTree) {
      return Restangular
        .one('bands', band.id)
        .one('asset_lists', assetList.id)
        .all('assets')
        .all('link')
        .post({"assets_tree": assetsTree});
    }

    return {
      create: create,
      link: link
    };
  });
