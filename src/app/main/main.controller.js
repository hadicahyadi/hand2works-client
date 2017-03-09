(function() {
  'use strict';

  angular
    .module('hand2worksBos')
    .controller('MainController',['$scope',MainController]);

  /** @ngInject */
  function MainController($scope,$stateParams) {
    $scope.parentTitle = null;
  }
})();
