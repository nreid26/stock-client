App.CompanyRoute = Em.Route.extend({
    model: function(params) {
        var m = this.modelFor('exchange').filterBy('symbol', params.symbol)[0];
        if(m) { return m; }
        this.transitionToRoute('all');
    },

    setupController: function(con, mod) {
        this._super(con, mod);
        this.store.find('buyOrder');
        this.store.find('sellOrder');
    }
});