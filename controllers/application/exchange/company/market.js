App.CompanyMarketController = Em.ObjectController.extend({ 
    orderRows: function() {
        var orders = this.get('orders'),
            ret = [],
            nullGroup = {volume: '', price: ''};

        for(var i = 0; i < orders.buy.length || i < orders.sell.length; i++) {
            ret.push({
                buy: orders.buy[i] || nullGroup,
                sell: orders.sell[i] || nullGroup
            });
        }

        return ret.slice(0, 10);
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

        for(var i = 0; i < buyGroups.length || i < sellGroups.length; i++) {
            ret.push({
                buy: buyGroups[i] || nullGroup,
                sell: sellGroups[i] || nullGroup
            });
        }

        return ret.slice(0, 10);
    }.property('orders.buy.@each', 'orders.sell.@each')
});