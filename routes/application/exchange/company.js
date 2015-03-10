App.CompanyRoute = Em.Route.extend({
    model: function(params) {
        var m = this.modelFor('exchange').filterBy('symbol', params.symbol)[0];
        if(m) { return m; } //If this company doesnt exist go the the catchall route
        this.transitionToRoute('all');
    },

    setupController: function(con, mod) {
        this._super(con, mod);
        this.store.find('buyOrder'); //Trigger the buyOrders and sellOrders for this company to pre-load
        this.store.find('sellOrder');
    }
});