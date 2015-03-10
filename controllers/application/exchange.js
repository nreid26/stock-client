App.ExchangeController = Em.ArrayController.extend({
    itemController: 'ExchangeItem', //Decorate each item with with controlles
    filter: {property: 'volume', sign: 0}, //Observe this as the filter/sort prperties

    filteredView: function() { //Computed array of companies in the correct order
        var property = this.get('filter.property'),
            sign = this.get('filter.sign'),
            ret = this.toArray();

        if(sign != 0) { ret = ret.filter(function(item) { return sign * item.get(property) > 0; }); }

        ret.sort(function(a, b) {
            return (sign * (a.get(property) - b.get(property))) || (a.get('symbol').localeCompare(b.get('symbol'))); 
        });
        return ret;
    }.property('model.@each', 'filter'),

    actions: {
        filter: function(property, sign) { //Change the filter when the action is fired
            this.set('filter', {property: property, sign: sign});
        },   
        transitionOrder: function(company, type) { //Go to the stock buying route
    		this.transitionToRoute('/exchange/' + company.get('symbol') + '/order?type=' + type);
    	}
    }
});

App.ExchangeItemController = Em.ObjectController.extend({
    delta: function() { //Calculate the compay deltas/image url
        var open = this.get('openPrice'),
            ret = {value: this.get('currentPrice') - open};

        ret.percent = ret.value / open * 100;
        ret.image = 'images/' + ((ret.value > 0) ? 'up' : ((ret.value < 0) ? 'down' : 'none')) + '.png';

        return ret;
    }.property('currentPrice', 'openPrice')
});