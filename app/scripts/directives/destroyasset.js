'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:destroyAsset
 * @description
 * # destroyAsset
 */
angular.module('manageBandApp')
  .directive('destroyAsset', function (Asset, AssetList) {
    return {
      template:
      '<span class="destroy-asset">' +
        '<a href="javascript:void(0);" ng-really-click="destroyAsset()" ng-really-message="Are you sure you want to delete the asset?">' +
          '<i class="fa fa-trash"></i>' +
        '</a>' +
      '</span>',
      restrict: 'E',
      scope: {
        band: "=",
        assetList: "=",
        asset: "="
      },
      link: function postLink(scope, element, attrs) {
        scope.destroyAsset = function() {

          Asset.destroy(scope.band, scope.assetList, scope.asset.item).then(function() {
            AssetList.find(scope.band, scope.assetList.id).then(function(newAssetList) {
              scope.assetList.assets_without_parent = newAssetList.assets_without_parent;
              scope.assetList.assets = newAssetList.assets;
            });
          });
        };
      }
    };
  });
