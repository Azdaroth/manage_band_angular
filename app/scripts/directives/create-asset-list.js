'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:createAssetList
 * @description
 * # createAssetList
 */
angular.module('manageBandApp')
  .directive('createAssetList', function () {
    return {
      template:
      '<div class="create-asset-list">' +
        '<form novalidate name="newAssetListForm" ng-submit="createAssetList()">' +
          '<div class="form-group">' +
            '<label>Create new asset list</label>' +
            '<input type="text" class="form-control" ng-model="newAssetList.name" name="new_asset_list_name" required="required" />' +
          '</div>' +
          '<button type="submit" class="btn btn-primary" ng-disabled="newAssetListForm.$invalid">Add</button>' +
        '</form>' +
        '<hr />' +
      '</div>',
      restrict: 'E',
      scope: {
        assetLists: "="
      },
      link: function postLink(scope, element, attrs) {

        var loadNewAssetList = function() {
          scope.newAssetList = {
            name: '',
            assets: []
          }
        };
        loadNewAssetList();

        scope.createAssetList = function() {
          scope.assetLists.push(scope.newAssetList);
          loadNewAssetList();
        }
      }
    };
  });
