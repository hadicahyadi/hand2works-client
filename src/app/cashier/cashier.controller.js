(function() {
  'use strict';

  angular
    .module('hand2worksBos')
    .controller('CashierController',  ['$state','$log','BASE_URL','$scope','ProductService','toastr','PAGE_SIZE', CashierController]);

  
  /** @ngInject */
  function CashierController($state,$log,BASE_URL,$scope,ProductService,toastr,PAGE_SIZE) {
  	var vm = this;
  	$scope.$parent.pageTitle = 'Sales Order';
  }

})();