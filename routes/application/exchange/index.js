App.ExchangeIndexRoute = Em.Route.extend({
    redirect: function() {
        this.transitionTo('/exchange/' + this.modelFor('exchange').objectAt(0).get('symbol'));
    }
});