Ex.CompanyChildRoute = Em.Route.extend({
    model: function(params) {
        return this.modelFor('application').filterBy('symbol', params.symbol)[0];
    },

    redirect: function(model) {
        if(!model) { this.transitionTo('application'); }
    }
});
