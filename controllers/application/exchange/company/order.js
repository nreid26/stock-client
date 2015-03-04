App.CompanyOrderController = Em.ObjectController.extend({
    queryParams: ['type'],

    type: 'buy',
    badInput: false,
    volumeInput: Ex.InputModel.create({pattern: /^[1-9]\d*$/}),
    priceInput:  Ex.InputModel.create({pattern: /^[1-9]\d*(\.\d{1,2})?$/}),

    actions: {
        placeOrder: function() {
            var type = this.get('type');

            //Validate data
            if(!this.get('volumeInput.isValid') || !this.get('priceInput.isValid') || ['buy', 'sell'].indexOf(type) < 0) {
                this.set('badInput', true);
                return;
            }

            //Insert new order and sort model
            var orders = this.get('orders.' + type);
            orders.pushObject(Ex.Order.create(
                {price: Number(this.get('priceInput.value')), volume: Number(this.get('volumeInput.value'))}
            ));
            orders.sort(function(a, b) {
                if(a.price == b.price) {
                    return a.time - b.time;
                }
                else {
                    return (a.price - b.price) * (type == 'buy' ? 1 : -1); 
                }
            });

            //Evaluate trades
            orders = this.get('orders');
            var buy = orders.buy[0], sell = orders.sell[0];
            if(buy && sell && buy.price >= sell.price) {
                var vDiff = Math.min(buy.volume, sell.volume);

                this.set('currentPrice', buy.price);
                this.set('volume', this.get('volume') + vDiff);

                buy.volume -= vDiff;
                sell.volume -= vDiff;
                if(buy.volume == 0) { orders.buy.removeAt(0); }
                if(sell.volume == 0) { orders.sell.removeAt(0); }
            }

            this.transitionToRoute('/' + this.get('symbol') + '/market');
        }
    }
});