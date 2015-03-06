App = Em.Application.create();

App.Router.map(function() {
    this.resource('exchange', function() {
        this.resource('company', {path: '/:symbol'}, function() {
            this.route('order');
            this.route('market');
        });
    });

    this.route('all', {path: '*path'});
});

App.ValidatingModel = Em.Object.extend({
    pattern: null,
    value: null,
    isValid: function () { 
        var pat = this.get('pattern');
        return (pat) ? pat.test(this.get('value')) : true;
    }.property('value', 'pattern')
});
