'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:asset
 * @description
 * # asset
 */
angular.module('manageBandApp')
  .directive('asset', function (Asset) {
    return {
      template: '<span class="asset-name-editable-wrapper"><b>' +
                  '<a href="#" editable-text="asset.name" onbeforesave="updateAssetName($data)">{{ asset.name || "empty" }}</a>' +
                '</b></span>',
      restrict: 'E',
      scope: {
        band: "=",
        assetList : "=",
        asset: "="
      },
      link: function(scope, element, attrs) {

        scope.updateAssetName = function(newName) {
          scope.asset.name = newName;
          updateAsset(scope.asset);
        };

        var updateAsset = function(params) {
          Asset.update(scope.band, scope.assetList, scope.asset, params);
        };

      }
    };
  });
