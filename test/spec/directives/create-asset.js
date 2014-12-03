'use strict';

describe('Directive: createAsset', function () {

  // load the directive's module
  beforeEach(module('manageBandApp'));

  var element,
      scope,
      newAsset,
      assetList;

  newAsset = {
    item: { text: "asset" },
    children: []
  };

  assetList = {
    name: 'list',
    assets: []
  }

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('adds assets to asset list', inject(function ($compile) {
    element = angular.element('<create-asset asset-list="assetList"></create-asset>');
    element = $compile(element)(scope);
    scope.newAsset = newAsset;
    scope.assetList = assetList;
    scope.$digest();
    element.isolateScope().createAsset();
    expect(assetList.assets.length).toEqual(1);
  }));
});
