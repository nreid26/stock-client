App.CompanyOrderRoute = Ex.CompanyChildRoute.extend({
    setupController: function(controller, model) {
        this._super();

        controller.setProperties({
            'volumeInput.value': '',
            'priceInput.value': '',
            'badInput': false,
        });
    }
});