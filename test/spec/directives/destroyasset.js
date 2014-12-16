'use strict';

describe('Directive: destroyAsset', function () {

  // load the directive's module
  beforeEach(module('manageBandApp'));

  var element,
      scope,
      band,
      assetList,
      newAssetList,
      asset,
      Asset,
      AssetList;

  band = {
    id: "1"
  };

  asset = {
    id: "3"
  };

  assetList = {
    id: "2",
    assets_without_parent: [asset],
    assets: [asset]
  };

  newAssetList = {
    id: "3",
    assets_without_parent: [],
    assets: []
  };

  beforeEach(inject(function ($rootScope, $compile, _Asset_, $q, _AssetList_) {
    scope = $rootScope.$new();
    scope.band = band;
    scope.assetList = assetList;
    scope.asset = asset;
    Asset = _Asset_;
    AssetList = _AssetList_;
    spyOn(Asset, 'destroy').andCallFake(function() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    });
    spyOn(AssetList, 'find').andCallFake(function() {
      var deferred = $q.defer();
      deferred.resolve(newAssetList);
      return deferred.promise;
    });
    element = angular.element('<destroy-asset band="band" asset-list="assetList" asset="asset"></destroy-asset>');
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('calls Asset service to destroy asset', function () {
    element.isolateScope().destroyAsset();
    expect(Asset.destroy).toHaveBeenCalledWith(band, assetList, asset.item);
  });

  it('reassigns assets to assetlist', function () {
    element.isolateScope().destroyAsset();
    scope.$digest();
    expect(scope.assetList.assets.length).toEqual(0);
    expect(scope.assetList.assets_without_parent.length).toEqual(0);
  });

  it('calls AssetList service to find new Asset', function () {
    element.isolateScope().destroyAsset();
    scope.$digest();
    expect(AssetList.find).toHaveBeenCalledWith(band, "2");
  });


});
