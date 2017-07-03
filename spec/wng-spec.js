describe('MainController', function() {

	var controller;

	beforeEach(module('wng-main'));

	beforeEach(inject(function (_$controller_) {
		controller = _$controller_;
	}));

	it('should have a model defined', function() {
		expect(controller).toBeDefined();
		expect(controller.model).toBeDefined();
	})
});
