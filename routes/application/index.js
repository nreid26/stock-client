App.IndexRoute = Em.Route.extend({
    redirect: function(model) {
        this.transitionTo('exchange.index');
    }
});

App.AllRoute = App.IndexRoute;