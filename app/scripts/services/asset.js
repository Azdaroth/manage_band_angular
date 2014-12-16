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

    var find = function(band, assetList, id) {
      return Restangular
        .one('bands', band.id)
        .one('asset_lists', assetList.id)
        .one('assets', id)
        .get();
    };

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
    };

    var update = function(band, assetList, asset, params) {
      return Restangular
        .one('bands', band.id)
        .one('asset_lists', assetList.id)
        .one('assets', asset.id)
        .patch({"asset": params});
    };

    var destroy = function(band, assetList, asset) {
      return Restangular
        .one('bands', band.id)
        .one('asset_lists', assetList.id)
        .one('assets', asset.id)
        .remove();
    };

    return {
      find: find,
      create: create,
      update: update,
      destroy: destroy,
      link: link
    };
  });
