(function() {
  'use strict';

  angular
    .module('hand2worksBos')
    .controller('DashboardController',  ['$state','$log','BASE_URL','$scope','ProductService','toastr','PAGE_SIZE', DashboardController]);

  
  /** @ngInject */
  function DashboardController($state,$log,BASE_URL,$scope,ProductService,toastr,PAGE_SIZE) {
  	var vm = this;
  	$scope.$parent.pageTitle = 'Dashboard';
  }

})();