App.ApplicationRoute = Em.Route.extend({
    model: function() {
        return market;
    },

    redirect: function(model) {
        this.transitionTo('/' + model[0].symbol + '/market');
    },

    actions: {
    	placeOrder: function(company,type) {
    		this.transitionTo('/' + company.symbol + '/order?type=' + type);
    	}
    }
});