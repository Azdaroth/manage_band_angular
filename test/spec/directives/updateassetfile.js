'use strict';

describe('Directive: updateAssetFile', function () {

  // load the directive's module
  beforeEach(function() {
    module('manageBandApp');

    var auth = function() {
      return {
        retrieveData: function() {}
      }
    };

    function FakeUploader() {
      var fakedUploader = function FileUploader() {};
      var fileSelect = function FileSelect() {};
      fakedUploader.FileSelect = fileSelect;
      return fakedUploader;
    };

    module(function($provide) {
      $provide.service('$auth', auth);
      $provide.factory('FileUploader', FakeUploader);
    });

  });

  var element,
      scope,
      rootScope,
      band,
      assetList,
      asset,
      uploader,
      fileItem,
      flash,
      Asset;

  band = {
    id: "1"
  };

  assetList = {
    id: "2"
  };

  asset = {
    id: "3"
  };

  uploader = {
    onAfterAddingFile: function(item) {},
    onCompleteItem: function(item, response, status, headers) {}
  }

  fileItem = {
    upload: function() { }
  };

  beforeEach(inject(function ($rootScope, $compile, $q, _Asset_, _UploadersFactory_, _flash_) {
    rootScope = $rootScope;
    spyOn(rootScope, '$broadcast');
    scope = $rootScope.$new();
    scope.band = band;
    scope.assetList = assetList;
    scope.asset = asset;
    flash = _flash_;
    spyOn(fileItem, 'upload');
    Asset = _Asset_;
    spyOn(Asset, 'update').andCallFake(function() {
      var deferred = $q.defer();
      deferred.resolve({ asset: { item: { name: "updated" } } });
      return deferred.promise
    });
    element = angular.element('<update-asset-file band="band" asset-list="assetList" asset="asset"></update-asset-file>');
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('uploads fileItem after adding file', function() {
    element.isolateScope().uploader.onAfterAddingFile(fileItem);
    expect(fileItem.upload).toHaveBeenCalled();
  });

  it('assign attachment id to asset on complete upload', function() {
    element.isolateScope().uploader.onCompleteItem(fileItem, { id: "100" });
    expect(element.isolateScope().asset).toEqual( { id: "3", asset_attachment_id: "100" } );
  });

  it('calls Asset service to update, brodcasts reload-asset-list event reassigns asset and assigns flash message', function() {
    element.isolateScope().uploader.onCompleteItem(fileItem, { id: "100" });
    scope.$digest();
    expect(rootScope.$broadcast).toHaveBeenCalledWith('reload-asset-list', assetList);
    expect(element.isolateScope().asset).toEqual( { name: "updated" } );
    expect(flash.success).toEqual("The file has been updated.")
  });
});
