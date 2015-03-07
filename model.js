//Models
App.Company = DS.Model.extend({
    name: DS.attr('string'),
    openPrice: DS.attr('number'),
    currentPrice: DS.attr('number', {defaultValue: 0}),
    volume: DS.attr('number', {defaultValue: 0}),
    logo: DS.attr('string'),
    buyOrders: DS.hasMany('BuyOrder'),
    sellOrders: DS.hasMany('SellOrder'),
    symbol: function() { return this.get('id'); }.property('id')
});

App.Company.FIXTURES = [{
        id: 'MSFT',
        name: 'Microsoft Corporation',
        openPrice: 42.59,
        logo: 'images/microsoft.png',
    }, {
        id: 'APPL',
        name: 'Apple Inc.',
        openPrice: 121.62,
        logo: 'images/apple.png',
    }, {
        id: 'FB',
        name: 'Facebook, Inc.',
        openPrice: 74.98,
        logo: 'images/facebook.png',
    }, {
        id: 'CSCO',
        name: 'Cisco Systems, Inc.',
        openPrice: 27.41,
        logo: 'images/cisco.png',
    }, {
        id: 'INTC', 
        name: 'Intel Corporation',
        openPrice: 0.55,
        logo: 'images/intel.png',
    }
];

App.BuyOrder = DS.Model.extend({
    volume: DS.attr('number'),
    price: DS.attr('number'),
    time: DS.attr('number'),
    company: DS.belongsTo('Company')
});

App.SellOrder = DS.Model.extend({
    volume: DS.attr('number'),
    price: DS.attr('number'),
    time: DS.attr('number'),
    company: DS.belongsTo('Company')
});

App.Transaction = DS.Model.extend({
    volume: DS.attr('number'),
    price: DS.attr('number'),
    time: DS.attr('number'),
    company: DS.attr('string'),
    id: DS.attr('number')
});

//Adapters
App.CompanyAdapter = DS.FixtureAdapter.extend({
    namespace: 'stock-client'
});

App.OrderAdapter = DS.LSAdapter.extend({
    namespace: 'sock-client'
});
App.BuyOrderAdapter = App.OrderAdapter.extend();
App.SellOrderAdapter = App.OrderAdapter.extend();

var SORT = {
    time: function(a, b) { return a.get('time') - b.get('time'); },
    buyPrice: function(a, b) { return (b.get('price') - a.get('price')) || SORT.time(a, b); },
    sellPrice: function(a, b) { return (a.get('price') - b.get('price')) || SORT.time(a, b); }
}