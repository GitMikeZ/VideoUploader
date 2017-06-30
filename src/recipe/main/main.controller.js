(function () {
	'use strict';

  MainController.$inject = ['$scope'];
  function MainController ($scope) 	{
  	var vm = this;
  	vm.state = {
  		message: {
  			text: '',
  			cssClass: ''
  		},
  		video: {
	  		isUploading: false,
	  		isUploaded: false,
	  		value: 0,
	  		url: [],
	  	}
  	};

  	vm.setState = function (state) {
  		vm.state = state;
  		$scope.$apply();
  	};
  }

	angular.module('wng-main').controller('MainController', MainController);
})();
