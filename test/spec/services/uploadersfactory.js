'use strict';

describe('Service: UploadersFactory', function () {

  var authHeaders = {};

  // load the service's module
  beforeEach(function() {
    module('manageBandApp');

    var auth = function() {
      return {
        retrieveData: function(headers) {
          return authHeaders;
        }
      }
    };

    function FakeUploader() {
      return function FileUploader(options) {
        this.options = options
      };
    };

    module(function($provide) {
      $provide.service('$auth', auth);
      $provide.factory('FileUploader', FakeUploader);
    });

  });

  // instantiate service
  var UploadersFactory;
  beforeEach(inject(function (_UploadersFactory_) {
    UploadersFactory = _UploadersFactory_;
  }));

  it('returns assetAttachmentUploader with url for uploading and headers', function () {
    var band = { id: 100 };
    var uploader = UploadersFactory.assetAttachmentUploader(band);
    expect(uploader.options.url).toEqual("http://manage_band.dev/api/v1/bands/100/asset_attachments")
    expect(uploader.options.headers).toEqual(authHeaders);
  });

});
