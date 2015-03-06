App.CompanyOrderController = Em.ObjectController.extend({
    queryParams: ['type'],

    type: 'buy',
    badInput: false,
    volumeInput: App.ValidatingModel.create({pattern: /^[1-9]\d*$/}),
    priceInput:  App.ValidatingModel.create({pattern: /^[1-9]\d*(\.\d{1,2})?$/}),

    buys: function() { return this.store.filter('buyOrder', {company: this.get('symbol')}, function() { return true; }); }.property('symbol'),
    sells: function() { return this.store.filter('sellOrder', {company: this.get('symbol')}, function() { return true; }); }.property('symbol'),

    computeSale: function() {
        var buy = this.get('buys').slice().implicitSort()[0],
            sell = this.get('sells').slice().implicitSort()[0];

        //Evaluate trades
        if(buy && sell && buy.price >= sell.price) {
            var vDiff = Math.min(buy.volume, sell.volume);

            this.set('currentPrice', buy.price);
            this.set('volume', this.get('volume') + vDiff);
            this.get('model').save();

            for(var a in [buy, sell]) {
                a.volume -= vDiff;
                if(a.volume == 0) { buy.deleteRecord(); }
                a.save();
            }
        }
    },

    actions: {
        placeOrder: function() {
            var type = this.get('type');

            //Validate data
            if(!this.get('volumeInput.isValid') || !this.get('priceInput.isValid') || ['buy', 'sell'].indexOf(type) < 0) {
                return this.set('badInput', true);
            }

            //Insert new order
            this.store.push(type + 'Order', {
                price: Number(this.get('priceInput.value')),
                volume: Number(this.get('volumeInput.value')),
                company: this.get('symbol'),
                id: 0
            });
            this.get('computeSale').call(this);
            this.transitionToRoute('/exchange/' + this.get('symbol') + '/market');
        }
    }
});