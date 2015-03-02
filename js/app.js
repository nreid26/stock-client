App = Em.Application.create();
App.Router.map(function() {
    this.resource('market', function() {
        this.route('company', {path: '/:symbol'});
    });
    this.route('order', {path: '/order/:symbol'});

    this.route('error');
    this.route('all', {path: '*path'});
});

App.IndexRoute = Em.Route.extend({
    redirect: function() { this.transitionTo('market'); }
});

App.AllRoute = Em.Route.extend({
    redirect: function() { this.transitionTo('error'); }
});


App.MarketRoute = Em.Route.extend({model: Ex.getMarket});
App.MarketController = Em.ArrayController.extend({
    sortKeys: ['volume:desc', 'name:asc'],
    sortedView: Em.computed.sort('model', 'sortKeys'),

    actions: {
        resort: function(order) { this.get('sortKeys').replace(0, 1, order); }
    }
});

App.MarketIndexRoute = Em.Route.extend({
    model: Ex.getMarket,
    redirect: function(model) { 
        this.transitionTo((model.length > 0) ?
            '/market/' + model[0].symbol :
            '/error'
        );
    }
});

App.MarketCompanyRoute = Em.Route.extend({model: Ex.getCompany});
App.MarketCompanyController = Em.ObjectController.extend({});


App.OrderRoute = Em.Route.extend({
    model: Ex.getCompany,
    setupController: function(controller, model) {
        controller.setProperties({
            'volumeInput.value': '',
            'priceInput.value': '',
            'badInput': false,
            'model': model
        });
    }
});
App.OrderController = Em.ObjectController.extend({
    queryParams: ['type'],


    type: 'buy',
    badInput: false,
    volumeInput: Ex.InputModel.create({pattern: /^[1-9]\d*$/}),
    priceInput:  Ex.InputModel.create({pattern: /^[1-9]\d*(\.\d{1,2})?$/}),


    actions: {
        placeOrder: function() {
            var type = this.get('type');

            //Validate data
            if(!(this.get('volumeInput.isValid') && this.get('priceInput.isValid') && ['buy', 'sell'].indexOf(type) >= 0)) {
                this.set('badInput', true);
                return;
            }

            //Insert new order and sort model
            var orders = this.get('orders.' + type);
            orders.pushObject(Ex.Order.create(
                {price: this.get('priceInput.value'), volume: this.get('volumeInput.value')}
            ));
            orders.sort((type == 'buy') ?
                function(a, b) { return a.price - b.price; } :
                function(a, b) { return b.price - a.price; }
            );

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

            this.transitionToRoute('/market/'+ this.get('symbol'));
        }
    }
});