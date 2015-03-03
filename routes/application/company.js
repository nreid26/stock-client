App.CompanyRoute = Ex.Route.extend({
    model: function(params) {
        var m = this.modelFor('application').filterBy('symbol', params.symbol)[0];
        if(m) { return m; }
        return this.modelFor('application')[0];
    },

    redirect: function(model) {
        this.transitionTo('/' + model.symbol + '/market');
    }
});