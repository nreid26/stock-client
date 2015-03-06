App.CompanyOrderController = Em.ObjectController.extend({
    queryParams: ['type'],

    type: 'buy',
    badInput: false,
    volumeInput: App.ValidatingModel.create({pattern: /^[1-9]\d*$/}),
    priceInput:  App.ValidatingModel.create({pattern: /^[1-9]\d*(\.\d{1,2})?$/}),

    computeSale: function() {
        var buys = this.get('buyOrders').toArray().sort(SORT.buyPrice),
            sells = this.get('sellOrders').toArray().sort(SORT.sellPrice);
        //Evaluate trades
        for(var i = 0; ; i++) {
            var buy = buys[i], sell = sells[i]
            
            if(buy && sell && buy.get('price') >= sell.get('price')) {
                var vDiff = Math.min(buy.get('volume'), sell.get('volume'));
                debugger;
                this.set('currentPrice', buy.get('price'));
                this.set('volume', this.get('volume') + vDiff);
                this.get('model').save().then(function(){
                    [buy, sell].forEach(function(a) {
                        a.decrementProperty('volume', vDiff);
                        if(a.get('volume') == 0) {
                            console.log('removed this'); 
                            a.deleteRecord();
                        }
                        a.save();
                    });
                });
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
            var order = this.store.createRecord(type + 'Order', {
                price: Number(this.get('priceInput.value')),
                volume: Number(this.get('volumeInput.value')),
                company:this.get('model')
            });
            order.save();
            this.computeSale();
            this.store.find(type + 'Order',{company: this.get('symbol')}).then(function(test){console.log('test');console.log(test);});

            this.computeSale();
            this.transitionToRoute('/exchange/' + this.get('symbol') + '/market');
        }
    }
});