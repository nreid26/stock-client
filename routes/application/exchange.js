App.ExchangeRoute = Em.Route.extend({
    model: function() {
        return this.store.find('company');
    },
    setupController: function(controller, model){
    	console.log(this.store.find('buyOrder'));
    	console.log(this.store.find('sellOrder'));
    	this._super(controller,model);
    }
});