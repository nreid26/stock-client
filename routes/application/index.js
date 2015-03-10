App.IndexRoute = Em.Route.extend({
    redirect: function() { //Always redirect this index route the the exchange index
        this.transitionTo('exchange.index');
    }
});

App.AllRoute = App.IndexRoute;