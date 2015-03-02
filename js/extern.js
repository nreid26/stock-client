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
        orders: Object.create({buy: [], sell: []}),

        delta: function() {
            var open = this.get('openPrice'),
                ret = {value: this.get('currentPrice') - open};

            ret.percent = ret.value / open * 100;
            ret.image = 'images/' + ((ret.value > 0) ? 'up' : ((ret.value < 0) ? 'down' : 'none')) + '.png';

            return ret;
        }.property('currentPrice', 'openPrice'),
        orderRows: function() {
            var orders = this.get('orders'),
                ret = [],
                nullGroup = {volume: '', price: ''};

            for(var i = 0; (i < orders.buy.length || i < orders.sell.length) && i < 10; i++) {
                ret.push({
                    buy: orders.buy[i] || nullGroup,
                    sell: orders.sell[i] || nullGroup
                });
            }

            return ret;
        }.property('orders.buy.@each', 'orders.sell.@each'),
        priceRows: function() {
            var orders = this.get('orders');

            function collect(array) {
                var ret = [],
                    group = {};

                for(var i = 0; i < array.length; i++) {
                    var order = array[i];

                    if(group.price != order.price) {
                        ret.push(group);
                        group = {count: 1, volume: order.volume, price: order.price};
                    }
                    else {
                        group.count++;
                        group.volume += order.volume;
                    }
                }

                ret.push(group);
                ret.splice(0, 1);
                return ret;
            }

            var buyGroups = collect(orders.buy),
                sellGroups = collect(orders.sell),
                ret = [],
                nullGroup = {count: '', volume: '', price: ''};

            for(var i = 0; (i < buyGroups.length || i < sellGroups.length) && i < 10; i++) {
                ret.push({
                    buy: buyGroups[i] || nullGroup,
                    sell: sellGroups[i] || nullGroup
                });
            }

            return ret;
        }.property('orders.buy.@each', 'orders.sell.@each'),

        init: function() {
            this.set('currentPrice', this.get('openPrice'));
        }
    }),

    Order: Em.Object.extend({
        price: 0,
        volume: 0,
        totalVolume: 0,

        init: function() {
            this.set('totalVolume', this.get('volume'));
        }
    }),

    getMarket: function() { return market; },

    getCompany: function(params) {
        for(var i = 0; i < market.length; i++) {
            if(params.symbol == market[i].symbol) { return market[i]; }
        }
        this.transitionTo('error');
    }
};


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


