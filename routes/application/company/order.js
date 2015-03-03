App.CompanyOrderRoute = Ex.Route.extend({
    model: function() {
        return this.modelFor('company');
    },

    setupController: function(controller, model) {
        this._super();

        controller.setProperties({
            'volumeInput.value': '',
            'priceInput.value': '',
            'badInput': false,
        });
    }
});