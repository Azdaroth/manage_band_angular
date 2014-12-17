'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:asset
 * @description
 * # asset
 */
angular.module('manageBandApp')
  .directive('asset', function (Asset, $rootScope) {
    return {
      template:
      '</div><span class="asset-name-editable-wrapper"><b>' +
        '<a href="#" editable-text="asset.name" onbeforesave="updateAssetName($data)">{{ asset.name || "empty" }}</a>' +
      '</b></span></div>' +
      '<div>' +
        '<tags-input ng-model="asset.tag_list" on-tag-added="updateAssetTags()" on-tag-removed="updateAssetTags()"></tags-input>' +
      '</div>' +
      '<update-asset-file band="band" asset-list="assetList" asset="asset" ng-if="asset">' +
      '</update-asset-file>',
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

        scope.updateAssetTags = function() {
          updateAsset(scope.asset);
        }

        var updateAsset = function(params) {
          params.tag_list = params.tag_list.map(function(tagItem) {
            return tagItem.text;
          });
          Asset.update(scope.band, scope.assetList, scope.asset, params).then(function() {
            $rootScope.$broadcast('reload-asset-list', scope.assetList);
          });
        };

      }
    };
  });
