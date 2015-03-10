App.CompanyOrderRoute = Em.Route.extend({
    model: function() {
        return this.modelFor('company');
    },

    setupController: function(controller, model) { //Reset the order form between every transaction
        this._super();

        controller.setProperties({
            'volumeInput.value': 0,
            'priceInput.value': 0,
            badInput: false,
            model: model
        });
    }
});