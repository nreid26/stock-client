﻿App.CompanyMarketController = Em.ObjectController.extend({   
    buys: function() { return this.store.filter('buyOrder', {company: this.get('symbol')}, function() { debugger; return true; }); }.property('symbol'),
    sells: function() { return this.store.filter('sellOrder', {company: this.get('symbol')}, function() { return true; }); }.property('symbol'),

    orderRows: function() {
        debugger;
        var buys = this.get('buys').slice().implicitSort(),
            sells = this.get('sells').slice().implicitSort(),
            nullGroup = {volume: '', price: ''},
            ret = [];

        for(var i = 0; i < buys.length || i < sells.length; i++) {
            ret.push({
                buy: buys[i] || nullGroup,
                sell: sells[i] || nullGroup
            });
        }

        return ret.slice(0, 10);
    }.property('buys.@each', 'sells.@each'),

    priceRows: function() {
        var buys = this.get('buys').slice().implicitSort(),
            sells = this.get('sells').slice().implicitSort();

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

        var buyGroups = collect(buys),
            sellGroups = collect(sells),
            nullGroup = {count: '', volume: '', price: ''},
            ret = [];

        for(var i = 0; i < buyGroups.length || i < sellGroups.length; i++) {
            ret.push({
                buy: buyGroups[i] || nullGroup,
                sell: sellGroups[i] || nullGroup
            });
        }

        return ret.slice(0, 10);
    }.property('buys.@each', 'sells.@each')
});