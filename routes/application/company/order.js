App.CompanyOrderRoute = Em.Route.extend({
    model: function() {
       return this.modelFor('company');
    },

    setupController: function(controller, model) {
        this._super();
        console.log(model);
        controller.setProperties({
            'volumeInput.value': 0,
            'priceInput.value': 0,
            'badInput': false,
            'model':model
        });
    },
    redirect: function(model) {
        return false;
    }
});