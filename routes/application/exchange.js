App.ExchangeRoute = Em.Route.extend({
    model: function() {
        return this.store.find('company');
    }
});