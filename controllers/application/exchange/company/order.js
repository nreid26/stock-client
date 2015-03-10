App.CompanyOrderController = Em.ObjectController.extend({
    queryParams: ['type'],

    type: 'buy',
    badInput: false,
    volumeInput: App.ValidatingModel.create({pattern: /^[1-9]\d*$/}), //Models to validate and display data validity
    priceInput:  App.ValidatingModel.create({pattern: /^[1-9]\d*(\.\d{1,2})?$/}),

    computeSale: function() {
        var buys = this.get('buyOrders').toArray().sort(SORT.buyPrice),
            sells = this.get('sellOrders').toArray().sort(SORT.sellPrice),
            company = this.get('model');

        //Evaluate trades
        buys.forEach(function(buy) { //For buys until true
            if(buy.get('isDeleted')) { return; }

            sells.forEach(function(sell) { //For sells until true
                if(sell.get('isDeleted') || buy.get('isDeleted')) { return; }

                if(buy.get('price') >= sell.get('price')) { //If there is a transaction
                    var vDiff = Math.min(buy.get('volume'), sell.get('volume'));

                    company.set('currentPrice', buy.get('price'));
                    company.incrementProperty('volume', vDiff);

                    [buy, sell].forEach(function(order) {
                        if(order.get('volume') <= vDiff) { order.deleteRecord();} 
                        else { order.decrementProperty('volume', vDiff); }
                    });
                }
            });
        });

        //Persist all changes after computation
        company.save();
        [buys, sells].forEach(function(list) {
            list.forEach(function(item) {
                if(item.get('isDirty')) { item.save(); } 
            });
        });
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
                company: this.get('model'),
                time: Date.now()
            });

            this.computeSale(); //Make trades when a new order is placed
            this.transitionToRoute('/exchange/' + this.get('symbol') + '/market');
        }
    }
});