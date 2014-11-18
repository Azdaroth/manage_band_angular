'use strict';

angular.module('manageBand.config', [])
  .constant('ENV', {
    apiEndpoint: '@@apiEndpoint',
    basePath: "@@basePath"
  });
