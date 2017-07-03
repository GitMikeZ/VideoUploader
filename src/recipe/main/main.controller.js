(function () {
	'use strict';

  MainController.$inject = ['$scope'];
  function MainController ($scope) 	{
		var view=this;
		view.state={
			notification:{
				text:""
			},
			video:{
				isUploading:false,
				isUploaded:false,
				uploadProgress:0,
				url:[]
			}
		},

  	view.setState = function (state) {
  		view.state = state;
  		$scope.$apply();
  	};
  }

	angular.module('wng-main').controller('MainController', MainController);
})();
