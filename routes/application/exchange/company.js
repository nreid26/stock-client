App.CompanyRoute = Em.Route.extend({
    model: function(params) {
        var all = this.modelFor('exchange'),
            m = all.filterBy('symbol', params.symbol)[0];
       
        return m || all[0];
    }
});