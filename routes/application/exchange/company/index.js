App.CompanyIndexRoute = Em.Route.extend({
    redirect: function(model) {
        this.transitionTo('/exchange/' + this.modelFor('company').get('symbol') + '/market');
    }
});