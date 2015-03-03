App.ApplicationRoute = Ex.Route.extend({
    model: function() {
        return market;
    },

    redirect: function(model) {
        this.transitionTo('/' + model[0].symbol + '/market');
    }
});