'use strict';

describe('Directive: createAsset', function () {

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
      newAsset,
      band,
      assetList,
      compile,
      Asset,
      uploader,
      fileItem,
      element;

  band = {
    id: 1
  };

  newAsset = {
    item: {},
    children: []
  };

  assetList = {
    id: 1,
    name: 'list',
    assets: []
  };

  uploader = {
    onAfterAddingFile: function(item) {},
    onCompleteItem: function(item, response, status, headers) {}
  }

  fileItem = {
    upload: function() { }
  };


  beforeEach(inject(function ($rootScope, $compile, _UploadersFactory_, _Asset_) {
    scope = $rootScope.$new();
    scope.newAsset = newAsset;
    scope.assetList = assetList;
    scope.band = band;
    Asset = _Asset_;
    spyOn(Asset, 'create');
    spyOn(fileItem, 'upload')
    scope.uploader = uploader;
    element = angular.element('<create-asset asset-list="assetList" band="band"></create-asset>');
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('adds assets to asset list', function () {
    element.isolateScope().createAsset();
    expect(assetList.assets.length).toEqual(1);
  });

  it('calls asset service to create asset on backend', function () {
    element.isolateScope().createAsset();
    expect(Asset.create).toHaveBeenCalledWith(band, assetList, newAsset.item);
  });

  it('uploads fileItem after adding file', function() {
    element.isolateScope().uploader.onAfterAddingFile(fileItem);
    expect(fileItem.upload).toHaveBeenCalled();
  });

  it('assign attachment id to asset on complete upload', function() {
    element.isolateScope().uploader.onCompleteItem(fileItem, { id: "100" });
    expect(element.isolateScope().newAsset.item.asset_attachment_id).toEqual("100");
  });
});
