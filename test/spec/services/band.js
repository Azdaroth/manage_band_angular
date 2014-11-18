'use strict';

describe('Service: Band', function () {

  // load the service's module
  beforeEach(module('manageBandApp'));

  // instantiate service
  var Band, httpBackend;
  beforeEach(inject(function (_Band_, _$httpBackend_) {
    Band = _Band_;
    httpBackend = _$httpBackend_;
  }));

});
