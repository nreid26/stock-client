App.CompanyMarketController = Em.ObjectController.extend({   
    orderRows: function() { //Compute the table data for depth-by-order
        var buys = this.get('buyOrders').toArray().sort(SORT.buyPrice),
            sells = this.get('sellOrders').toArray().sort(SORT.sellPrice),
            nullGroup = {volume: '', price: ''},
            ret = [];

        for(var i = 0; i < buys.length || i < sells.length; i++) { //For every buy and sell concatenate the rows
            ret.push({
                buy: buys[i] || nullGroup,
                sell: sells[i] || nullGroup
            });
        }
        return ret.slice(0, 10);
    }.property('buyOrders.@each', 'sellOrders.@each'),

    priceRows: function() { //Compute the table data for depth-by-price
        var buys = this.get('buyOrders').toArray().sort(SORT.buyPrice),
            sells = this.get('sellOrders').toArray().sort(SORT.sellPrice);

        function collect(array) { //Scoped function to collect like priced orders
            var ret = [],
                group = {};

            array.forEach(function(order) {
                if(group.price != order.get('price')) { //If the price is different from the last order make a new row
                    ret.push(group);
                    group = {count: 1, volume: order.get('volume'), price: order.get('price')};
                }
                else { //Otherwise combine the volumes and incremtnt the count
                    group.count++;
                    group.volume += order.get('volume');
                }
            });

            ret.push(group);
            ret.splice(0, 1);
            return ret;
        }

        var buyGroups = collect(buys),
            sellGroups = collect(sells),
            nullGroup = {count: '', volume: '', price: ''},
            ret = [];

        for(var i = 0; i < buyGroups.length || i < sellGroups.length; i++) { //Concatenate as above
            ret.push({
                buy: buyGroups[i] || nullGroup,
                sell: sellGroups[i] || nullGroup
            });
        }

        return ret.slice(0, 10);
    }.property('buyOrders.@each', 'sellOrders.@each')
});