'use strict';

describe('Directive: asset', function () {

  // load the directive's module
  beforeEach(module('manageBandApp'));

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
    scope.$digest();
  }));

  it('calls Asset service with update method', function () {
    element.isolateScope().updateAssetName("new name");
    expect(Asset.update).toHaveBeenCalledWith(band, assetList, asset, { name: "new name" });
  });

  it('broadcasts reload-asset-list event with updaed', function () {
    element.isolateScope().updateAssetName("new name");
    scope.$digest();
    expect(rootScope.$broadcast).toHaveBeenCalledWith('reload-asset-list', assetList);
  });
});
