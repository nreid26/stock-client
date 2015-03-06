App.CompanyOrderController = Em.ObjectController.extend({
    queryParams: ['type'],

    type: 'buy',
    badInput: false,
    volumeInput: App.ValidatingModel.create({pattern: /^[1-9]\d*$/}),
    priceInput:  App.ValidatingModel.create({pattern: /^[1-9]\d*(\.\d{1,2})?$/}),

    computeSale: function() {
        var buy = this.get('buyOrders').toArray().sort(SORT.buyPrice)[0],
            sell = this.get('sellOrders').toArray().sort(SORT.sellPrice)[0];

        //Evaluate trades
        if(buy && sell && buy.price >= sell.price) {
            var vDiff = Math.min(buy.volume, sell.volume);

            this.set('currentPrice', buy.price);
            this.set('volume', this.get('volume') + vDiff);
            this.get('model').save();

            for(var a in [buy, sell]) {
                a.volume -= vDiff;
                if(a.volume == 0) { a.deleteRecord(); }
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
            console.log(type + 'Order');
            var order = this.store.createRecord(type + 'Order', {
                price: Number(this.get('priceInput.value')),
                volume: Number(this.get('volumeInput.value')),
            });
            this.get('buyOrders');
            order.save();
            console.log(this.store.find(type + 'Order'));
            this.store.find(type + 'Order',{company: this.get('symbol')}).then(function(test){console.log('test');console.log(test);});

            this.computeSale();
            this.transitionToRoute('/exchange/' + this.get('symbol') + '/market');
        }
    }
});