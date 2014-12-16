'use strict';

/**
 * @ngdoc directive
 * @name manageBandApp.directive:updateAssetFile
 * @description
 * # updateAssetFile
 */
angular.module('manageBandApp')
  .directive('updateAssetFile', function (Asset, UploadersFactory, flash) {
    return {
      template:
      '<div class="form-group" ng-if="uploader">' +
        '<label>Add file</label>' +
        '<input type="file" nv-file-select="" uploader="uploader" class="form-control" ng-model="asset.item.file" name="asset_item_file" />' +
      '</div>' +
      '<div>' +
        '<span>Current file:</span>' +
        '<a ng-href="{{asset.file_url}}" target="_blank">' +
          '<i class="fa fa-cloud-download"></i>' +
        '</a>' +
      '</div>',
      restrict: 'E',
      scope: {
        band: "=",
        assetList: "=",
        asset: "="
      },
      link: function postLink(scope, element, attrs) {

        var uploader = scope.uploader = UploadersFactory.assetAttachmentUploader(scope.band);

        uploader.onAfterAddingFile = function(fileItem) {
          fileItem.upload();
        };

        uploader.onCompleteItem = function(fileItem, response, status, headers) {
          updateAsset(response);
        };

        var updateAsset = function(response) {
          scope.asset.asset_attachment_id = response.id
          var params = scope.asset;
          Asset.update(scope.band, scope.assetList, scope.asset, params).then(function(assetResponse) {
            scope.asset = assetResponse.asset.item;
            flash.success = "The file has been updated.";
          });
        };

      }
    };
  });
