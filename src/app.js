!function(){
		"use strict";
	angular.module("wng-app",["wng-provider","wng-main","wng-upload"])
}(),function(){
		"use strict";
	angular.module("wng-provider",[])
}(),function(){
		"use strict";
	angular.module("wng-main",[])
}(),function(){
		"use strict";
	angular.module("wng-upload",[])
}(),function(){
	"use strict";
	var constants = {
		api_key:"7dc7c6050850b2a4fa386519473f06574e540ae1bbf587172a812f1cff7b7c1d",
		project_id: "bdse3s7d07",
		api_url:"https://upload.wistia.com",
		embed_url:"https://fast.wistia.net/embed/iframe/",

		notifications:{
			multiple_file_error: "You can only upload one file at a time.",
			upload_error: "Error! Please try again.",
			wrong_file_type_error: "Can't upload this type of file",
			upload_success: " uploaded successfully."
		},
	};
	angular.module("wng-provider").constant("constants", constants)

}(),function() {
	"use strict";
	function MainController(scope) {
		var view=this;
		view.state={
			notification:{
				text:""
			},
			video:{
				isUploading:!1,
				isUploaded:!1,
				uploadProgress:0,
				url:[]
			}
		},
		view.setState=function(state){
			view.state=state,
			scope.$apply()
		}
	}
	angular.module("wng-main").controller("MainController", MainController),
	MainController.$inject=["$scope"]

}(),function(){
	"use strict";

	function MainController(scope, sce, element, constant) {

		var state;

		var msg=function(e,i){
			return{
				text:e || ""
			}
		}

		var viewModel=this;

		var ele=angular.element(element[0].querySelector("#fileupload"));

		var uploadOptions={
				dataType:"json",
				url:constant.api_url,
				formData:{
					api_password:constant.api_key,
					project_id:constant.project_id
				},
				add:function(e,data) {
					var file = data.files[0];
					return file.type.indexOf('video') !== -1 ? data.originalFiles.length>1 ? (
						state.notification=msg(constant.notifications.multiple_file_error),
						void viewModel.onUpdate(state)):(
							state.video.isUploading=!0,
							state.notification=msg(),
							viewModel.onUpdate(state),
							void data.submit()
						):(state.notification=msg(
							constant.notifications.wrong_file_type_error),

						void viewModel.onUpdate(state))
				},
				progressall:function(e,data) {
						state.video.uploadProgress=parseInt(data.loaded/data.total * 100, 10),
						viewModel.onUpdate(state)
				},
				done:function(e, data) {
					data.result && data.result.hashed_id && (
						state.video.isUploading=!1,
						state.video.isUploaded=!0,
						state.video.url.push(sce.trustAsResourceUrl(constant.embed_url + data.result.hashed_id)),
						state.notification = msg(
							data.result.name + constant.notifications.partial_upload_success),
						viewModel.onUpdate(state)
					)
				},
				fail:function(e,data) {
					state.video.isUploading=!1,
					state.video.isUploaded=!1,
					state.notification=msg(constant.notifications.upload_error),
					viewModel.onUpdate(state)
				}
		};
		viewModel.$onInit=function() {
			state=viewModel.state,
			ele.fileupload(uploadOptions)
		}
	}angular.module("wng-upload").component("wistiaUpload",{
		templateUrl:"src/recipe/templates/wistia-upload.html",
		controller:MainController,
		controllerAs:"wng",
		bindings:{
			state:"=",
			onUpdate:"&"
		}
	}),
		MainController.$inject=["$scope","$sce","$element","constants"]
}();