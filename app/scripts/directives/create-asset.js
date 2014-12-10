'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:createAsset
 * @description
 * # createAsset
 */
angular.module('manageBandApp')
  .directive('createAsset', function (UploadersFactory, Asset) {
    return {
      template:
      '<div class="create-asset" ng-if="uploader">' +
        '<form novalidate name="newAssetForm" ng-submit="createAsset()">' +
          '<div class="form-group">' +
            '<label>Create new asset within list</label>' +
            '<input type="text" class="form-control" ng-model="newAsset.item.name" name="new_asset_item_text" required="required" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label>Add file</label>' +
            '<input type="file" nv-file-select="" uploader="uploader" class="form-control" ng-model="newAsset.item.file" name="new_asset_item_file"  />' +
          '</div>' +
          '<input type="hidden" ng-model="newAsset.item.asset_attachment_id" required="true" />' +
          '<button type="submit" class="btn btn-primary" ng-disabled="newAssetForm.$invalid">Add</button>' +
        '</form>' +
        '<hr />' +
      '</div>',
      restrict: 'E',
      scope: {
        assetList: "=",
        band: "="
      },
      link: function postLink(scope, element, attrs) {

        var uploader = scope.uploader = UploadersFactory.assetAttachmentUploader(scope.band);

        uploader.onAfterAddingFile = function(fileItem) {
          fileItem.upload();
        };

        uploader.onCompleteItem = function(fileItem, response, status, headers) {
          scope.newAsset.item.asset_attachment_id = response.id;
        };

        var loadNewAsset = function() {
          scope.newAsset = {
            item: { name: "", asset_attachment_id: "" },
            children: []
          }
        };
        loadNewAsset();

        scope.createAsset = function() {
          scope.assetList.assets.push(scope.newAsset);
          Asset.create(scope.band, scope.assetList, scope.newAsset.item);
          loadNewAsset();
        };
      }
    };
  });
