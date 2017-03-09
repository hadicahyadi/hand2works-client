(function() {
  'use strict';

  angular
    .module('hand2worksBos')
    .controller('CategoryController',  ['$timeout','$state','$log','BASE_URL','$scope','CategoryService','toastr','PAGE_SIZE', CategoryController]);

  
  /** @ngInject */
  function CategoryController($timeout,$state,$log,BASE_URL,$scope,CategoryService,toastr,PAGE_SIZE) {

  	/** Controller Variables Goes Here */
  	var vm = this;

    $scope.$parent.pageTitle= "Category";

    vm.category = {
    	id: null,
    	categoryName: null
    };

    vm.categories = [];
	vm.remove = remove;
	vm.dataCount = 0;
	vm.currentPage = 1;
  	vm.pageSize = 5;

  	load();

  	/** Controller Function Goes Here */
	function load(){
		CategoryService.getAll(vm.pageSize,vm.currentPage).success(function(response){
			$log.info(response);
			vm.categories = [].concat(response.datas);
			vm.dataCount = response.pageCount;
		});
	}

	vm.isEdit = function isEdit(){
		if(vm.category === null){
			return "mdl-textfield mdl-js-textfield mdl-textfield--floating-label";
		}else{
			return "mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-focused";
		}
	}

	vm.save = function() {
		CategoryService.save(vm.category).then(function successCallback(response){
			$log.info(response.data);
			$state.go("main.category");
			vm.category = null;
			vm.currentPage = 1;
			toastr.success(response.data.message,'');
			load();
		},
		function errorCallback(response){
			$log.error(response);
			toastr.error(response.data.message,'Failed');
		});
	}

	function remove(id){
		CategoryService.remove(id).then(function successCallback(response){
			vm.currentPage = 1;
		},
		function errorCallback(response){
			$log.error(response);
			toastr.error(response.data.message,'Failed');
		});
	}

	vm.edit = function edit(category){
		vm.category = category;
	}

	vm.pageChangeHandler = function pageChangeHandler(pageNumber){
		vm.currentPage = pageNumber;
		load();
		
	}
  }

})();