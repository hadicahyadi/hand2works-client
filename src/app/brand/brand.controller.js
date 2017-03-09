(function() {
  'use strict';

  angular
    .module('hand2worksBos')
    .controller('BrandController',  ['$state','$log','BASE_URL','$scope','BrandService','toastr','PAGE_SIZE', BrandController]);

  
  /** @ngInject */
  function BrandController($state,$log,BASE_URL,$scope,BrandService,toastr,PAGE_SIZE) {

	/** Controller Variables Goes Here */
  	var vm = this;

    $scope.$parent.pageTitle= "Brand";

    vm.brand = {
    	id: null,
    	brandName: null
    };

    vm.brands = [];
	vm.remove = remove;
	vm.dataCount = 0;
	vm.currentPage = 1;
  	vm.pageSize = PAGE_SIZE;

  	/** Controller Function Goes Here */
	vm.load = function(){
		BrandService.getAll(vm.pageSize,vm.currentPage).success(function(response){
			$log.info(response);
			vm.brands = [].concat(response.datas);
			vm.dataCount = response.pageCount;
		});
	}

	vm.isEdit = function isEdit(){
		if(vm.brand === null){
			return "mdl-textfield mdl-js-textfield mdl-textfield--floating-label";
		}else{
			return "mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-focused";
		}
	}

	vm.save = function() {
		BrandService.save(vm.brand).then(function successCallback(response){
			$log.error(response.data);
			$state.go("main.brand");
			vm.brand = null;
			vm.currentPage = 1;
			toastr.success(response.data.message,'');
			vm.load();
		},
		function errorCallback(response){
			$log.error(response);
			toastr.error(response.data.message,'Failed');
		});
	}

	function remove(id){
		BrandService.remove(id).then(function successCallback(response){
			vm.currentPage = 1;
		},
		function errorCallback(response){
			$log.error(response);
			toastr.error(response.data.message,'Failed');
		});
	}

	vm.edit = function edit(brand){
		vm.brand = brand;
	}

	vm.pageChangeHandler = function pageChangeHandler(pageNumber){
		vm.currentPage = pageNumber;
		load();
	}

	
  }

})();
