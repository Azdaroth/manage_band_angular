'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:destroyAssetList
 * @description
 * # destroyAssetList
 */
angular.module('manageBandApp')
  .directive('destroyAssetList', function (AssetList) {
    return {
      template:
      '<span class="destroy-asset-list">' +
        '<a href="javascript:void(0);" ng-really-click="destroyAssetList()" ng-really-message="Are you sure you want to delete the asset?">' +
          '<i class="fa fa-trash"></i>' +
        '</a>' +
      '</span>',
      restrict: 'E',
      scope: {
        band: "=",
        assetList: "=",
        assetLists: "="
      },
      link: function postLink(scope, element, attrs) {

        scope.destroyAssetList = function() {
          AssetList.destroy(scope.band, scope.assetList).then(function() {
            var indexOfAssetList = scope.assetLists.indexOf(scope.assetList);
            scope.assetLists.splice(indexOfAssetList, 1);
          });
        };

      }
    };
  });
