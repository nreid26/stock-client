App = Em.Application.create();

App.Router.map(function() {
    this.resource('company', {path: '/:symbol'}, function() {
        this.route('order');
        this.route('market');
    });

    this.route('all', {path: '*path'});
});

var Ex = {
    InputModel: Em.Object.extend({
            pattern: /.*/,
            value: null,
            isValid: function () { return this.get('pattern').test(this.get('value')); }.property('value')
    }),
    
    Company: Em.Object.extend({
        symbol: 'XYZ',
        name: 'XYZ Inc.',
        openPrice: 0,
        currentPrice: 0,
        volume: 0,
        logo: 'images/XYZ_logo.png',
        orders: null,

        init: function() {
            this._super();
            this.setProperties({
                currentPrice: this.get('openPrice'),
                orders: Em.Object.create({buy: [], sell: []})
            });
        }
    }),

    Order: Em.Object.extend({
        price: 0,
        volume: 0,
        totalVolume: 0,

        init: function() {
            this._super();

            this.set('totalVolume', this.get('volume'));
        }
    }),

    Route: Em.Route
};


//All uninplemented routers now redirect to client
Em.Router = Em.Router.extend({
    redirect: function() {
        this.transitionTo('application.company');
    }
});

var market = [{ //Temporary model data
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    openPrice: 42.59,
    logo: 'images/microsoft.png',
}, {
    symbol: 'APPL',
    name: 'Apple Inc.',
    openPrice: 121.62,
    logo: 'images/apple.png',
}, {
    symbol: 'FB',
    name: 'Facebook, Inc.',
    openPrice: 74.98,
    logo: 'images/facebook.png',
}, {
    symbol: 'CSCO',
    name: 'Cisco Systems, Inc.',
    openPrice: 27.41,
    logo: 'images/cisco.png',
}, {
    symbol: 'INTC', 
    name: 'Intel Corporation',
    openPrice: 0.55,
    logo: 'images/intel.png',
}];

for(var i = 0; i < market.length; i++) {
    market[i] = Ex.Company.create(market[i]);
}