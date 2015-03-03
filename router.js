App = Em.Application.create();

App.Router.map(function() {
    this.resource('company', {path: '/:symbol'}, function() {
        this.route('order');
        this.route('market');
    });

    this.route('error');
    this.route('all', {path: '*path'});
});