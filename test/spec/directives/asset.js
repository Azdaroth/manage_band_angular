'use strict';

describe('Directive: asset', function () {

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
      rootScope,
      scope,
      band,
      asset,
      assetList,
      updatedAssetList,
      Asset;

  band = { name: "band" };

  assetList = { name: "assetList" };

  asset = { name: "asset" };

  beforeEach(inject(function ($rootScope, $compile, _Asset_, $q) {
    rootScope = $rootScope;
    spyOn(rootScope, '$broadcast');
    scope = $rootScope.$new();
    element = angular.element('<asset band="band" asset-list="assetList" asset="asset"></asset>');
    element = $compile(element)(scope);
    Asset = _Asset_;
    spyOn(Asset, 'update').andCallFake(function() {
      var deferred = $q.defer();
      deferred.resolve({});
      return deferred.promise;
    });
    scope.band = band;
    scope.assetList = assetList;
    scope.asset = asset;
    scope.asset.tag_list = ["tag"];
    scope.$digest();
  }));

  describe('updateAssetName', function() {

    it('calls Asset service with update method', function () {
      element.isolateScope().updateAssetName("new name");
      expect(Asset.update).toHaveBeenCalledWith(band, assetList, asset, { name: "new name", tag_list : ['tag'] });
    });

    it('broadcasts reload-asset-list event with assetList', function () {
      element.isolateScope().updateAssetName("new name");
      scope.$digest();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('reload-asset-list', assetList);
    });

  });

  describe('updateAssetTags', function() {

    it('calls Asset service with update method with tags in format of array of strings', function () {
      scope.asset.tag_list = ["new", "tags"];
      scope.$digest();
      element.isolateScope().updateAssetTags();
      expect(Asset.update).toHaveBeenCalledWith(band, assetList, asset, { name: "new name", tag_list: ['new', 'tags'] });
    });

    it('broadcasts reload-asset-list event with assetList', function () {
      element.isolateScope().updateAssetTags();
      scope.$digest();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('reload-asset-list', assetList);
    });

  });


});
