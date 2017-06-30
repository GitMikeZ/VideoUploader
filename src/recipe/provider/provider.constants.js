(function () {
	'use strict';

	var constants = {
		api_key: "93773be19b08b2adfad9cfad8c4294b39be64b8d4bcda8e533f7c617f0d94236",
		project_id: "bdse3s7d07",
		api_url: "https://upload.wistia.com",
		embed_url: "https://fast.wistia.net/embed/iframe/",

		notifications:{
			multiple_file_error: "You can only upload one file at a time.",
			upload_error: "Error! Please try again.",
			wrong_file_type_error: "Can't upload this type of file",
			upload_success: " was uploaded successfully."
		},
	};

	angular.module('wng-provider').constant('constants', constants);
})();