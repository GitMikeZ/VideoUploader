(function () {
	'use strict';

  UploadController.$inject = ['$scope', '$sce', '$element', 'constants'];
  function UploadController ($scope, $sce, $element, constants) {

  	var viewModel = this;
	  var el = angular.element($element[0].querySelector('#fileupload'));
	  var	state;

  	var uploadOptions = {
			dataType: 'json',
			url: constants.api_url,
			formData: {
				api_password: constants.api_key,
				project_id: constants.project_id
			},
			add: function (e, data) {
				var file = data.files[0];
				if (file.type.indexOf('video') == -1) {
					viewModel.onUpdate(state);
					return;
				} else if (data.originalFiles.length > 1) {
					viewModel.onUpdate(state);
					return;
				}
				state.video.isUploading = true;
				viewModel.onUpdate(state);

				data.submit();
			},
			progressall: function (e, data) {
        state.video.value = parseInt(data.loaded / data.total * 100, 10);
				viewModel.onUpdate(state);
			},
			done: function (e, data) {
				if(!!data.result && !!data.result.hashed_id) {
					state.video.isUploading = false;
					state.video.isUploaded = true;
					state.video.url.push($sce.valueOf($sce.trustAsResourceUrl(constants.embed_url  + data.result.hashed_id)));
					viewModel.onUpdate(state);
				}
			},
			fail: function (e, data) {
					state.video.isUploading = false;
					state.video.isUploaded = false;
					viewModel.onUpdate(state);
			}
		};

  	viewModel.$onInit = function () {
  		state = viewModel.state;
			el.fileupload(uploadOptions);
  	};
  }

	angular.module('wng-upload').component('wistiaUpload', {
		templateUrl: 'src/recipe/templates/wistia-upload.html',
		controller: UploadController,
		controllerAs: "wng",
		bindings: {
			state: '=',
			onUpdate: '&'
		}
  });
})();
