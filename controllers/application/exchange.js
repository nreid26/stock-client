App.ExchangeController = Em.ArrayController.extend({
    itemController: 'ExchangeItem',
    filter: Em.Object.create({property: 'volume', sign: 0}),

    filteredView: function() {
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
        filter: function(property, sign) {
            this.set('filter', Em.Object.create({property: property, sign: sign}));
        },   
        transitionOrder: function(company, type) {
    		this.transitionToRoute('/exchange/' + company.get('symbol') + '/order?type=' + type);
    	}
    }
});

App.ExchangeItemController = Em.ObjectController.extend({
    delta: function() {
        var open = this.get('openPrice'),
            ret = {value: this.get('currentPrice') - open};

        ret.percent = ret.value / open * 100;
        ret.image = 'images/' + ((ret.value > 0) ? 'up' : ((ret.value < 0) ? 'down' : 'none')) + '.png';

        return ret;
    }.property('currentPrice', 'openPrice'),
});