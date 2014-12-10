'use strict';

/**
 * @ngdoc service
 * @name manageBandApp.UploadersFactory
 * @description
 * # UploadersFactory
 * Factory in the manageBandApp.
 */
angular.module('manageBandApp')
  .factory('UploadersFactory', function (FileUploader, ENV, $auth) {

    var assetAttachmentUploader = function (band) {
      return new FileUploader({
        url: ENV.apiEndpoint + "/bands/" + band.id + "/asset_attachments",
        headers: $auth.retrieveData('auth_headers')
      });
    };

    return {
      assetAttachmentUploader: assetAttachmentUploader
    };
  });
