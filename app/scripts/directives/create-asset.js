'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:createAsset
 * @description
 * # createAsset
 */
angular.module('manageBandApp')
  .directive('createAsset', function () {
    return {
      template:
      '<div class="create-asset">' +
        '<form novalidate name="newAssetForm" ng-submit="createAsset()">' +
          '<div class="form-group">' +
            '<label>Create new asset within list</label>' +
            '<input type="text" class="form-control" ng-model="newAsset.item.text" name="new_asset_item_text" required="required" />' +
          '</div>' +
          '<button type="submit" class="btn btn-primary" ng-disabled="newAssetForm.$invalid">Add</button>' +
        '</form>' +
        '<hr />' +
      '</div>',
      restrict: 'E',
      scope: {
        assetList: "="
      },
      link: function postLink(scope, element, attrs) {

        var loadNewAsset = function() {
          scope.newAsset = {
            item: { text: "" },
            children: []
          }
        };
        loadNewAsset();

        scope.createAsset = function() {
          scope.assetList.assets.push(scope.newAsset);
          loadNewAsset();
        };
      }
    };
  });
