'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:editableAssetListName
 * @description
 * # editableAssetListName
 */
angular.module('manageBandApp')
  .directive('assetList', function (AssetList) {
    return {
      template: '<p><b>' +
                  '<a href="#" editable-text="assetList.name" onbeforesave="updateAssetListName($data)">{{ assetList.name || "empty" }}</a>' +
                '</b></p>',
      restrict: 'E',
      scope: {
        band: "=",
        assetList: "="
      },
      link: function postLink(scope, element, attrs) {

        scope.updateAssetListName = function(newName) {
          updateAssetList({ name: newName });
        };

        var updateAssetList = function(params) {
          AssetList.update(scope.band, scope.assetList, params);
        };
      }
    };
  });
