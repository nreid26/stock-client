App.ApplicationRoute = Em.Route.extend({
    model: function() {
        return market;
    },

    redirect: function(model) {
        this.transitionTo((model.length > 0) ?
            '/' + model[0].symbol + '/market' :
            '/error'
        );
    }
});